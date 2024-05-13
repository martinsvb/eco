import { ReactNode } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useMobilePortraitDetection } from "@eco/config";
import { useAppSelector, selectIsUserLoggedIn, useShallowEqualSelector, selectUserAuth } from "@eco/redux";
import { ScopeItems } from "@eco/types";

interface ButtonsProps {
  isLoading: boolean;
  scope: ScopeItems;
  refreshButton: ReactNode;
  createButton: ReactNode;
}

export const Buttons = ({isLoading, scope, refreshButton, createButton}: ButtonsProps) => {
  const isMobilePortrait = useMobilePortraitDetection();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { rights } = useShallowEqualSelector(selectUserAuth);

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
      {isLoading ?
        <CircularProgress
          sx={{
            alignSelf: 'baseline'
          }}
        />
        :
        isUserLoggedIn
          ?
            <Stack
              alignItems='center'
              justifyContent={isMobilePortrait ? 'center' : undefined}
              direction={isMobilePortrait ? 'row' : 'column'}
            >
              {refreshButton}
              {rights.scopes[scope]?.create && createButton}
            </Stack>
          : null
      }
    </Box>
  );
}
