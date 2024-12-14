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
  

  return (
    <div>
      <Header firstName="Gregg" lastName="Trunnell"/>
      <AddToDo addToDo={addToDo} setNewToDo={setNewToDo}/>
      <List toDos={ toDos } fetchList={fetchList}/>
    </div>
  );
}

export default App;

