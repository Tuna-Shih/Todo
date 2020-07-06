import React, { useState } from 'react';
import { List } from 'antd';
import cookies from 'js-cookie';

import styles from './styles/App.less';
import TodoItem from './TodoItem';
import Todo from './Todo';
import FormList from './FormList';
import useAddTodo from './hooks/useAddTodo';
import useAutoLoad from './hooks/useAutoLoad';
import useHandleScroll from './hooks/useHandleScroll';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [endCursor, setEndCursor] = useState('');

  const addTodo = useAddTodo(todos, setTodos);

  useAutoLoad({ endCursor, todos }, { setEndCursor, setTodos });

  useHandleScroll({ endCursor, todos }, { setEndCursor, setTodos });

  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        <TodoItem
          addTodo={addTodo}
          deleteAllTodo={() => {
            setTodos([]);
            cookies.set('todoapp', JSON.stringify([]));
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
