import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { ApiOperations, CompanyFull, CompanyItems } from "@eco/types";
import {
  apiGetCompanyAres,
  selectCompanyAresSubject,
  selectIsCompaniesLoading,
  useAppDispatch,
  useAppSelector,
  useShallowEqualSelector
} from "@eco/redux";
import { Search } from "../components";

export const CompaniesSearchField = ({
  field,
  id,
  row,
  value
}: GridRenderEditCellParams<CompanyFull, string | number>) => {

  const apiRef = useGridApiContext();

  const dispatch = useAppDispatch();

  const [valueState, setValueState] = useState(value);

  const [searchValue, setSearchValue] = useState('');

  const isLoading = useAppSelector((state) => selectIsCompaniesLoading(state, ApiOperations.getExternalItem));

  const aresSubject = useShallowEqualSelector((state) => selectCompanyAresSubject(state, searchValue));

  useEffect(
    () => {
      if (aresSubject) {
        console.log({aresSubject})
        apiRef.current.setEditCellValue(
          {
            id,
            field: CompanyItems.Vat,
            value: row.vat || aresSubject.dic,
            debounceMs: 200,
            unstable_skipValueParser: true
          },
        );
      }
    },
    [aresSubject, apiRef, id, row.vat]
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

  const handleClear = useCallback(
    () => {
      updateValue('');
      setSearchValue('');
    },
    [updateValue]
  );

  const handleSearch = useCallback(
    () => {
      console.log({field, valueState})
      if (valueState) {
        setSearchValue(`${valueState}`);
        dispatch(apiGetCompanyAres(`${valueState}`));
      }
    },
    [dispatch, field, valueState]
  );

  return (
    <Search
      inputProps={{
        onChange: handleChange,
        name: field,
        value: valueState || '',
      }}
      inputWidth={140}
      isLoading={isLoading}
      buttonProps={{
        onClick: handleSearch,
        disabled: !valueState
      }}
      handleClear={handleClear}
    />
  )
}
