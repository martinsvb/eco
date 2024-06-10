import { ChangeEvent, useCallback } from "react";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { CompanyFull } from "@eco/types";
import { Input } from "..";

export const AppGridInputField = ({
  field,
  id,
  value
}: GridRenderEditCellParams<CompanyFull, string | number>) => {

  const apiRef = useGridApiContext();

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

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

  return (
    <Input
      inputProps={{
        onChange: handleChange,
        name: field,
        value: value || '',
      }}
    />
  )
}
