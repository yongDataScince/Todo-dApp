const Todo = ({ editTodo, todo, toggleTodo, revoveTodo }) => {
  return (
    <div className="todo" key={todo.id} style={{ display: todo.id==0?"none":"flex" }}>
      <div className="todo__content"
           onClick={() => editTodo(todo.id, "edit")}
           style={{ textDecoration: todo.completed?"line-through":"none" }}>
                    { todo.content }
           <div className="todo__author">
             Author: { todo.author }
           </div> 
      </div>

      <input type="checkbox" 
             className="todo__check"
             onChange={ async () => await toggleTodo(todo.id)}
             checked={ todo.completed }
      />

      <button onClick={async () => await revoveTodo(todo.id)}>
        remove
      </button>
    </div>
  )
}

export default Todo;
