import { Grid2Props } from '@mui/material/Unstable_Grid2';

export const fieldSettings = <T>(
  name: T,
  defaultValue?: any,
) => ({
  name,
  defaultValue
});

export const gridFieldSettings = <T>(
  gridProps: Grid2Props,
  control: any,
  name: T,
  data: any,
) => ({
  name,
  control,
  defaultValue: data[name],
  gridProps
});
