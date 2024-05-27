import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import TextField, { TextFieldProps } from "./TextField";

export type CustomFieldProps = {
  noNumberArrows?: boolean;
} & TextFieldProps;

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<CustomFieldProps, 'id'>;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerTextField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
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
          id={name}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
      {...rest}
    />
  );
};

export default ControllerTextField;
