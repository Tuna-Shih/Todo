import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  handle = e => {
    const { handleChange } = this.props;
    handleChange(e);
  };

  add = () => {
    const { addTodo } = this.props;
    addTodo();
  };

  render() {
    const { todoText } = this.props;
    return (
      <div className="add-item">
        <input
          type="text"
          value={todoText}
          onChange={this.handle}
          placeholder="Add Something"
        />
        <button className="add-todo" onClick={this.add}>
          New
        </button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todoText: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default TodoItem;
