import React from "react";
import {isDesktop} from 'react-device-detect';

export default function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(true);

  React.useEffect(() => {
    if(isDesktop) {
      setMobile(!isDesktop);
    }
  }, []);

  return { isMobile };
}
