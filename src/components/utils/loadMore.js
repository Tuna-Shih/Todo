import cookies from 'js-cookie';

export default ({ endCursor, todos }) => {
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

  const { gotData, todosLength } = loadData(10, endCursor);
  if (gotData.length === 0) return { endCursor, todos, todosLength };

  const lastID = gotData.length - 1;
  const newTodos = [...todos, ...gotData];

  return { endCursor: gotData[lastID].id, todos: newTodos, todosLength };
};
