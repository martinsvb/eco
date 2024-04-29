import { IconButton, IconButtonProps, InputBase, InputBaseProps, Stack, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { t } from 'i18next';
import { memo } from 'react';

interface SearchProps {
  inputProps: InputBaseProps;
  buttonProps: IconButtonProps;
  handleClear: () => void;
}

const Search = ({
  inputProps,
  buttonProps,
  handleClear,
}: SearchProps) => {

  const { palette, shape } = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        border: `1px solid ${palette.grey[300]}`,
        borderRadius: shape.borderRadius / 4,
      }}
    >
      <InputBase
        {...inputProps}
        id={`toggle-table-filter-input-${inputProps.name}`}
        endAdornment={ !!inputProps.value &&
          <IconButton
            aria-label={t('labels:filterSearchClear')}
            id={`toggle-table-filter-clear-button-${inputProps.name}`}
            onClick={handleClear}
          >
            <ClearIcon />
          </IconButton>
        }
        sx={{
          width: 160,
          p: 0.5
        }}
      />
      <IconButton
        {...buttonProps}
        aria-label={t('labels:filterSearch')}
        id={`toggle-table-filter-button-${inputProps.name}`}
        sx={{
          alignSelf: 'center',
          mr: 0.5
        }}
      >
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}

export default memo(Search);
