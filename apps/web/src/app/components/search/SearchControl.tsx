import { ForwardedRef, forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, InputBase, Stack, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { AppIconButton } from '../buttons';
import HelperText from '../formControls/HelperText';
import { getBaseFormControlShape } from '../formControls/formControlsSettings';
import { SearchProps } from './Search';

export const SearchControl = memo(forwardRef((
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
      justifyContent="center"
      width="100%"
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          ...getBaseFormControlShape(palette, shape, inputProps.error, noBorder),
          borderRadius: shape.borderRadius / 4,
        }}
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
      {inputProps.error &&
        <HelperText
          id={`toggle-table-filter-input-${inputProps.name}-helperText`}
          helperText={helperText}
          error={inputProps.error}
        />
      }
    </Stack>
  );
}));
