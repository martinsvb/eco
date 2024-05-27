import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { DateTimePickerProps } from "./formControlsTypes";
import ControllerDateTimeField from "./ControllerDateTimeField";

export type CustomGridDateTimeFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<DateTimePickerProps, 'id'>;
  gridProps: Grid2Props;
} & Omit<ControllerProps<V, N>, 'render'>;

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
