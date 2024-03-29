import { Box, Theme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

interface ButtonsProps {
  children: ReactNode;
}

export const Buttons = ({children}: ButtonsProps) => {
  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1,
        bottom: isMobilePortrait ? 72 : 16,
        right: 16,
        margin: '0 auto',
      }}
    >
      {children}
    </Box>
  );
}
