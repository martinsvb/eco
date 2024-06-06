import { getScrollbarDesign } from "@eco/config";
import { Palette } from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";
import { THEME_MODE } from "../../../config";

export const appGridClasses = {
  rowSelected: 'rowSelected'
}

export const getDataGridWrapperSx = ({error}: Palette, isMobilePortrait: boolean) => ({
  height: `calc(100vh - ${isMobilePortrait ? 212 : 180}px)`,
  width: `calc(100vw - ${isMobilePortrait ? 32 : 350}px)`,
  boxShadow: 2,
  '& .actions': {
    color: 'text.secondary',
  },
  '& .textPrimary': {
    color: 'text.primary',
  },
  '& .Mui-error': {
    background: error.light,
  },
});

export const getDataGridSx = ({background, grey, mode}: Palette, isMobilePortrait: boolean) => ({
  [`& .${gridClasses.scrollbar}`]: {
    ...getScrollbarDesign({
      trackColor: background.default,
      thumbColor: grey[500],
    }),
    pr: 0,
  },
  [`& .${gridClasses.footerContainer}`]: isMobilePortrait ?
    {
      justifyContent: 'start',
    }
    :
    undefined,
  [`& .${gridClasses.row}.${appGridClasses.rowSelected}`]: {
    backgroundColor: grey[mode === THEME_MODE.LIGHT ? 300 : 800],
  },
});
