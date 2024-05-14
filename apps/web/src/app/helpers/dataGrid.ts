import { GridAlignment, GridColDef, GridRowId, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";

export const setRowMode = (id: GridRowId, mode: GridRowModes) => (prevRowModesModel: GridRowModesModel) => ({
  ...prevRowModesModel,
  [id]: { mode }
})

export const columnSettings = (
  field: string,
  width: number,
  align: GridAlignment = 'center'
): Pick<GridColDef, 'align' | 'field' | 'headerAlign' | 'width'> => ({
  field,
  width,
  align,
  headerAlign: align,
})
