import { FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import ControllerEditor, { CustomEditorControllerProps } from "./ControllerEditor";

export type CustomGridEditorControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  gridProps: Grid2Props;
} & CustomEditorControllerProps<V, N>;

export const GridControllerEditor = <V extends FieldValues, N extends FieldPath<V>>({
  gridProps,
  ...rest
}: CustomGridEditorControllerProps<V, N>) => {
  return (
    <Grid {...gridProps}>
      <ControllerEditor {...rest} />
    </Grid>
  );
};
