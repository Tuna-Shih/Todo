import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.Component {
  delete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  render() {
    const { todo } = this.props;
    return (
      <div className="list-item">
        <div className="list-item__content">{todo.text}</div>
        <div className="list-item__state">
          <button className="delete" onClick={this.delete}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  deleteTodo: PropTypes.func
};

export default Todo;
