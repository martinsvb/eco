import { getScrollbarDesign } from "@eco/config";
import { Palette } from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";

export const getDataGridWrapperSx = (isMobilePortrait: boolean) => ({
  height: `calc(100vh - ${isMobilePortrait ? 212 : 180}px)`,
  width: `calc(100vw - ${isMobilePortrait ? 32 : 350}px)`,
  boxShadow: 2,
  '& .actions': {
    color: 'text.secondary',
  },
  '& .textPrimary': {
    color: 'text.primary',
  },
});

export const getDataGridSx = ({background, grey}: Palette, isMobilePortrait: boolean) => ({
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
});
