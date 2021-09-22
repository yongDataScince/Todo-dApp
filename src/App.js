import { useEffect, useState } from "react";
import Web3 from 'web3';
import Todos from "./abis/Todos.json"
import AlertWindow from "./components/AlertWindow";
import Headers from "./components/Header";
import Todo from "./components/Todo";

function App() {

  const [done, toggle] = useState(false)
  const [show, setShow] = useState(false)
  const [taskContent, setContent] = useState("")
  const [account, setAccount] = useState("0x0")
  const [contract, setContract] = useState({})
  const [taskCount, setCount] = useState(0)
  const [appName, setName] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  const loadBlockchainData = async () => {
    setLoading(true)
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = Todos.networks[networkId]

    if(networkData) {
      const cntr = new web3.eth.Contract(Todos.abi, networkData.address)
      setContract(cntr)
      
      const name = await cntr.methods.name().call()
      setName(name)

      const count = await cntr.methods.todosCount().call()
      setCount(count)
    }
    setLoading(false)
  }

  const toggleTask = async (id) => {
    
  }

  const toggleWindow = (payload) => {
    
  }

  const createTask = async () => {
  
  }

  const editTodo = async (id, content) => {
  }

  const toggleTodo = async (id) => {
  }

  const inpHandler = e => {
  }

  const revoveTodo = async (id) => {
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  return(
    <div className="App">
      <Headers name={appName} 
               toggleWindow={toggleWindow}/>
      <AlertWindow show={show} taskContent={taskContent} 
                   createTask={createTask} 
                   inpHandler={inpHandler} 
                   toggleWindow={toggleWindow}/>

      <div className="container">
        <h2 className="greeting">Welcome, { account }</h2>
        <h3>Tasks: { taskCount }</h3>
        <div className="todos">
          {
            loading 
            ?
            "Loading..."
            :
            taskCount == 0 
            ?
            <h3>No tasks</h3>
            :
            tasks.map(todo => (
              <Todo editTodo={editTodo} 
                    todo={todo} 
                    toggleTodo={toggleTodo} 
                    revoveTodo={revoveTodo}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
