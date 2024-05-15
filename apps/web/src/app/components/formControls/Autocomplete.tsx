// @ts-nocheck
import { ElementType, FC } from 'react';
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteRenderGetTagProps,
} from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

import { IconSVGSpan } from 'components/Icon/Icon';
import { AutocompleteValue } from './AutocompleteTypes';
import TextField from './TextField';
import { BaseFormControlProps } from './formControlsTypes';

type MuiAutocompleteFilteredProps = Omit<
  MuiAutocompleteProps<AutocompleteValue, boolean | undefined, boolean | undefined, boolean | undefined, ElementType>,
  'renderInpout'
>;

interface AutocompleteProps {
  error: boolean;
  label: string;
}

const Autocomplete: FC<BaseFormControlProps & AutocompleteProps & MuiAutocompleteFilteredProps> = ({
  disabled,
  error,
  formHelperTextProps,
  helperText,
  id,
  label,
  name,
  renderInput,
  value,
  ...rest
}) => {

  const handleDelete = (event, tagIdx) => {
    if (onFormControlChange) {
      onFormControlChange({
        name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        value: value.filter((val, idx) => idx !== tagIdx),
        autocomplete: {
          event,
          reason: 'removeOption',
        },
      });
    }
  };

  return (
    <MuiAutocomplete
      {...rest}
      id={id}
      isOptionEqualToValue={(option, currentValue) =>
        typeof option === 'object' && typeof currentValue === 'object' && option?.id === currentValue?.id
      }
      renderInput={({ inputProps, InputProps }) => {
        return (
          <TextField
            {...InputProps}
            disabled={disabled}
            error={error}
            formHelperTextProps={formHelperTextProps}
            fullWidth
            helperText={helperText}
            id={id}
            inputProps={inputProps}
            label={label}
            name={name}
            sx={{
              pl: value?.length ? 1.75 : undefined,
              py: value?.length ? 1 : undefined,
            }}
          />
        );
      }}
      renderTags={(tags, getTagProps: AutocompleteRenderGetTagProps) =>
        tags.map((tag, idx) => {
          return (
            <Chip
              {...getTagProps(tag)}
              onDelete={(e) => handleDelete(e, idx)}
              key={`tag-${idx}`}
              label={tag.label}
              deleteIcon={<IconSVGSpan iconName="x" />}
              sx={{
                height: '20px',
              }}
            />
          );
        })
      }
      sx={{
        '& .MuiAutocomplete-tag': {
          m: 0.25,
        },
      }}
      value={value}
    />
  );
};

export default Autocomplete;
