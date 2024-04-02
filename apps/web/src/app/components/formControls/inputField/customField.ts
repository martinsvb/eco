import { TextFieldProps } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import {
  Control,
  FieldValues,
  FieldError,
  GlobalError,
  Path,
} from "react-hook-form";

export interface CustomFieldProps extends Omit<TextFieldProps, "error"> {
  error?: FieldError | GlobalError;
}

export interface CustomFieldControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  fieldProps: CustomFieldProps;
}

export interface CustomDateFieldProps
  extends Omit<DatePickerProps<Date | string>, "error">,
    Pick<TextFieldProps, "id"> {
  name: string;
  error?: FieldError | GlobalError;
}
