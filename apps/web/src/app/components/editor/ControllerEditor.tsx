import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Editor, { EditorProps } from "./Editor";

export type CustomEditorControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<EditorProps, 'id'>;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerEditor = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
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
          />
        )
      }}
      {...rest}
    />
  );
};

export default ControllerEditor;
