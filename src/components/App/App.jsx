import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [newToDo, setNewToDo ]= useState('');
  const [ toDos, setToDos ] = useState( []);

  useEffect(()=> {
    fetchList();
  },[]);

  function addToDo(event ) {
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
      data: {
        text: newToDo,
        isComplete: false,
      }
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
              <td><button>Finished</button></td>
              <td><button>Delete</button></td> 
              </tr>
          ))}
          </tbody>
          </table>  
    </div>
  );
}

export default App;

