const dateConvertor = (date: string) => {
  return date.replace("T", ", ").split(".")[0].slice(0, 17);
};

export const shortDate = (date: string) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const newDate = new Date(date);
  const day = newDate.getUTCDate();
  const month = months[newDate.getUTCMonth()];
  const formattedDate = `${day} ${month}`;
  return formattedDate;
};

export default dateConvertor;
