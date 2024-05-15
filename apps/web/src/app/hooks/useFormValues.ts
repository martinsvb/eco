import { useMemo } from "react";
import dayjs from "dayjs";

export const useFormValues = <T>(
  data: {[key: string]: unknown} | null,
  items: string[],
  dateItems?: string[]
): T => {
  const values = useMemo(
    () => {
      return items.reduce((acc, item) => {
        const isDateField = dateItems?.includes(item);
        return {
          ...acc,
          [item]: data?.[item]
            ? isDateField ? dayjs(data[item] as string) : data[item]
            : isDateField ? null : ''
        }
      }, {}) as T;
    },
    [data, dateItems, items]
  );

  return values;
}
