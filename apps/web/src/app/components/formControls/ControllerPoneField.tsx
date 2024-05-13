import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { TextFieldProps } from "./TextField";
import PhoneField from "./PhoneField";

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: TextFieldProps;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerPhoneField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  ...rest
}: CustomFieldControllerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <PhoneField
          {...field}
          {...fieldProps}
          value={value as string | undefined}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
      {...rest}
    />
  );
};

export default ControllerPhoneField;
