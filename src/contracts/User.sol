pragma solidity >=0.4.22 <0.8.0;

import "./Todos.sol";


contract User {
  uint public userCount = 0;
  mapping(address => User) public users;
  mapping(string => address) public usernames;

  struct User {
    address addr;
    string status;
    string username;
    Todos.Todo[] tasks;
  }
}