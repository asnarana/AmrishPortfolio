import { useEffect, useRef, useState } from "react";

// interface for the hook's props, allowing customization of threshold, root, and rootMargin
interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

// custom hook to observe when an element enters or leaves the viewport
export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = "0%",
}: UseIntersectionObserverProps = {}) {
  // state to store the latest intersection observer entry
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  // state to store the node (element) to be observed
  const [node, setNode] = useState<Element | null>(null);

  // ref to keep track of the intersection observer instance
  const observer = useRef<IntersectionObserver | null>(null);

  // effect to set up and clean up the intersection observer
  useEffect(() => {
    // disconnect any existing observer before creating a new one
    if (observer.current) observer.current.disconnect();

    // create a new intersection observer and update entry state on change
    observer.current = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      {
        threshold,
        root,
        rootMargin,
      }
    );

    // store the current observer instance for cleanup
    const currentObserver = observer.current;

    // start observing the node if it exists
    if (node) currentObserver.observe(node);

    // cleanup function to disconnect the observer when dependencies change or component unmounts
    return () => currentObserver.disconnect();
  }, [node, threshold, root, rootMargin]);

  // return a tuple: the setter for the node ref and the latest entry
  return [setNode, entry] as const;
}