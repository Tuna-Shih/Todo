import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles/App.less';
import TodoItem from './TodoItem';
import Todo from './Todo';
import FormList from './FormList';
import cookies from 'js-cookie';
import { List } from 'antd';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [endCursor, setEndCursor] = useState('');
  const [stop, setStop] = useState(0);

  const myRef = useRef(null);

  const loadData = (first, after) => {
    const getData = cookies.get('todoapp');

    if (!getData) return [];

    const todoData = JSON.parse(getData);

    const startIndex = !after
      ? -1
      : todoData.findIndex(todo => todo.id === after);

    return todoData.slice(startIndex + 1, startIndex + first + 1);
  };

  const loadMore = () => {
    const gotData = loadData(10, endCursor);

    if (gotData.length === 0) return;

    const lastID = gotData.length - 1;
    const newTodos = [...todos, ...gotData];
    setEndCursor(gotData[lastID].id);

    setTodos(newTodos);
  };

  const autoLoad = () => {
    const toStop =
      window.innerHeight > myRef.current.clientHeight
        ? window.innerHeight - myRef.current.clientHeight
        : 0;

    setStop(toStop);

    if (window.innerHeight < myRef.current.clientHeight) return;
    loadMore();
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      loadMore();
    }
  };

  useEffect(() => {
    autoLoad();
  }, [stop]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });

  const addTodo = () => {
    if (todoText.replace(/\s*/g, '') !== '') {
      const todo = { id: uuidv4(), text: todoText };
      const newTodos = [todo, ...todos];
      setTodos(newTodos);
      setTodoText('');
      cookies.set('todoapp', JSON.stringify(newTodos));
    }
  };

  const deleteAllTodo = () => {
    const newTodos = [];
    setTodos(newTodos);
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  const editTodo = (id, edit) => {
    const newTodos = todos.map(todo =>
      todo.id === id && edit.text.replace(/\s*/g, '') !== '' ? edit : todo
    );
    setTodos(newTodos);
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  const handleChange = e => {
    setTodoText(e.target.value);
  };

  return (
    <div className={styles.wrapper} ref={myRef}>
      <div className={styles.add}>
        <TodoItem
          todoText={todoText}
          addTodo={addTodo}
          handleChange={handleChange}
          deleteAllTodo={deleteAllTodo}
        />
      </div>
      <div>
        <List
          size="small"
          header={
            <div style={{ textAlign: 'center' }}>
              <button onClick={loadMore}>{todos.length} Todo!</button>
            </div>
          }
          footer={
            <div style={{ textAlign: 'center' }}>
              <FormList />
            </div>
          }
          bordered
          dataSource={todos}
          renderItem={todo => (
            <List.Item>
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default App;
