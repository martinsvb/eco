import { FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { ControllerDateTimeField, CustomDateTimeFieldControllerProps } from "./ControllerDateTimeField";

export type CustomGridDateTimeFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  gridProps: Grid2Props;
} & CustomDateTimeFieldControllerProps<V, N>;

export const GridControllerDateTimeField = <V extends FieldValues, N extends FieldPath<V>>({
  gridProps,
  ...rest
}: CustomGridDateTimeFieldControllerProps<V, N>) => {
  return (
    <Grid {...gridProps}>
      <ControllerDateTimeField {...rest} />
    </Grid>
  );
};
