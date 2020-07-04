import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Input, Button } from 'antd';
import useHandleValidation from './hooks/useHandleValidation';

const TodoItem = ({ deleteAllTodo, addTodo }) => {
  const { todoText, onChange, handleValidation } = useHandleValidation(addTodo);

  return (
    <div className={styles.add_item}>
      <Input
        type="text"
        value={todoText}
        onChange={onChange}
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
