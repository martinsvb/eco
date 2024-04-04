import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import Select, { SelectProps } from "./Select";

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: SelectProps;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerSelect = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
}: CustomFieldControllerProps<V, N>) => {
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
