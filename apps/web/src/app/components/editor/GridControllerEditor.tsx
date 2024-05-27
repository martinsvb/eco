import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import ControllerEditor from "./ControllerEditor";
import { EditorProps } from "./Editor";

export type CustomGridEditorControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<EditorProps, 'id'>;
  gridProps: Grid2Props;
} & Omit<ControllerProps<V, N>, 'render'>;

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
