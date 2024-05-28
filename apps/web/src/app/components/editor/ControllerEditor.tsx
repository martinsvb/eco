import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { getFieldId } from "../formControls";
import Editor, { EditorProps } from "./Editor";

export type CustomEditorControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<EditorProps, 'id'>;
  idApend?: string | number;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerEditor = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  idApend,
  ...rest
}: CustomEditorControllerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Editor
            {...field}
            {...fieldProps}
            id={getFieldId(name, idApend)}
          />
        )
      }}
      {...rest}
    />
  );
};

export default ControllerEditor;
