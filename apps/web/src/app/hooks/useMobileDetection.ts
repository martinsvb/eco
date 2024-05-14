import { Theme, useMediaQuery, useTheme } from "@mui/material";

export const useMobilePortraitDetection = () => {
  return useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`
  });
}

export const useMobileDetection = () => {
  const { breakpoints } = useTheme();
  return useMediaQuery(breakpoints.down('md'));
}
