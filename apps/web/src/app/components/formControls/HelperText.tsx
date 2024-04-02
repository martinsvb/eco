import { FC, memo } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

import { BaseFormControlProps } from './formControlsTypes';

type HelperTextProps = Pick<BaseFormControlProps, 'id' | 'FormHelperTextProps' | 'helperText'>;

interface HelperTextStatesProps {
  error?: boolean;
}

const HelperText: FC<HelperTextProps & HelperTextStatesProps> = memo(
  ({ error, FormHelperTextProps, helperText, id }) => {
    const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

    return helperText ? (
      <FormHelperText id={helperTextId} {...FormHelperTextProps} error={error}>
        {helperText}
      </FormHelperText>
    ) : null;
  }
);

HelperText.displayName = 'HelperText';

export default HelperText;
