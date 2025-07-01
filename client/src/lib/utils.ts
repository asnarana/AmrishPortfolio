// this is the utility file for the app
// it contains the cn function for merging tailwind classes
// it is used to merge tailwind classes for the app
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// function to merge tailwind classes
// it takes in a variable number of class values and returns a string of merged classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
