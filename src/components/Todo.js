import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/Todo.less';
import { Tooltip, Button, Input } from 'antd';
import useSubmitEdit from './hooks/useSubmitEdit';
import useCheckOverFlow from './hooks/useCheckOverFlow';

const Todo = ({ todo, editTodo, deleteTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [overflow, setOverflow] = useState();

  const checkOverflowRef = useRef(null);

  const checkOverflow = useCheckOverFlow(checkOverflowRef, setOverflow);
  const submit = useSubmitEdit(
    { todoID: todo.id, editText: editText, isEdit: isEdit },
    { editTodo: editTodo, setIsEdit: setIsEdit }
  );

  useEffect(checkOverflow);

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
          <Button type="primary" onClick={submit}>
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
