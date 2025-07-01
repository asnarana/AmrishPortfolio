import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// maximum number of toasts to show at once
const TOAST_LIMIT = 1
// delay before a toast is removed (in ms)
const TOAST_REMOVE_DELAY = 1000000

// type for a toast with all properties and a required id
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// action types for the reducer
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// counter for generating unique toast ids
let count = 0

// function to generate a unique id for each toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

// memory state and listners 
// keeps current state of tasts in variable ( memoryState)
// keeps list of listeners(functoins) that are called whenver the state changes , 
// so all components using hook get updated

// union type for all possible actions in the reducer
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// state shape for the reducer
interface State {
  toasts: ToasterToast[]
}

// map to keep track of timeouts for removing toasts
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// function to add a toast id to the remove queue after a delay
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// reducer function to handle toast actions and update state
// takes takes current state and action and returns new state 
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // add the new toast to the front and limit the number of toasts
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // update an existing toast by id
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // add the toast to the remove queue (side effect)
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // set open to false for the dismissed toast(s)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // remove the toast from the state by id, or clear all if no id
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// array of listeners to update state in all hook consumers
const listeners: Array<(state: State) => void> = []

// in-memory state for toasts
let memoryState: State = { toasts: [] }

// dispatch function to update state and notify listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// type for a toast without the id (id is generated internally)
type Toast = Omit<ToasterToast, "id">

// function to create and show a new toast
function toast({ ...props }: Toast) {
  const id = genId()

  // function to update the toast by id
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  // function to dismiss the toast by id
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // dispatch the add toast action
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// custom hook to use the toast system in components
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  // subscribe to state updates on mount, and clean up on unmount
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  // return the current state, the toast function, and a dismiss function
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }