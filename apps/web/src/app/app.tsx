import { useMobilePortraitDetection } from './hooks/useMobileDetection';
import Desktop from './layout/Desktop';
import Mobile from './layout/Mobile';

export default () => {
  const isMobilePortrait = useMobilePortraitDetection();

  return (
    isMobilePortrait
      ? <Mobile />
      : <Desktop />
  );
}
