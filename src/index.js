import './styles.css';
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/components';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

// todoList.todos.forEach(todo => crearTodoHtml(todo));

// const tarea = new Todo('Aprender JavaScript');
// todoList.nuevoTodo(tarea);
// console.log(todoList);

// localStorage.setItem('mi-key', 'ABC1234');
// sessionStorage.setItem('mi-key', 'ABC1234');

// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// }, 3000);

// crearTodoHtml(tarea);