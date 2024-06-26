import { ForwardedRef, forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CircularProgress,
  IconButtonProps,
  InputBase,
  InputBaseProps,
  Stack,
  useTheme
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { AppIconButton } from '../buttons';
import HelperText from '../formControls/HelperText';
import { getBaseFormControlShape } from '../formControls/formControlsSettings';

export interface SearchProps {
  inputProps: InputBaseProps;
  buttonProps: IconButtonProps;
  handleClear: () => void;
  helperText?: string;
  inputWidth?: string | number;
  isLoading?: boolean;
  noBorder?: boolean;
  title: string;
}

export const Search = memo(forwardRef((
  {
    inputProps,
    inputWidth,
    isLoading,
    buttonProps,
    helperText,
    noBorder,
    title,
    handleClear,
  }: SearchProps,
  ref: ForwardedRef<unknown>
) => {

  const { palette, shape } = useTheme();

  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        ...getBaseFormControlShape(palette, shape, inputProps.error, noBorder),
        borderRadius: shape.borderRadius / 4,
      }}
    >
      <Stack
        justifyContent="center"
        width="100%"
      >
        <InputBase
          {...inputProps}
          id={`toggle-table-filter-input-${inputProps.name}`}
          endAdornment={!!inputProps.value &&
            <AppIconButton
              title={t('labels:filterSearchClear')}
              id={`toggle-table-filter-clear-button-${inputProps.name}`}
              onClick={handleClear}
              size={buttonProps.size}
            >
              <ClearIcon />
            </AppIconButton>
          }
          ref={ref}
          sx={{
            ...inputProps.sx,
            width: inputWidth || 160,
            p: 0.5
          }}
        />
        {inputProps.error &&
          <HelperText
            formHelperTextProps={{
              sx: {
                px: 0.5
              }
            }}
            id={`toggle-table-filter-input-${inputProps.name}-helperText`}
            helperText={helperText}
          />
        }
      </Stack>
      {isLoading ?
        <CircularProgress
          color="inherit"
          size={30}
          sx={{
            alignSelf: 'center',
            mr: 0.5
          }}
        />
        :
        <AppIconButton
          {...buttonProps}
          title={title}
          id={`toggle-table-filter-button-${inputProps.name}`}
          sx={{
            alignSelf: 'center',
            mr: 0.5
          }}
        >
          <SearchIcon />
        </AppIconButton>
      }
    </Stack>
  );
}));
