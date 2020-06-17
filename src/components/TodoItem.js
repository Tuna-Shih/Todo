import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Button, Input } from 'antd';

class TodoItem extends React.Component {
  handleVaildation = () => {
    const { todoText, addTodo } = this.props;
    if (todoText.match(/[^x00-xff]/g) && !todoText.match(/[\uff65-\uff9f]/g))
      return alert('Illegal input');
    addTodo();
  };

  render() {
    const { todoText, deleteAllTodo, handleChange } = this.props;
    return (
      <div className={styles.add_item}>
        <Input
          type="text"
          value={todoText}
          onChange={handleChange}
          placeholder="Add Something"
          maxLength={200}
        />
        <Button type="primary" onClick={this.handleVaildation}>
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
