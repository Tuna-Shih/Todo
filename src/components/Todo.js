import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Todo.less';
import { Button, Input, Tooltip } from 'antd';

class Todo extends React.Component {
  state = {
    isEdit: false,
    editText: this.props.todo.text,
    overflow: false
  };

  myRef = React.createRef();

  componentDidMount() {
    this.checkOverflow();
  }

  checkOverflow = () => {
    const isOverflow = getComputedStyle(this.myRef.current).width;

    if (isOverflow == '250px') return this.setState({ overflow: true });

    this.setState({
      overflow: false
    });
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
    this.checkOverflow();
  };

  render() {
    const { todo } = this.props;
    const { isEdit, editText, overflow } = this.state;

    return (
      <div className={styles.item}>
        <div className={styles.item_content} ref={this.myRef}>
          {overflow ? (
            <Tooltip title={todo.text} mouseEnterDelay={0.5}>
              <span>{todo.text}</span>
            </Tooltip>
          ) : (
            <span>{todo.text}</span>
          )}
        </div>

        <div className={isEdit ? styles.none : styles.item_state}>
          <Button type="primary" onClick={this.delete}>
            Delete
          </Button>
          <Button type="primary" onClick={this.toggle}>
            {isEdit ? 'Editing' : 'Edit'}
          </Button>
        </div>

        {isEdit ? (
          <div className={styles.edit_input}>
            <Input type="text" value={editText} onChange={this.handleChange} />
            <Button type="primary" onClick={this.submit}>
              Submit
            </Button>
            <Button type="primary" onClick={this.toggle}>
              {isEdit ? 'Editing' : 'Edit'}
            </Button>
          </div>
        ) : null}
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
