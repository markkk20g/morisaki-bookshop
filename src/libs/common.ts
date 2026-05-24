export function orderDateFormatted(input: Date) {
  const date = new Date(input);

  return (
    `${date.toLocaleString("en-US", { month: "short" })} ` +
    `${date.getDate()} • ` +
    `${String(date.getHours()).padStart(2, "0")}:` +
    `${String(date.getMinutes()).padStart(2, "0")}`
  );
}
