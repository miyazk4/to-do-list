import React, { useState } from "react";

import { TodoItem } from "./List";
import uid from "uid";

interface CreateToDoProps {
  onCreate: (todo: TodoItem) => void;
}

// create to do é o componente q é o texto
export function CreateToDo({ onCreate }: CreateToDoProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    // Para nao deixar mandar com um enter
    e.preventDefault();
    onCreate({id:uid(), task: value });
    setValue("");// para limpar after enter
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
          ></input>
        </label>
      </div>
    </form>
  );
}
