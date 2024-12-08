import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [newToDo, setNewToDo ]= useState('');
  const [ toDos, setToDos ] = useState([]);
  let [ isCompleted, setIsCompleted] = useState( false )
  
  useEffect(()=> {
    fetchList();
  },[]);

  function addToDo(event) {
 event.preventDefault();
    console.log("submit worked");
    // the ... is react's .push
    setToDos([...toDos, newToDo])
    axios ({ 
      method: 'POST',
      url: '/api/todos',
      data: {
            text: newToDo,
            isComplete: false,
      }
    }).then((response)=>{
      console.log('POST response data', response.data);
      fetchList();
    }).catch((error)=>{
      console.log('error in POST',error);
    })
  }

  const fetchList= () => {
    console.log('fetching images')
    axios({
      method: "GET",
      url: "/api/todos",
    })
    .then((response)=>{
      console.log("response from GET", response.data);
      setToDos(response.data)
    })
    .catch((error)=>{
      console.log("error on GET", error);
    });
  };

  function deleteTask( id ){
    const taskToDelete={ id: id };
    axios({
      method: "DELETE",
      url: "/api/todos",
      data: taskToDelete,
    }).then((response)=>{
      // console.log('task deleted', response.data);
      fetchList();
    }).catch((error)=>{
      console.log("error in DELETE", error)
    });
  }
  
  const changeStatus = ()=>{
    // console.log("changing status boss",);
    setIsCompleted(!isCompleted);
    toggleIsComplete();
  }
  function toggleIsComplete( id, status ){
    // console.log("toggle was pushed");
    const taskToComplete = {
        id: id,
        isComplete: status,
    }
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
    })
  }
  return (
    <div>
      <h1>TO DO APP</h1>
      <form>
        <input type="text" placeholder="Add a To Do" onChange={(e)=>{setNewToDo(e.target.value)}} />
        <br />
        <button onClick={ addToDo }>Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>To Do's List</th>
            <th>To Do Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map(( toDos, index)=>(
            <tr key={index}> 
              <td>{ toDos.text }</td>
              <td><button onClick={changeStatus}>{isCompleted ? "Completed" : "Not Completed"}</button></td>
              {/* <td><button onClick={()=> toggleIsComplete(toDos.isComplete)}>Finished</button></td> */}
              {/* if written like: onClick={deleteTask(toDos.id)} without arrow function the 
              deleteTask would be invoked on render.
              In this case the arrow function is calling deleteTask with toDos.id as its argument*/}
              <td><button onClick={() => deleteTask(toDos.id)}>Delete</button></td> 
            </tr>
          ))}
          </tbody>
          </table>  
    </div>
  );
}

export default App;

