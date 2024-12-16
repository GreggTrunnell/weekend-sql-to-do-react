
const toggleIsComplete=( id, status )=>{
    const taskToComplete = {
        id: id,
        isComplete: !status,
    }
    console.log(taskToComplete)
    axios({
      method: "PUT",
      url: '/api/todos',
      data: taskToComplete
    })
    .then((response)=>{
      // console.log("PUT in app.jsx", response.data);
      fetchList();
    })
    .catch((error)=>{
      console.log("error PUT app.jsx", error)
    });
  
  return (
    <div>
      <h1>TO DO APP</h1>
      <NamePractice firstName="Gregg" lastName="Trunnell"/>
      <AddToDo addToDo={addToDo} setNewToDo={setNewToDo}/>
      <table>
        <TableHead/>
        <tbody>
          {toDos.map(( toDo, index)=>(
            <tr key={index}> 
              <td>
                { toDo.text }
              </td>
              <td>
                <button className={toDo.isComplete ? "complete-true" : "complete-false"}
                onClick={() => toggleIsComplete(toDo.id, toDo.isComplete)}>
                {toDo.isComplete ? "Completed" : "Not Completed"}</button>
              </td> 
              <DeleteTask id={ toDo.id } fetchList={ fetchList }/>
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
  );
}

export default ToDoItem;
