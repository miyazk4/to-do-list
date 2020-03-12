import React, { useState } from "react";
import styles from "./List.module.scss";
import { CreateToDo } from "./CreateToDo";
import uid from "uid";
import cn from "classnames";

interface ListState {}

const initialTodos: TodoItem[] = [
  { id: uid(), task: "Get ready to go to work" },
  { id: uid(), task: "Go to work reunion" }
];

const mapped = initialTodos.reduce((acc, todo) => {
  return { ...acc, [todo.id]: todo };
}, {});

console.log(mapped);


export function List() {
  // Componente para depois retornar na minha lista

  //Nome do state, o que vamos usar p definir state. Use state preenchido pq vai ter tarefas existentes
  const [todos, setTodos] = useState(initialTodos);

  //Função que recebe um novo todo
  const handleCreate = (todo: TodoItem) => {
    // Chamar set todos com uma nova lista concat p criar array com novo elemento
    setTodos(todos.concat(todo));
  };

  // criar funçao toggle to do, usar map
  const toggleTodo = (id: string) => {
    setTodos(
      // O map vai fazer uma iteraçao por cada todo q temos e depois se o todo que no momento
      // ta a ser iterado tiver o id igual ao q ta a usar ele cria um novo todo com base no antigo '...'
      // e o completed está a fazer um toggle
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    // se der truth ele fica se for falso ele remove
    // o q ta a ser iterado tem q ser diferente
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Map abaixo - por cada todo q tenho queremos transformar num todo component
  return (
    <div className={styles.ListContainer}>
      <h1>To do List</h1>
      <div className="ToDo">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo} // {() => toggleTodo(todo.id)}
            deleteTodo={deleteTodo}
          /> //index substituido por todo.id
        ))}
        <CreateToDo onCreate={handleCreate} />
      </div>
    </div>
  );
}

export interface TodoItem {
  id: string;
  task: string;
  completed?: boolean;
}

interface TodoProps {
  todo: TodoItem;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const Todo = ({ todo, toggleTodo, deleteTodo }: TodoProps) => (
  <p className={styles.TodoItems}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
    />
    {todo.task}
    <button
      className={cn(styles.completed, {
        [styles.completed]: todo.completed
      })}
      onClick={() => toggleTodo(todo.id)}
    >
      {!todo.completed ? "Completed" : "Undo"}
    </button>
    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  </p>
);
