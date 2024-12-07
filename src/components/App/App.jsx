import { useState } from "react";
import axios from 'axios';

function App() {
  const [newToDo, setNewToDo ]= useState('');
  const [ toDos, setToDos ] = useState( [])

  function addToDo(event ) {
 event.preventDefault();
    console.log("submit worked");
    // the ... is react's .push
    setToDos([...toDos, newToDo])
    axios ({ 
      method: 'POST',
      url: '/api/todo',
    }).then((response)=>{
      console.lod('POST response data', response.data);
    }).catch((response)=>{
      console.log('error in POST',error);
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
              <td>{ toDos }</td>
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

