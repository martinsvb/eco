import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { getFieldId } from "./helpers";
import { TextFieldProps } from "./TextField";
import { PhoneField } from "./PhoneField";

export type CustomPhoneFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: TextFieldProps;
  idApend?: string | number;
} & Omit<ControllerProps<V, N>, 'render'>;

export const ControllerPhoneField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  idApend,
  ...rest
}: CustomPhoneFieldControllerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field }, fieldState: { error } }) => (
        <PhoneField
          {...field}
          {...fieldProps}
          id={getFieldId(name, idApend)}
          value={value as string | undefined}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
      {...rest}
    />
  );
};
