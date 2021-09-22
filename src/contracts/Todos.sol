pragma solidity >=0.4.22 <0.8.0;

contract Todos {
  string public name = "Todo App";
  uint public todoCount = 0;
  
  mapping(uint => Todo) public todos;

  struct Todo {
    string id;
    string title;
    string description;
    address author;
    bool done;
  }
}
