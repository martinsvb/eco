import { ForwardedRef, forwardRef, memo, useCallback, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDateFieldProps } from "./customField";
import { UpdateStatus } from "../inputFieldUpdateIndicator/inputFieldUpdateIndicatorTypings";
import InputFieldUpdateIndicator from "../inputFieldUpdateIndicator/InputFieldUpdateIndicator";
import { isValid } from "date-fns";

const CustomDateField = memo(
  forwardRef(
    (
      { error, saveData, ...rest }: CustomDateFieldProps,
      ref: ForwardedRef<HTMLDivElement | null>
    ) => {
      const [hasError, setHasError] = useState(false);
      const [errorText, setErrorText] = useState<string | undefined>("");
      const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({});

      const handleDateChange = useCallback(
        async (newValue: Date | string | null) => {
          if (isValid(newValue) && new Date(newValue).getFullYear() > 1900) {
            await saveData(rest.name, setUpdateStatus, newValue);
          }
        },
        [saveData]
      );

      return (
        <DatePicker
          {...rest}
          ref={ref}
          format="dd. MM. yyyy"
          onChange={handleDateChange}
          value={rest.value ? new Date(rest.value) : undefined}
          slotProps={{
            textField: {
              ...rest.slotProps?.textField,
              helperText: errorText,
              InputProps: {
                error: hasError,
                startAdornment: (
                  <InputFieldUpdateIndicator
                    id={rest.id || rest.name}
                    {...updateStatus}
                  />
                ),
              },
            },
          }}
        />
      );
    }
  )
);

CustomDateField.displayName = "CustomDateField";

export default CustomDateField;
