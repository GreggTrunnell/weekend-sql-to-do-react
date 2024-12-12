import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import NamePractice from "../NamePractice/NamePractice";
import AddToDo from "../AddToDo/AddToDo";
import TableHead from "../TableHead/TableHead";

function App() {
  const [newToDo, setNewToDo ]= useState('');
  const [ toDos, setToDos ] = useState([]);

  
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
  
  function toggleIsComplete( id, status ){
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
    })
  }
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
              <td>{ toDo.text }</td>
              {/* Can't get the classes to work properly. Might have to do with CDN
              <td className={toDo.isComplete ? "complete-true" : "complete-false"}> */}
              <td>
                <button onClick={() => toggleIsComplete(toDo.id, toDo.isComplete)}>{toDo.isComplete ? "Completed" : "Not Completed"}</button>
              </td> 
              
              {/* if written like: onClick={deleteTask(toDo.id)} without arrow function the 
              deleteTask would be invoked on render.
              In this case the arrow function is calling deleteTask with toDo.id as its argument*/}
              <td><button onClick={() => deleteTask(toDo.id)}>Delete</button></td> 
            </tr>
          ))}
          </tbody>
          </table>  
    </div>
  );
}

export default App;

