import { Palette } from '@mui/material/styles';
import { THEME_MODE } from './theme/config/palette/types';

export const COLORS = {
  white: '#ffffff',
  whiteAlpha73: '#FFFFFFBA', // white 73%
  whiteAlpha0: '#ffffff00', // transparent white
  black: '#000000',
  grey700: '#5E617B', // darkGray
  grey100: '#F5F6FA', // ghostWhite
  grey120: 'rgba(255, 255, 255, 0.12)', // disabled button border color
  grey50: '#FDFDFD', // whiteTint
  lavenderGrey100: '#BCBDCE', // lavenderGray
  lavenderGrey50: '#e4e5eb', // lavenderGrayInverse
  yellow600: '#F9D413', // saturatedYellow
  yellow300: '#ffe9ac', // lightYellow should (or not) be replaced while final design
  orangeYellow600: '#E6C229', // jonquil
  orange900: '#E68429', // orange
  brown900: '#9D510A', // brown
  orangeRed800: '#DB2D06', // atAOrange
  red600: '#F93D13', // coquelicot
  violet500: '#7237C5', // frenchViolet
  teal300: '#1DC4AB', // keppel
  olive50: '#EFE8C9', // yellow23
  blue600: '#0035EC', // blue
  blue800: 'rgba(0, 53, 236, 0.8)', // blue80
  blue160: 'rgba(0, 53, 236, 0.16)', // blue16
  blue50: '#E5EBFF', // multiselectOffAir
  blue25: '#DBF4FFFF', // blue25 should (or not) be replaced while final design
  darkBlue900: '#1F2444', // transparent space36Cadet100
  darkBlue900Alpha73: '#1F2444BA', // 73% space36Cadet100
  darkBlue900Alpha0: '#1F244400', // transparent space36Cadet100
  darkBlue500: 'rgba(36, 34, 89, 0.5)', // spaceCadet50
  darkBlue650: 'rgba(31, 36, 68, 0.65)', // spaceCadet65
  darkBlue800: 'rgba(31, 36, 68, 0.8)', // spaceCadet80
  darkBlue50: '#E5E7EE', // lightGray
  componentVariantContainer: '#7B61FF',
  doNotCount: 'rgba(41, 230, 185, 0.5)',
  error: '#E10A0A',
  info: '#57C5E0',
  multiSelectOffAir: '#E6EBFF',
  multiSelectOnAir: '#FFE9E4',
  scriptReady: '#0BB5EB',
  selectedText: 'rgba(230, 194, 41, 0.5)',
  skippedRow: '#EFEFF2',
  success: '#2FAD38',
  successful: '#E6FFF6',
  systemSuccessfull: '#E5FFF6', // should (or not) be replaced while final design
  warning: '#FF8E1E',
  backgroundMainHover: { [THEME_MODE.LIGHT]: '#4C5069', [THEME_MODE.DARK]: '#4C5069' },
  backgroundOffAir: '#FFFF0033',
  foregroundOffAir: '#FFFFFFFF',
  backgroundOnAir: '#F0FF3311',
  foregroundOnAir: '#FFFFFFFF',
  backgroundCued: '#F000FF11',
  foregroundCued: '#FF333333',
  rundownStatusBackgrounds: {
    onair: '#DC143C',
    archived: '#808080',
    readyToAir: '#FFA500',
    locked: '#FF8C00',
    connected: '#006400',
  },
};

export const getBackgroundColor = ({ mode,  }: Palette) =>
  mode === THEME_MODE.LIGHT ? COLORS.white : COLORS.darkBlue900;

export const getForegroundColor = ({ mode }: Palette) =>
  mode === THEME_MODE.LIGHT ? COLORS.darkBlue900 : COLORS.white;
