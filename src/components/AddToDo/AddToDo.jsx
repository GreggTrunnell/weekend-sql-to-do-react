import { useState } from "react";

function App() {
  const [newToDo, setNewToDo ]= useState('');
  const [ toDos, setToDos ] = useState( [])

  function addToDo(event ) {
 event.preventDefault();
    console.log("submit worked");
    // the ... is react's .push
    setToDos([...toDos, newToDo])
    console.log(toDos)
  }

  return (
    <div>
      <h1>TO DO APP</h1>
      <form>
        <input type="text" placeholder="Add a To Do" onChange={(e)=>{setNewToDo(e.target.value)}} />
        <br />
        <button onClick={ addToDo }>Submit</button>
      </form>
    
      
    </div>
  );
}

export default App;

