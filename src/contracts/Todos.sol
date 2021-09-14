pragma solidity >=0.4.22 <0.8.0;

contract Todos {
  string public name = "Todo App";
  uint public todosCount = 0;
  mapping(uint => Todo) public tasks;

  struct Todo {
    uint id;
    string content;
    bool completed;
    address author;
  }

  event TodoCreated (
    uint id,
    string content,
    bool completed,
    address author
  );

  event TodoComplete(
    uint id,
    bool completed
  );

  event TodoEdited (
    uint id,
    string content,
    bool completed
  );

  event TodoRemove();

  function createTodo(string memory _content) public {
    require(bytes(_content).length > 0 && bytes(_content).length < 40, "content is require but less 40 symbols");
    todosCount ++;
    tasks[todosCount] = Todo(todosCount, _content, false, msg.sender);
    emit TodoCreated(todosCount, _content, false, msg.sender);
  }

  function toggle(uint _id) public {
    require(todosCount > 0, "id must be require"); 
    tasks[_id].completed = !tasks[_id].completed;
    emit TodoComplete(_id, tasks[_id].completed);
  }

  function editTask(uint _id, string memory _content) public {
    require(todosCount > 0, "id must be require");
    tasks[_id].content = _content;
    tasks[_id].completed = false;
    emit TodoEdited(_id, _content, tasks[_id].completed);
  }

  function deleteTodo(uint _id) public {
    delete tasks[_id];
    todosCount --;

    emit TodoRemove();
  }

}
