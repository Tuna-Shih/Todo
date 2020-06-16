import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles/App.less';
import TodoItem from './TodoItem';
import Todo from './Todo';
import cookies from 'js-cookie';

import { List } from 'antd';

class App extends React.Component {
  state = {
    todos: [],
    todoText: ''
  };

  componentDidMount() {
    this.autoLoad();

    document.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.loadMore();
      }
    });
  }

  addTodo = () => {
    const { todos, todoText } = this.state;
    if (todoText.replace(/\s*/g, '') !== '') {
      const todo = { id: uuidv4(), text: todoText };
      const newTodos = [todo, ...todos];

      this.setState({
        todos: newTodos,
        todoText: ''
      });
      cookies.set('todoapp', JSON.stringify(newTodos));
    }
  };

  deleteAllTodo = () => {
    const { todos } = this.state;
    const newTodos = [];
    this.setState({
      todos: newTodos
    });
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  deleteTodo = id => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);

    this.setState({
      todos: newTodos
    });
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  editTodo = (id, edit) => {
    const { todos } = this.state;
    const newTodos = todos.map(todo =>
      todo.id === id && edit.text.replace(/\s*/g, '') !== '' ? edit : todo
    );

    this.setState({
      todos: newTodos
    });
    cookies.set('todoapp', JSON.stringify(newTodos));
  };

  handleChange = e => {
    this.setState({
      todoText: e.target.value
    });
  };

  loadData = (first, after) => {
    const getData = cookies.get('todoapp');

    if (!getData) return [];

    const todoData = JSON.parse(getData);

    const startIndex = !after
      ? -1
      : todoData.findIndex(todo => todo.id === after);

    return todoData.slice(startIndex + 1, startIndex + first);
  };

  loadMore = callback => {
    const { endCursor, todos } = this.state;
    const gotData = this.loadData(10, endCursor);

    if (gotData.length === 0) return;
    const lastID = gotData.length - 1;
    const newTodo = [...todos, ...gotData];
    this.setState({ endCursor: gotData[lastID].id, todos: newTodo }, () => {
      if (!callback) return;
      callback();
    });
  };

  autoLoad = () => {
    if (window.innerHeight < document.body.scrollHeight) return;
    this.loadMore(this.autoLoad);
  };

  render() {
    const { todos, todoText } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.add}>
          <TodoItem
            todoText={todoText}
            addTodo={this.addTodo}
            handleChange={this.handleChange}
            deleteAllTodo={this.deleteAllTodo}
          />
        </div>
        <div>
          <List
            size="small"
            header={
              <div style={{ textAlign: 'center' }}>{todos.length} Todo!</div>
            }
            footer={<div style={{ textAlign: 'center' }}>Footer</div>}
            bordered
            dataSource={todos}
            renderItem={todo => (
              <List.Item>
                <Todo
                  key={todo.id}
                  todo={todo}
                  deleteTodo={this.deleteTodo}
                  editTodo={this.editTodo}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
export default App;
