import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import Header from "../Header/Header";
import AddToDo from "../AddToDo/AddToDo";
// import TableHead from "../TableHead/TableHead";
// import DeleteTask from "../deleteTask/deleteTask";
// import ToDoItem from "../ToDoItem/ToDoItem";
import List from "../List/List";

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
  
  // function toggleIsComplete( id, status ){
  //   const taskToComplete = {
  //       id: id,
  //       isComplete: !status,
  //   }
  //   console.log(taskToComplete)
  //   axios({
  //     method: "PUT",
  //     url: '/api/todos',
  //     data: taskToComplete
  //   })
  //   .then((response)=>{
  //     // console.log("PUT in app.jsx", response.data);
  //     fetchList();
  //   })
  //   .catch((error)=>{
  //     console.log("error PUT app.jsx", error)
  //   });
  // };
  return (
    <div>
     
      <Header firstName="Gregg" lastName="Trunnell"/>
      <AddToDo addToDo={addToDo} setNewToDo={setNewToDo}/>
      <List toDo={toDos.id} fetchList={fetchList}/>
      {/* <table>
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
      </table>   */}
    </div>
  );
}

export default App;

