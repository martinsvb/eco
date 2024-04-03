import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select, { SelectProps } from "./Select";

export interface CustomFieldControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  fieldProps: SelectProps;
}

const ControllerSelect = <T extends FieldValues>({
  name,
  control,
  fieldProps,
}: CustomFieldControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          {...fieldProps}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default ControllerSelect;
