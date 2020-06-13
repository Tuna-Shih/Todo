import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.less';

class Todo extends React.Component {
  state = {
    isEdit: false,
    editText: this.props.todo.text
  };

  delete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  toggle = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  handleChange = e => {
    this.setState({
      editText: e.target.value
    });
  };

  submit = () => {
    const { todo, editTodo } = this.props;
    const { editText } = this.state;
    const edit = { id: todo.id, text: editText };
    editTodo(todo.id, edit);
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  render() {
    const { todo } = this.props;
    const { isEdit, editText } = this.state;

    return (
      <div className={styles.item}>
        <div className={styles.item__content}>{todo.text}</div>
        <div>
          <div className={styles.item__state}>
            <button className="delete" onClick={this.delete}>
              Delete
            </button>
            <button className="edit" onClick={this.toggle}>
              {isEdit ? 'Editing' : 'Edit'}
            </button>
          </div>
          <div className={styles.edit__input}>
            {isEdit ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={this.handleChange}
                />
                <button className="submit" onClick={this.submit}>
                  Submit
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
};

export default Todo;
