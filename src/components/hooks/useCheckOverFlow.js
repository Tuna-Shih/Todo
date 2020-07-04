import { useEffect, useState, useRef } from 'react';

export default isEdit => {
  const [overflow, setOverflow] = useState();
  const checkOverflowRef = useRef(null);

  useEffect(() => {
    const isOverflow = getComputedStyle(checkOverflowRef.current).width;

    if (isOverflow == '250px') {
      setOverflow(true);
    } else setOverflow(false);
  }, [isEdit]);

  return { overflow, checkOverflowRef };
};
