import { FC, memo } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

import { BaseFormControlProps } from './formControlsTypes';

type HelperTextProps = Pick<BaseFormControlProps, 'formHelperTextProps' | 'helperText'>;

interface HelperTextStatesProps {
  id?: string;
  error?: boolean;
}

const HelperText: FC<HelperTextProps & HelperTextStatesProps> = memo(
  ({ error, formHelperTextProps, helperText, id }) => {
    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

    return helperText ? (
      <FormHelperText
        {...formHelperTextProps}
        id={helperTextId}
        error={error}
      >
        {helperText}
      </FormHelperText>
    ) : null;
  }
);

HelperText.displayName = 'HelperText';

export default HelperText;
