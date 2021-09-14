const Todos = artifacts.require("Todos");

contract('Todos', ([deployer, author, tipper]) => {
  let contract, todosCount;

  describe('deployment', async () => {
    
    before(async () => {
      contract = await Todos.deployed()
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, "Todo App")
    })

    it('create todo', async () => {
      const result = await contract.createTodo("test")
      todosCount = await contract.todosCount()
      const data = result.logs[0].args
      assert.equal(todosCount.toNumber(), 1)
      assert.equal(data.id.toNumber(), todosCount, "id is not correct")
      assert.equal(data.content, 'test', "content is not correct")
      assert.equal(data.completed, false, "completed flag is not correct")
      assert.equal(data.author, deployer, "author not correct")
    })

    it('complete todo', async () => {
      await contract.createTodo("test")
      todosCount = await contract.todosCount()

      let result = await contract.toggle(todosCount.toNumber())
      let data = result.logs[0].args

      assert.equal(data.completed, true, "must be completed")

      result = await contract.toggle(todosCount.toNumber())
      data = result.logs[0].args
      
      assert.equal(data.completed, false, "must be not completed")
    })

    it('edit todo', async () => {
      let result = await contract.editTask(todosCount.toNumber(), "test edit")
      let data = result.logs[0].args

      assert.equal(data.content, "test edit", "task not edited")
      assert.equal(data.completed, false, "completed not change")
    })

    it('delete todo', async () => {
      await contract.deleteTodo(todosCount.toNumber())
      let task = await contract.tasks(todosCount)
      assert.equal(task.content, "")
      assert.equal(task.id.toNumber(), 0)
    })
  })
})