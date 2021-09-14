const AlertWindow = ({ show, taskContent, createTask, inpHandler, toggleWindow }) => {
  const keyPressHandle = async (event) => {
    if(event.key === "Enter" && taskContent !== "") {
      await createTask()
    }
  }
  return (
    <div className={show ? "wind show" : "wind"} onKeyPress={keyPressHandle}>
      <div className="wind__title">
        Create task
        <button className="wind__close" onClick={() => toggleWindow(false)}>x</button>
      </div>
      <div className="inp_group">
        <input className="wind__inp"
               onChange={e => inpHandler(e)}
               value={taskContent}/> 
        <button className="wind__btn"
                disabled={taskContent === ""}
                onClick={async () => await createTask()}>Create</button>
      </div>
    </div>
  )
}

export default AlertWindow;