import { FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { ControllerTextField, CustomFieldControllerProps } from "./ControllerTextField";

export type CustomGridFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  gridProps: Grid2Props;
} & CustomFieldControllerProps<V, N>;

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
