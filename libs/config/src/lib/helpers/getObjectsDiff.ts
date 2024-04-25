import { GridRowModel } from '@mui/x-data-grid';
import { pick } from 'ramda';

export const getObjectDiff = <T>(newObj: GridRowModel, oldObj: GridRowModel, items: string[]): T => {
  const newItems = pick(items, newObj);
  const oldItems = pick(items, oldObj);
  const diff = items.reduce(
    (acc, item) =>
      newItems[item] !== oldItems[item]
        ? {...acc, [item]: newItems[item]}
        : acc
    ,
    {}
  );

  return diff as T;
}
