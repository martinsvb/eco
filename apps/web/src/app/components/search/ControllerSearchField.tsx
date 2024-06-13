import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { SearchField, SearchFieldProps } from "./SearchField";
import { getFieldId } from "..";

export type SearchFieldControllerProps<V extends FieldValues, N extends FieldPath<V>> = {
  fieldProps: Omit<SearchFieldProps, 'name' | 'error' | 'helperText' | 'id'>;
  idApend?: string | number;
} & Omit<ControllerProps<V, N>, 'render'>;

export const ControllerSearchField = <V extends FieldValues, N extends FieldPath<V>>({
  name,
  control,
  fieldProps,
  idApend,
  ...rest
}: SearchFieldControllerProps<V, N>) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <SearchField
            {...field}
            {...fieldProps}
            id={getFieldId(name, idApend)}
            error={Boolean(error)}
            helperText={error?.message}
          />
        )
      }}
      {...rest}
    />
  )
}
