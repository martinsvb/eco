import { ChangeEvent, MutableRefObject, useCallback } from "react";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { Search } from "..";

type AppGridSearchFieldProps = {
  apiRef: MutableRefObject<GridApiCommunity>;
  handleSearch: () => void;
  inputWidth?: string | number;
  isLoading: boolean;
  title: string;
} & GridRenderEditCellParams<any, string | number>;

export const AppGridSearchField = ({
  apiRef,
  field,
  handleSearch,
  id,
  inputWidth,
  isLoading,
  value,
  title
}: AppGridSearchFieldProps) => {

  const updateValue = useCallback(
    (newValue: string | number) => {
      const column = apiRef.current.getColumn(field);

      let parsedValue = newValue;
      if (column.valueParser) {
        parsedValue = column.valueParser(newValue, apiRef.current.getRow(id), column, apiRef);
      }

      apiRef.current.setEditCellValue(
        { id, field, value: parsedValue, debounceMs: 10, unstable_skipValueParser: true },
      );
    },
    [apiRef, field, id],
  );

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      updateValue(event.target.value);
    },
    [updateValue],
  );

  const handleClear = useCallback(
    () => {
      updateValue('');
    },
    [updateValue]
  );

  return (
    <Search
      noBorder
      inputProps={{
        onChange: handleChange,
        name: field,
        value: value || '',
      }}
      inputWidth={inputWidth}
      isLoading={isLoading}
      buttonProps={{
        onClick: handleSearch,
        disabled: !value,
        size: 'small'
      }}
      handleClear={handleClear}
      title={title}
    />
  )
}
