import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Editor, { EditorProps } from "./Editor";

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: EditorProps;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerEditor = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  ...rest
}: CustomFieldControllerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Editor
          {...field}
          {...fieldProps}
        />
      )}
      {...rest}
    />
  );
};

export default ControllerEditor;
