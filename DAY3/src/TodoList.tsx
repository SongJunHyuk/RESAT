import { useState } from 'react'
import { TodoType } from './todo.types';
import { FilterType } from './todo.types';
import './TodoList.css';

function TodoList() {

  const [input, setInput] = useState("");
  const [todolist, setTodolist] = useState<TodoType[]>([]);
  const [priority, setPriority] = useState("낮음");
  const [filter, setFilter] = useState<FilterType>("전체");

  const handleInputChange = (e : any) => {
    setInput(e.target.value);
  };

  const handlePriorityChange = (e : any) => {
    setPriority(e.target.value);
  };

  const handleTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const Todo : TodoType = {
      id: todolist.length + 1,
      input: input,
      priority: priority,
      isFinished: false,
    };
    setTodolist([...todolist, Todo]);
    setInput("");
  };

  const finishedTodos = todolist.filter((todo) => {
    if (filter === "전체") {
      return true;
    } else if (filter === "완료") {
      return todo.isFinished;
    } else {
      return !todo.isFinished;
    }
  });

  const handleDeleteTodo = (id : number) => {
    setTodolist(todolist.filter((todolist) => todolist.id !== id));
  };

  const checkFinished = (id : number) => {
    setTodolist(
      todolist.map((todo : TodoType) =>
        todo.id === id ? { ...todo, isfinished: !todo.isFinished } : todo
      )
    );
  };

  const handleFilterChange = (filter : FilterType) => {
    setFilter(filter);
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>To-Do List</h1>
        <div className="filter">
          <div
            className="filter-item"
            onClick={() => handleFilterChange("전체")}
          >
            전체
          </div>
          <div
            className="filter-item"
            onClick={() => handleFilterChange("완료")}
          >
            완료
          </div>
          <div
            className="filter-item"
            onClick={() => handleFilterChange("미완료")}
          >
            미완료
          </div>
        </div>
        <div className="body">
          <input
            placeholder="할 일을 작성해주세요."
            value={input}
            onChange={handleInputChange}
          />
          <span>{priority}</span>
          <button onClick={handlePriorityChange}>낮음</button>
          <button onClick={handlePriorityChange}>보통</button>
          <button onClick={handlePriorityChange}>높음</button>
          <button onClick={handlePriorityChange}>아주 높음</button>
          <button onClick={handleTodo}>추가</button>
        </div>
        <div className="content">
          {finishedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.isFinished ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.isFinished}
                onChange={() => checkFinished(todo.id)}
              />
              <span>{todo.input}</span>
              <span className="priority">[{todo.priority}]</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
