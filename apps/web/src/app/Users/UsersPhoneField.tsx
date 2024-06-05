import { ChangeEvent, useCallback, useRef, useState } from "react";
import { UserFull, UserItems } from "@eco/types";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { PhoneField } from "../components";

export const UsersPhoneField = ({ error, field, id, value }: GridRenderEditCellParams<UserFull, string>) => {

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
      name={UserItems.Phone}
      value={valueState ?? ''}
      error={error}
      onChange={handleChange}
      ref={phoneRef}
    />
  )
}
