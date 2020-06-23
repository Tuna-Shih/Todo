import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Todo.less';
import { Button, Input, Tooltip } from 'antd';

const Todo = props => {
  const { todo, editTodo, deleteTodo } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(props.todo.text);
  const [overflow, setOverflow] = useState(false);

  const myRef = useRef(null);

  useEffect(() => {
    checkOverflow();
  });

  const checkOverflow = () => {
    const isOverflow = getComputedStyle(myRef.current).width;

    if (isOverflow == '250px') return setOverflow(true);

    return setOverflow(false);
  };

  const del = () => {
    deleteTodo(todo.id);
  };

  const toggle = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = e => {
    setEditText(e.target.value);
  };

  const submit = () => {
    const edit = { id: todo.id, text: editText };
    editTodo(todo.id, edit);
    setIsEdit(!isEdit);
    checkOverflow();
  };

  return (
    <div className={styles.item}>
      <div className={styles.item_content} ref={myRef}>
        {overflow ? (
          <Tooltip title={todo.text} mouseEnterDelay={0.5}>
            <span>{todo.text}</span>
          </Tooltip>
        ) : (
          <span>{todo.text}</span>
        )}
      </div>

      <div className={isEdit ? styles.none : styles.item_state}>
        <Button type="primary" onClick={del}>
          Delete
        </Button>
        <Button type="primary" onClick={toggle}>
          {isEdit ? 'Editing' : 'Edit'}
        </Button>
      </div>

      {isEdit ? (
        <div className={styles.edit_input}>
          <Input type="text" value={editText} onChange={handleChange} />
          <Button type="primary" onClick={submit}>
            Submit
          </Button>
          <Button type="primary" onClick={toggle}>
            {isEdit ? 'Editing' : 'Edit'}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
};

export default Todo;
