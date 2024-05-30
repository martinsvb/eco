import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { TextField, TextFieldProps } from "./TextField";
import { getFieldId } from "./helpers";

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<TextFieldProps, 'id'>;
  idApend?: string | number;
} & Omit<ControllerProps<V, N>, 'render'>;

export const ControllerTextField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  idApend,
  ...rest
}: CustomFieldControllerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...fieldProps}
          id={getFieldId(name, idApend)}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
      {...rest}
    />
  );
};
