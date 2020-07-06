import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Button, Input } from 'antd';

import styles from './styles/Todo.less';
import useCheckOverFlow from './hooks/useCheckOverFlow';

const Todo = ({ todo, editTodo, deleteTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { overflow, checkOverflowRef } = useCheckOverFlow(isEdit);

  return (
    <div className={styles.item}>
      <div className={styles.item_content} ref={checkOverflowRef}>
        {overflow ? (
          <Tooltip title={todo.text} mouseEnterDelay={0.5}>
            <span>{todo.text}</span>
          </Tooltip>
        ) : (
          <span>{todo.text}</span>
        )}
      </div>

      <div className={isEdit ? styles.none : styles.item_state}>
        <Button
          type="primary"
          onClick={() => {
            deleteTodo(todo.id);
          }}>
          Delete
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsEdit(!isEdit);
          }}>
          {isEdit ? 'Editing' : 'Edit'}
        </Button>
      </div>

      {isEdit ? (
        <div className={styles.edit_input}>
          <Input
            type="text"
            value={editText}
            onChange={e => {
              setEditText(e.target.value);
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              editTodo(todo.id, { id: todo.id, text: editText });
              setIsEdit(!isEdit);
            }}>
            Submit
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setIsEdit(!isEdit);
            }}>
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

export default React.memo(Todo);
