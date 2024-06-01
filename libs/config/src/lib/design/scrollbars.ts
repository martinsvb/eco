import { CSSProperties } from 'react';

const SCROLLBAR_BORDER_RADIUS = '5px';

interface ScrollbarDesignParams {
  trackColor: CSSProperties['color'];
  thumbColor: CSSProperties['color'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const getScrollbarDesign = ({ trackColor, thumbColor, width = 8, height = 8 }: ScrollbarDesignParams) => ({
  pr: 1,
  '&::-webkit-scrollbar': {
    height,
    width,
    display: 'block',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: trackColor,
    borderRadius: SCROLLBAR_BORDER_RADIUS,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: thumbColor,
    borderRadius: SCROLLBAR_BORDER_RADIUS,
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: trackColor,
  },
});
