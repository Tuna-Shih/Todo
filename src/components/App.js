import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/App.less';
import TodoItem from './TodoItem';
import Todo from './Todo';
import FormList from './FormList';
import { List } from 'antd';
import cookies from 'js-cookie';
import useAddTodo from './hooks/useAddTodo';
import useAutoLoad from './hooks/useAutoLoad';
import useHandleScroll from './hooks/useHandleScroll';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [endCursor, setEndCursor] = useState('');
  const [stop, setStop] = useState(0);

  const wrapperRef = useRef(null);

  const addTodo = useAddTodo(todos, setTodos);

  const autoLoad = useAutoLoad(
    { endCursor: endCursor, todos: todos, wrapperRef: wrapperRef },
    { setEndCursor: setEndCursor, setTodos: setTodos, setStop: setStop }
  );

  const handleScroll = useHandleScroll(
    { endCursor: endCursor, todos: todos },
    { setEndCursor: setEndCursor, setTodos: setTodos }
  );

  useEffect(autoLoad, [stop]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.add}>
        <TodoItem
          addTodo={addTodo}
          deleteAllTodo={() => {
            const newTodos = [];
            setTodos(newTodos);
            cookies.set('todoapp', JSON.stringify(newTodos));
          }}
        />
      </div>
      <div>
        <List
          size="small"
          header={
            <div style={{ textAlign: 'center' }}>{todos.length} Todo!</div>
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
                deleteTodo={id => {
                  const newTodos = todos.filter(todo => todo.id !== id);
                  setTodos(newTodos);
                  cookies.set('todoapp', JSON.stringify(newTodos));
                }}
                editTodo={(id, edit) => {
                  const newTodos = todos.map(todo =>
                    todo.id === id && edit.text.replace(/\s*/g, '') !== ''
                      ? edit
                      : todo
                  );
                  setTodos(newTodos);
                  cookies.set('todoapp', JSON.stringify(newTodos));
                }}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default React.memo(App);
