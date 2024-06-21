import { ReactNode } from "react";

export interface DataListItemData {
  item: string;
  value: ReactNode;
}

export const getDataListPairs = (
  data: any,
  handlers?: { translations?: any; valueFormatters?: any;}
): DataListItemData[] => {
  return Object.entries(data).map(([item, value]) => ({
    item: handlers?.translations?.[item] || item,
    value: handlers?.valueFormatters?.[item]?.(value) || value
  } as DataListItemData));
}
