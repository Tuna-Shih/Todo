import { useEffect, useState, useRef } from 'react';
import loadMore from '../utils/loadMore';

export default (input, inputFunction) => {
  const [stop, setStop] = useState(0);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const toStop =
      window.innerHeight > wrapperRef.current.clientHeight
        ? window.innerHeight - wrapperRef.current.clientHeight
        : 0;
    setStop(toStop);

    if (window.innerHeight < wrapperRef.current.clientHeight) return;

    loadMore(
      { endCursor: input.endCursor, todos: input.todos },
      {
        setEndCursor: inputFunction.setEndCursor,
        setTodos: inputFunction.setTodos
      }
    );
  }, [stop]);
  return { wrapperRef };
};
