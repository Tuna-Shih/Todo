import cookies from 'js-cookie';

export default input => {
  const loadData = (first, after) => {
    const getData = cookies.get('todoapp');
    if (!getData) return [];
    const todoData = JSON.parse(getData);
    const startIndex = !after
      ? -1
      : todoData.findIndex(todo => todo.id === after);

    return {
      gotData: todoData.slice(startIndex + 1, startIndex + first + 1),
      todosLength: todoData.length
    };
  };

  const { gotData, todosLength } = loadData(10, input.endCursor);
  if (gotData.length === 0)
    return { endCursor: input.endCursor, todos: input.todos, todosLength };

  const lastID = gotData.length - 1;
  const newTodos = [...input.todos, ...gotData];

  return { endCursor: gotData[lastID].id, todos: newTodos, todosLength };
};
