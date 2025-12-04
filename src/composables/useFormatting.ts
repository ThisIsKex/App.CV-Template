import type { Location } from "../types/resume.types";

export function useFormatting() {
  const formatLocation = (location?: Location): string => {
    if (!location) return "";

    const parts = [location.address, location.city, location.region, location.countryCode].filter(
      Boolean,
    );

    return parts.join(", ");
  };

  const formatDate = (date?: string): string => {
    if (!date) return "";
    return date;
  };

  const formatDateRange = (startDate?: string, endDate?: string): string => {
    if (!startDate && !endDate) return "";
    if (!startDate) return endDate || "";
    if (!endDate) return `${startDate} - Heute`;
    return `${startDate} - ${endDate}`;
  };

  const isEmpty = (arr: unknown[] | undefined): boolean => {
    return !arr || arr.length === 0;
  };

  return {
    formatLocation,
    formatDate,
    formatDateRange,
    isEmpty,
  };
}
