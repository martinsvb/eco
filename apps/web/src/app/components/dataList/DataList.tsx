import { Box, BoxProps, Paper, Stack, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { is } from 'ramda';
import { THEME_MODE } from '../../../config';
import { DataListItemData } from '../../helpers/getDataListPairs';
import { useMobileDetection } from '../../hooks';

interface DataListProps extends BoxProps {
  titleWidth: number;
  data: DataListItemData[];
  name?: string;
}

export const DataList = ({titleWidth, data, name, sx, ...rest}: DataListProps) => {

  const { palette, typography } = useTheme();

  const isMobile = useMobileDetection();

  return (
    <Box
      {...rest}
      component={Paper}
      mb={isMobile ? 2 : undefined}
      width={isMobile ? '100%' : undefined}
      sx={{
        ...sx,
        border: palette.mode === THEME_MODE.DARK
          ? `1px solid ${palette.grey[500]}`
          : undefined
      }}
    >
      {data.map(({item, value}, index) => (
        <Stack
          key={`${item}-${index}`}
          direction="row"
          p={2}
          sx={{
            background: index % 2
              ? palette.grey[palette.mode === THEME_MODE.LIGHT ? 300 : 800]
              : palette.background.default,
            borderBottom: `1px solid ${palette.grey[500]}`
          }}
        >
          <Typography
            variant="body1"
            mr={2}
            width={!isMobile ? titleWidth : undefined}
            fontWeight={typography.fontWeightBold}
          >
            {item === 'name' && name ? name : item}
          </Typography>
          {is(Object, value)
            ? <Box component="pre" my={0} sx={{'white-space': 'pre-wrap'}}>
                {JSON.stringify(value, undefined, 2)}
              </Box>
            : is(Boolean, value)
              ? value
                ? <CheckIcon />
                : <ClearIcon />
              : <Typography variant="body1">{value}</Typography>
          }
        </Stack>
      ))}
    </Box>
  );
};
