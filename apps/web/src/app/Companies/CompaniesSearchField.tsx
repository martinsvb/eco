import { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { ApiOperations, CompanyFull } from "@eco/types";
import {
  apiGetCompanyAres,
  selectIsCompaniesLoading,
  useAppDispatch,
  useAppSelector
} from "@eco/redux";
import { Search } from "../components";

export const CompaniesSearchField = ({
  field,
  id,
  value
}: GridRenderEditCellParams<CompanyFull, string | number>) => {

  const apiRef = useGridApiContext();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [valueState, setValueState] = useState(value);

  const isLoading = useAppSelector((state) => selectIsCompaniesLoading(state, ApiOperations.getExternalItem));

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
    },
    [updateValue]
  );

  const handleSearch = useCallback(
    () => {
      if (valueState) {
        dispatch(apiGetCompanyAres({id, ico: `${valueState}`, apiRef}));
      }
    },
    [apiRef, dispatch, id, valueState]
  );

  return (
    <Search
      noBorder
      inputProps={{
        onChange: handleChange,
        name: field,
        value: valueState || '',
      }}
      inputWidth={130}
      isLoading={isLoading}
      buttonProps={{
        onClick: handleSearch,
        disabled: !valueState
      }}
      handleClear={handleClear}
      title={t('labels:filterSearch')}
    />
  )
}
