import { useState } from "react";

function AddToDo( {addToDo, setNewToDo} ) {
  
    function setToDo(e){
      setNewToDo(e.target.value)
      }
    
    function handleSubmit(e){
      e.preventDefault();
      addToDo();
    }  

  return (
    <div>   
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a To Do" onChange={setToDo} />
        <br />
        <button onClick={ addToDo }>Submit</button>
      </form>
    </div>
  );
}

export default AddToDo;

