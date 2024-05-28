import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import DateTimePicker from "./DateTimePicker";
import { DateTimePickerProps } from "./formControlsTypes";
import { getFieldId } from "./helpers";

export type CustomDateTimeFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<DateTimePickerProps, 'id'>;
  idApend?: string | number;
} & Omit<ControllerProps<V, N>, 'render'>;

const ControllerDateTimeField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  idApend,
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
          id={getFieldId(name, idApend)}
        />
      )}
      {...rest}
    />
  );
};

export default ControllerDateTimeField;
