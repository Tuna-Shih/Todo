import stringWidth from 'string-width';

export default (todoText, addTodo) => {
  if (
    todoText.length >= 200 ||
    todoText.split('').some(e => stringWidth(e) == 2)
  )
    return alert('Illegal input');

  addTodo();
};
