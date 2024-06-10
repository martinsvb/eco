import { ChangeEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GridRenderEditCellParams, useGridApiContext } from "@mui/x-data-grid";
import { ApiOperations, CompanyFull } from "@eco/types";
import { apiGetCompanyAres, selectIsCompaniesLoading, useAppDispatch, useAppSelector } from "@eco/redux";
import { Search } from "../components";

export const CompaniesSearchField = ({
  field,
  id,
  value
}: GridRenderEditCellParams<CompanyFull, string | number>) => {

  const apiRef = useGridApiContext();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(
    (state) => selectIsCompaniesLoading(state, `${ApiOperations.getExternalItem}-${id}`)
  );

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

  const handleSearch = useCallback(
    () => {
      if (value) {
        dispatch(apiGetCompanyAres({id, ico: `${value}`, apiRef}));
      }
    },
    [apiRef, dispatch, id, value]
  );

  return (
    <Search
      noBorder
      inputProps={{
        onChange: handleChange,
        name: field,
        value: value || '',
      }}
      inputWidth={115}
      isLoading={isLoading}
      buttonProps={{
        onClick: handleSearch,
        disabled: !value,
        size: 'small'
      }}
      handleClear={handleClear}
      title={t('labels:filterSearch')}
    />
  )
}
