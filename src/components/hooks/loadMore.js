import cookies from 'js-cookie';

export default (input, inputFunction) => {
  const loadData = (first, after) => {
    const getData = cookies.get('todoapp');
    if (!getData) return [];
    const todoData = JSON.parse(getData);
    const startIndex = !after
      ? -1
      : todoData.findIndex(todo => todo.id === after);

    return todoData.slice(startIndex + 1, startIndex + first + 1);
  };

  const gotData = loadData(5, input.endCursor);
  if (gotData.length === 0) return;

  const lastID = gotData.length - 1;
  const newTodos = [...input.todos, ...gotData];
  inputFunction.setEndCursor(gotData[lastID].id);
  inputFunction.setTodos(newTodos);
};
