import { Controller, FieldValues } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { CustomFieldControllerProps } from "./customField";

const CutomTextFieldController = <T extends FieldValues>({
  name,
  control,
  fieldProps,
}: CustomFieldControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField {...field} {...fieldProps} error={error} />
      )}
    />
  );
};

export default CutomTextFieldController;
