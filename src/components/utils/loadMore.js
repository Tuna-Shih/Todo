import cookies from 'js-cookie';

export default ({ endCursor, todos }) => {
  const getData = cookies.get('todoapp');
  if (!getData) return { endCursor: '', todos: [], total: 0 };
  const todoData = JSON.parse(getData);
  const startIndex = !endCursor
    ? -1
    : todoData.findIndex(todo => todo.id === endCursor);

  const gotData = todoData.slice(startIndex + 1, startIndex + 11);
  const total = todoData.length;

  if (gotData.length === 0) return { endCursor, todos, total };

  const lastID = gotData.length - 1;
  const newTodos = [...todos, ...gotData];

  return { endCursor: gotData[lastID].id, todos: newTodos, total };
};
