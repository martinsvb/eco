import { FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { ControllerSelect, CustomSelectControllerProps } from "./ControllerSelect";

export type CustomGridSelectControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  gridProps: Grid2Props;
} & CustomSelectControllerProps<V, N>;

export const GridControllerSelect = <V extends FieldValues, N extends FieldPath<V>>({
  gridProps,
  ...rest
}: CustomGridSelectControllerProps<V, N>) => {
  return (
    <Grid {...gridProps}>
      <ControllerSelect {...rest} />
    </Grid>
  );
};
