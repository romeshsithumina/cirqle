import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(sentence: string) {
  const words = sentence.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
}

export function convertDateFormat(inputDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  const date = new Date(inputDate);
  const formattedDate = date.toLocaleString("en-GB", options);

  const dateArray = formattedDate.split(" ");
  const [day, time] = dateArray;

  return `${day.replace(/\//g, ".")} at ${time}`;
}
