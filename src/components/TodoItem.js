import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Input, Button } from 'antd';
import handleValidation from './hooks/useHandleValidation';

const TodoItem = ({ todoText, deleteAllTodo, handleChange, addTodo }) => {
  const handleValidationF = handleValidation(todoText, addTodo);

  return (
    <div className={styles.add_item}>
      <Input
        type="text"
        value={todoText}
        onChange={handleChange}
        placeholder="Add Something"
      />
      <Button type="primary" onClick={handleValidationF}>
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
