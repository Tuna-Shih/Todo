import { useEffect } from 'react';
import loadMore from '../utils/loadMore';

export default ({ endCursor, todos }, { setEndCursor, setTodos }) =>
  useEffect(() => {
    const auto = ({ endCursor, todos }) => {
      const { endCursor: newEndCursor, todos: newTodos, total } = loadMore({
        endCursor,
        todos
      });
      if (
        todos.length < total &&
        todos.length <= (window.innerHeight - 350) / 40
      ) {
        return auto({ endCursor: newEndCursor, todos: newTodos });
      } else {
        return { endCursor, todos };
      }
    };

    const { endCursor: newEndCursor, todos: newTodos } = auto({
      endCursor,
      todos
    });
    setEndCursor(newEndCursor);
    setTodos(newTodos);
  }, []);
