import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import ControllerTextField, { CustomFieldProps } from "./ControllerTextField";

export type CustomGridFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<CustomFieldProps, 'id'>;
  gridProps: Grid2Props;
} & Omit<ControllerProps<V, N>, 'render'>;

export const GridControllerTextField = <V extends FieldValues, N extends FieldPath<V>>({
  gridProps,
  ...rest
}: CustomGridFieldControllerProps<V, N>) => {
  return (
    <Grid {...gridProps}>
      <ControllerTextField {...rest} />
    </Grid>
  );
};
