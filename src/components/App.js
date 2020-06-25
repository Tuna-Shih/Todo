import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/App.less';
import TodoItem from './TodoItem';
import Todo from './Todo';
import FormList from './FormList';
import { List } from 'antd';
import {
  useAutoLoad,
  useAddTodo,
  useDeleteAllTodo,
  useDeleteTodo,
  useEditTodo,
  useHandleScroll
} from './hooks/useApp';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [endCursor, setEndCursor] = useState('');
  const [stop, setStop] = useState(0);

  const wrapperRef = useRef(null);

  const autoLoad = useAutoLoad(
    endCursor,
    todos,
    setEndCursor,
    setTodos,
    wrapperRef,
    setStop
  );
  const addTodo = useAddTodo(todoText, todos, setTodos, setTodoText);
  const deleteAllTodo = useDeleteAllTodo(setTodos);
  const deleteTodo = useDeleteTodo(todos, setTodos);
  const editTodo = useEditTodo(todos, setTodos);
  const handleScroll = useHandleScroll(
    endCursor,
    todos,
    setEndCursor,
    setTodos
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
          todoText={todoText}
          addTodo={addTodo}
          handleChange={e => {
            setTodoText(e.target.value);
          }}
          deleteAllTodo={deleteAllTodo}
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
export default React.memo(App);
