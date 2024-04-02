import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useState,
} from "react";
import { TextField } from "@mui/material";
import { CustomFieldProps } from "./customField";

const CustomTextField = memo(
  forwardRef(
    (
      { error, ...rest }: CustomFieldProps,
      ref: ForwardedRef<HTMLDivElement | null>
    ) => {
      const [changed, setChanged] = useState(false);
      const [hasError, setHasError] = useState(false);
      const [errorText, setErrorText] = useState<string | undefined>("");

      const handleBlur = useCallback<
        FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
      >(
        async (event) => {
          if (error) {
            setHasError(true);
            setErrorText(error.message);
          } else if (changed) {
            const {
              target: { name, value },
            } = event;
            setChanged(false);
          }
          rest.onBlur?.(event);
        },
        [rest, changed, error]
      );

      const handleChange = useCallback<
        ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
      >(
        (event) => {
          setChanged(true);
          rest.onChange?.(event);
          if (hasError) {
            setHasError(!!error);
            setErrorText(error?.message);
          }
        },
        [error, rest, hasError]
      );

      return (
        <TextField
          {...rest}
          ref={ref}
          error={hasError}
          helperText={errorText}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      );
    }
  )
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
