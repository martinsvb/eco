import { Box, styled } from "@mui/material";
import { ReactNode } from "react";

const StyledBox = styled(Box)({
  position: 'absolute',
  zIndex: 1,
  bottom: 16,
  right: 16,
  margin: '0 auto',
});

interface ButtonsProps {
  children: ReactNode;
}

export const Buttons = ({children}: ButtonsProps) => {

  return (
    <StyledBox>
      {children}
    </StyledBox>
  );
}
