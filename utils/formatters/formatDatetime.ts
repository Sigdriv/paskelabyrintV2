import { format as formatter, isValid } from 'date-fns';
import { nb } from 'date-fns/locale';

const datetimeFormats = {
  // 23:45
  time: () => 'HH:mm',
  // kl. 23:45
  timeWithPrefix: () => 'HH:mm',
  // mandag
  dayOfWeek: () => 'eeee',
  // september
  month: () => 'MMMM',
  // 2020
  year: () => 'yyyy',
  // september 2020
  monthWithYear: () => 'MMMM yyyy',

  // 23. september kl. 23:45
  datetime: () => "d. MMMM 'kl.' HH:mm",
  // mandag 23. september kl. 23:45
  datetimeWithDay: () => "eeee d. MMMM 'kl.' HH:mm",
  // 23. september 2020 kl. 23:45
  datetimeWithYear: () => "d. MMMM yyyy 'kl.' HH:mm",
  // 23.09.2020 kl. 23:45
  datetimeWithYearShort: () => "dd.MM.yyyy 'kl.' HH:mm",

  // 23. september
  date: () => 'd. MMMM',
  // 23.09
  dateShort: () => 'dd.MM',
  // 23. september 2020
  dateWithYear: () => 'd. MMMM yyyy',
  // 23.09.2020
  dateWithYearShort: () => 'dd.MM.yyyy',
  // mandag 23. september
  dateWithDay: () => 'eeee d. MMMM',
} as const;

type DatetimeFormat = keyof typeof datetimeFormats;

export function formatDatetime(
  date: Date | string,
  format: DatetimeFormat
): string {
  const datetime = new Date(date);

  if (!isValid(datetime)) {
    return '';
  }

  const dateFnsFormat = datetimeFormats[format]();

  return formatter(datetime, dateFnsFormat, {
    locale: nb,
  });
}
