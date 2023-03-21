import React, {useEffect} from "react";

const useDelayUnmount = (isMounted: boolean, delayTime: number): boolean => {
  const [show, setShow] = React.useState<boolean>(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !show) {
      setShow(true);
    } else if (!isMounted && show) {
      timeoutId = setTimeout(() => setShow(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, show]);
  return show;
}

export default useDelayUnmount;