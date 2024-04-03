import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TextField, { TextFieldProps } from "./TextField";

export type CustomFieldProps = {
  noNumberArrows?: boolean;
} & TextFieldProps;

export interface CustomFieldControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  fieldProps: CustomFieldProps;
}

const ControllerTextField = <T extends FieldValues>({
  name,
  control,
  fieldProps,
}: CustomFieldControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...fieldProps}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default ControllerTextField;
