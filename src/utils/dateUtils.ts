import { format, formatDistance, differenceInDays } from "date-fns";

export const formatDate = (date: Date | string, pattern = "PPP"): string => {
  return format(new Date(date), pattern);
};

export const timeAgo = (date: Date | string): string => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const daysUntil = (futureDate: Date | string): number => {
  return differenceInDays(new Date(futureDate), new Date());
};
