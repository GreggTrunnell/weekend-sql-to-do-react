
import { useState } from 'react'
import axios from 'axios';

{function deleteTask( {id} ){
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
  return (
    <div className="deleteTask">
       <h1>deleteTask</h1>
       <td><button onClick={() => deleteTask(toDos.id)}>Delete</button></td> 
    </div>
);}

export default deleteTask;
