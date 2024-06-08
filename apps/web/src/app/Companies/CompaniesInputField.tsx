import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { CompanyFull } from "@eco/types";
import { Input } from "../components";

export const CompaniesInputField = ({
  field,
  id,
  value
}: GridRenderEditCellParams<CompanyFull, string | number>) => {

  const apiRef = useGridApiContext();

  const [valueState, setValueState] = useState(value);

  useEffect(
    () => {
      if (value && value !== valueState) {
        setValueState(value);
      }
    },
    [value, valueState]
  );

  const updateValue = useCallback(
    (newValue: string | number) => {
      const column = apiRef.current.getColumn(field);

      let parsedValue = newValue;
      if (column.valueParser) {
        parsedValue = column.valueParser(newValue, apiRef.current.getRow(id), column, apiRef);
      }

      setValueState(parsedValue);
      apiRef.current.setEditCellValue(
        { id, field, value: parsedValue, debounceMs: 200, unstable_skipValueParser: true },
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

  return (
    <Input
      inputProps={{
        onChange: handleChange,
        name: field,
        value: valueState || '',
      }}
    />
  )
}
