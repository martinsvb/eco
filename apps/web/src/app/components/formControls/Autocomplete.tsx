/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ElementType, FC, SyntheticEvent, useCallback } from 'react';
import MuiAutocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
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
  'onChange' | 'renderInpout'
>;

interface AutocompleteProps {
  error: boolean;
  label: string;
}

const Autocomplete: FC<BaseFormControlProps & AutocompleteProps & MuiAutocompleteFilteredProps> = ({
  disabled,
  error,
  FormHelperTextProps,
  helperText,
  id,
  label,
  name,
  onFormControlChange,
  renderInput,
  value,
  ...rest
}) => {
  const handleChange = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      // todo: !provide correct interface
      autoCompleteValue: AutocompleteValue,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<any>
    ) => {
      if (onFormControlChange) {
        onFormControlChange({
          name,
          value: autoCompleteValue,
          autocomplete: {
            event,
            reason,
            details,
          },
        });
      }
    },
    [name, onFormControlChange]
  );

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
      // todo: correct handler value type
      // @ts-ignore
      onChange={handleChange}
      isOptionEqualToValue={(option, currentValue) =>
        typeof option === 'object' && typeof currentValue === 'object' && option?.id === currentValue?.id
      }
      renderInput={({ inputProps, InputProps }) => {
        return (
          <TextField
            {...InputProps}
            disabled={disabled}
            error={error}
            FormHelperTextProps={FormHelperTextProps}
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
