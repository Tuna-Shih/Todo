import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Button, Input } from 'antd';
import stringWidth from 'string-width';

const TodoItem = props => {
  const { todoText, deleteAllTodo, handleChange, addTodo } = props;
  const handleVaildation = () => {
    if (
      todoText.length >= 200 ||
      todoText.split('').some(e => stringWidth(e) == 2)
    )
      return alert('Illegal input');
    addTodo();
  };

  return (
    <div className={styles.add_item}>
      <Input
        type="text"
        value={todoText}
        onChange={handleChange}
        placeholder="Add Something"
      />
      <Button type="primary" onClick={handleVaildation}>
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

export default TodoItem;
