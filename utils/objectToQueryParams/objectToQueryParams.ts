import { format, isDate } from 'date-fns';

type ParamValue = string | number | boolean | Date | null | undefined;

export function objectToQueryParams(
  obj?: Record<string, ParamValue | ParamValue[]>
): string {
  if (!obj) {
    return '';
  }

  const queryParams = Object.entries(obj)
    .map(([key, value]) =>
      valueToQueryParam(value) ? `${key}=${valueToQueryParam(value)}` : null
    )
    .filter((queryParam) => queryParam !== null)
    .join('&');

  return queryParams ? `?${queryParams}` : '';
}

function valueToQueryParam(value: ParamValue | ParamValue[]): string {
  if (Array.isArray(value)) {
    if (!value.length) {
      return '';
    }

    return value
      .map((v) => valueToQueryParam(v))
      .filter((v) => v !== '')
      .join(',');
  }

  if (value === null || value === undefined || value === '') {
    return '';
  }

  if (isDate(value)) {
    return format(value, 'yyyy-MM-dd');
  }

  return encodeURIComponent(value);
}
