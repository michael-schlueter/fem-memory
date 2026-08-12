import { twMerge } from "tw-merge";

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
