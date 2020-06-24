import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Input, Button } from 'antd';
import useHandleValidation from './hooks/useHandleValidation';

const TodoItem = ({ todoText, deleteAllTodo, handleChange, addTodo }) => {
  const handleValidation = useHandleValidation(todoText, addTodo);

  return (
    <div className={styles.add_item}>
      <Input
        type="text"
        value={todoText}
        onChange={handleChange}
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
  todoText: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteAllTodo: PropTypes.func.isRequired
};

export default React.memo(TodoItem);
