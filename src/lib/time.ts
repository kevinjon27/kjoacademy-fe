import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function humanizeDuration(durationInSeconds: number) {
  const duration = dayjs.duration(durationInSeconds, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const h = hours > 0 ? `${hours}h` : "";
  const m = minutes > 0 ? `${minutes}m` : "";
  const s = seconds > 0 ? `${seconds}s` : "";

  return `${h} ${m} ${s}`.trim();
}
