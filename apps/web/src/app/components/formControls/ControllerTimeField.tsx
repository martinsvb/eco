import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { TimePickerProps } from "./formControlsTypes";
import TimePicker from "./TimePicker";

export type CustomFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: TimePickerProps;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerTimeField = <V extends FieldValues, N extends FieldPath<V>>({
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
        <TimePicker
          {...field}
          {...fieldProps}
        />
      )}
      {...rest}
    />
  );
};

export default ControllerTimeField;
