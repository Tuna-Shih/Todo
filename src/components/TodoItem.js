import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Input, Button } from 'antd';
import useHandleValidation from './hooks/useHandleValidation';

const TodoItem = ({ deleteAllTodo, addTodo }) => {
  const [todoText, setTodoText] = useState('');
  const handleValidation = useHandleValidation(todoText, {
    addTodo: addTodo,
    setTodoText: setTodoText
  });

  return (
    <div className={styles.add_item}>
      <Input
        type="text"
        value={todoText}
        onChange={e => {
          setTodoText(e.target.value);
        }}
        placeholder="Add Something"
      />
      <Button type="primary" onClick={handleValidation}>
        New
      </Button>
      <Button type="primary" onClick={deleteAllTodo}>
        Del All
      </Button>
    </div>
  );
};

TodoItem.propTypes = {
  addTodo: PropTypes.func.isRequired,
  deleteAllTodo: PropTypes.func.isRequired
};

export default React.memo(TodoItem);
