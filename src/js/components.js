// Imports
import { Todo } from '../classes';
import { todoList } from '../index';


// Referencias en el HTML5
const divTodoList = document.querySelector('.todo-list');
const txtinput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const contadorHtml = document.querySelector('.todo-count');

export const crearTodoHtml = (todo) => {

    incrementarContador();

    const htmlTodo = `<li class="${(todo.completado)? 'completed': ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado)? 'checked': ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;


    const div = document.createElement('div');

    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstChild);
    return div.firstChild;
};

const incrementarContador = () => {
    let contador = 0;
    todoList.todos.forEach(todo => (todo.completado) ? contador++ : 0);
    contadorHtml.innerHTML = `<strong>${contador}</strong> pendiente(s)`;
}

// Eventos
txtinput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtinput.value.length > 0) {
        const nuevoTodo = new Todo(txtinput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtinput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        incrementarContador();
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) { return };

    // Eliminamos la clase de "select" de todas las opciones y se la agregamos al seleccionado.
    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    // Realizamos el filtro de los elementos
    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                };
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                };
                break;

        }

    }

});