import { ChangeEvent, useCallback, useRef, useState } from "react";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { PhoneField } from "..";

export const AppGridPhoneField = ({ error, field, id, value }: GridRenderEditCellParams<any, string>) => {

  const apiRef = useGridApiContext();
  const phoneRef = useRef(null);
  const [valueState, setValueState] = useState(value);

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      const column = apiRef.current.getColumn(field);

      let parsedValue = newValue;
      if (column.valueParser) {
        parsedValue = column.valueParser(newValue, apiRef.current.getRow(id), column, apiRef);
      }

      setValueState(parsedValue);
      apiRef.current.setEditCellValue(
        { id, field, value: parsedValue, debounceMs: 200, unstable_skipValueParser: true },
        event,
      );
    },
    [apiRef, field, id],
  );

  return (
    <PhoneField
      noBorder
      noBorderFocus
      noLabelMargin
      id={`${field}-${id}`}
      name={field}
      value={valueState ?? ''}
      error={error}
      onChange={handleChange}
      ref={phoneRef}
    />
  )
}
