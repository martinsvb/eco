import { memo } from 'react';
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

export interface SearchProps {
  inputProps: InputBaseProps;
  buttonProps: IconButtonProps;
  handleClear: () => void;
  inputWidth?: string | number;
  isLoading?: boolean;
  noBorder?: boolean;
  title: string;
}

export const Search = memo(({
  inputProps,
  inputWidth,
  isLoading,
  buttonProps,
  noBorder,
  title,
  handleClear,
}: SearchProps) => {

  const { palette, shape } = useTheme();

  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      alignItems="baseline"
      sx={{
        border: noBorder ? 0 : `1px solid ${palette.grey[500]}`,
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
  );
});
