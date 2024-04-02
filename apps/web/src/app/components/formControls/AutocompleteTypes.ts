import { AutocompleteValue as MuiAutocompleteValue } from '@mui/material/useAutocomplete';

export type AutocompleteValue = {
  id: string | number;
  label: string;
} | null;

export type AutocompleteSelectedValue = MuiAutocompleteValue<
  AutocompleteValue,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;
