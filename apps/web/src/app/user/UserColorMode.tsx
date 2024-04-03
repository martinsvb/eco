import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, useTheme, Stack, Tooltip } from '@mui/material';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ms from 'ms';
import { LocalStorageItems, THEME_MODE } from '@eco/config';

const UserColorMode = () => {

    const { t } = useTranslation();

    const { palette } = useTheme();

    const handleClick = useCallback(
        (mode: THEME_MODE | null) => {
            if (mode) {
                localStorage.setItem(LocalStorageItems.Mode, mode);
            }
            else {
                localStorage.removeItem(LocalStorageItems.Mode);
            }
            dispatchEvent(new Event('storage'));
        },
        [palette]
    );

    const mode = localStorage.getItem(LocalStorageItems.Mode);

    return (
        <Stack direction="row" justifyContent="space-around">
            <Tooltip
                title={t('labels:colorModeLight')}
                enterDelay={ms('0.1s')}
            >
                <IconButton
                    color={mode === THEME_MODE.LIGHT ? 'primary' : 'inherit'}
                    onClick={() => {
                        handleClick(THEME_MODE.LIGHT)
                    }}
                    aria-label={t('labels:colorModeLight')}
                >
                    <Brightness5Icon />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={t('labels:colorModeDark')}
                enterDelay={ms('0.1s')}
            >
                <IconButton
                    color={mode === THEME_MODE.DARK ? 'primary' : 'inherit'}
                    onClick={() => {
                        handleClick(THEME_MODE.DARK)
                    }}
                    aria-label={t('labels:colorModeDark')}
                >
                    <Brightness2Icon />
                </IconButton>
            </Tooltip>
            <Tooltip
                title={t('labels:colorModeSystem')}
                enterDelay={ms('0.1s')}
            >
                <IconButton
                    color={!mode ? 'primary' : 'inherit'}
                    onClick={() => {
                        handleClick(null)
                    }}
                    aria-label={t('labels:colorModeSystem')}
                >
                    <SettingsBrightnessIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

export default UserColorMode;
