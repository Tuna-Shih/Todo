export function checkOverflow(myRef, setOverflow) {
  const isOverflow = getComputedStyle(myRef.current).width;

  if (isOverflow == '250px') return setOverflow(true);

  return setOverflow(false);
}

export function del(todoId, deleteTodo) {
  deleteTodo(todoId);
}

export function toggle(isEdit, setIsEdit) {
  setIsEdit(!isEdit);
}

export function handleChange(e, setEditText) {
  setEditText(e.target.value);
}

export function submit(
  todoID,
  editText,
  editTodo,
  isEdit,
  setIsEdit,
  myRef,
  setOverflow,
  checkOverflow
) {
  const edit = { id: todoID, text: editText };
  editTodo(todoID, edit);
  setIsEdit(!isEdit);
  checkOverflow(myRef, setOverflow);
}
