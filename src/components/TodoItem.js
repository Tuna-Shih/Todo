import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Button, Input } from 'antd';

class TodoItem extends React.Component {
  render() {
    const { todoText, addTodo, deleteAllTodo, handleChange } = this.props;
    return (
      <div className={styles.add_item}>
        <Input
          type="text"
          value={todoText}
          onChange={handleChange}
          placeholder="Add Something"
        />
        <Button type="primary" onClick={addTodo}>
          New
        </Button>
        <Button type="primary" onClick={deleteAllTodo}>
          Del All
        </Button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todoText: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteAllTodo: PropTypes.func.isRequired
};

export default TodoItem;
