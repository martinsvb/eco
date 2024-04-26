import { ChangeEvent, useCallback } from 'react';
import { IconButton, InputBase, Stack, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GridColumnMenuProps } from '@mui/x-data-grid';
import { t } from 'i18next';
import { apiGetUsers, selectFilter, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { UserFilterData } from '@eco/types';

export const UsersColumnMenu = ({ colDef: { field } }: GridColumnMenuProps) => {

  const { palette } = useTheme();

  const filter = useShallowEqualSelector(selectFilter);

  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilterData({[field]: e.target.value}));
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  return (
    <Stack p={1}>
      <Stack direction="row">
        <InputBase
          onChange={handleChange}
          value={filter[field as keyof UserFilterData] || ''}
          sx={{
            border: `1px solid ${palette.grey[300]}`,
            width: 140,
            p: 0.5,
            mr: 1
          }}
        />
        <IconButton
          aria-label={t('labels:filterToggle')}
          id={`toggle-table-filter-button-${field}`}
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
