import { useEffect } from 'react';
import loadMore from '../utils/loadMore';

export default (input, inputFunction) => {
  useEffect(() => {
    function auto(input) {
      const { endCursor, todos, todosLength } = loadMore({
        endCursor: input.endCursor,
        todos: input.todos
      });
      if (todos.length < todosLength && todos.length <= 15) {
        return auto({ endCursor, todos });
      } else {
        return { endCursor, todos };
      }
    }

    const { endCursor, todos } = auto(input);
    inputFunction.setEndCursor(endCursor);
    inputFunction.setTodos(todos);
  }, []);
};
