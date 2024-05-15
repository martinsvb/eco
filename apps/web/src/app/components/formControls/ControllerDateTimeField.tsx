import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import DateTimePicker from "./DateTimePicker";
import { DateTimePickerProps } from "./formControlsTypes";

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: DateTimePickerProps;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerDateField = <V extends FieldValues, N extends FieldPath<V>>({
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
        <DateTimePicker
          {...field}
          {...fieldProps}
        />
      )}
      {...rest}
    />
  );
};

export default ControllerDateField;
