import React, { useEffect, useState } from "react";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [updatedValue, setUpdatedValue] = useState("");

  const AddTodo = () => {
    const copyTodo = structuredClone(todoList);
    const todo = {
      text: inputValue,
      complete: false,
      isEdit: false,
      id: new Date().getTime(),
    };
    setTodoList([...copyTodo, todo]);
    setInputValue("");
  };

  const handleComplete = (id) => {
    const list = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });

    setTodoList(list);
  };

  const handleDelete = (id) => {
    const filterList = todoList.filter((todo) => todo.id !== id);
    setTodoList(filterList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      AddTodo();
    }
  };

  const handleEdit = (id, text) => {
    setUpdatedValue(text);
    const copyTodo = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEdit: !todo.isEdit };
      } else return todo;
    });

    setTodoList(copyTodo);
  };

  const handleSave = (e, id) => {
    if (e.key === "Enter") {
      const todoArr = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: updatedValue, isEdit: false };
        } else return todo;
      });

      setTodoList(todoArr);
      setUpdatedValue("");
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <div style={{ display: "flex", gap: "2rem", margin: "20px" }}>
        <input
          type="text"
          style={{ width: "30vw" }}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
        <button style={{}} onClick={() => AddTodo()}>
          Add Todo
        </button>
      </div>
      <div style={{ gap: "2rem", margin: "20px" }}>
        {todoList.map((todo) => {
          return (
            <div key={todo.id}>
              {todo.isEdit ? (
                <input
                  type="text"
                  value={updatedValue || todo.text}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                  onKeyDown={(e) => handleSave(e, todo.id)}
                  autoFocus
                />
              ) : (
                <span
                  style={
                    todo.complete ? { textDecoration: "line-through" } : {}
                  }
                >
                  {todo.text}
                </span>
              )}

              <button
                onClick={() => handleComplete(todo.id)}
                style={{ margin: "0.5rem" }}
              >
                ✔️
              </button>
              <button
                onClick={() => handleEdit(todo.id, todo.text)}
                style={{ margin: "0.5rem" }}
              >
                🖋️
              </button>
              <button onClick={() => handleDelete(todo.id)}>❌</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
