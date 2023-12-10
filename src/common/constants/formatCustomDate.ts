export const formatCustomDate = (date: Date | null): string => {
  if (date) {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      month: "short",
      year: "2-digit",
    };

    return date.toLocaleDateString("en-US", options);
  } else {
    return "";
  }
};
