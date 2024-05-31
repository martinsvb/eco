import { Controller, ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { getFieldId } from "./helpers";
import { Select, SelectProps } from "./Select";

export type CustomSelectControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<SelectProps, 'id'>;
  idApend?: string | number;
} & Omit<ControllerProps<V, N>, 'render'>;

export const ControllerSelect = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  idApend,
}: CustomSelectControllerProps<V, N>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          {...fieldProps}
          id={getFieldId(name, idApend)}
          error={Boolean(error)}
          helperText={error?.message}
        />
      )}
    />
  );
};
