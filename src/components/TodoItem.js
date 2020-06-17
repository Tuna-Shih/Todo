import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TodoItem.less';
import { Button, Input } from 'antd';
import stringWidth from 'string-width';

class TodoItem extends React.Component {
  handleVaildation = () => {
    const { todoText, addTodo } = this.props;

    if (
      todoText.length >= 200 ||
      todoText.split('').some(e => stringWidth(e) == 2)
    )
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
