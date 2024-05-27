import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import DateTimePicker from "./DateTimePicker";
import { DateTimePickerProps } from "./formControlsTypes";

export type CustomDateTimeFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<DateTimePickerProps, 'id'>;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerDateTimeField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  ...rest
}: CustomDateTimeFieldControllerProps<V, N>) => {
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

export default ControllerDateTimeField;
