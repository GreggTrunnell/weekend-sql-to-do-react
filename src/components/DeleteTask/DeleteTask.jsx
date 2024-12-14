import React from "react";
import Axios from "axios";
// will need two props. one to target the item to be deleted and one to delete
function DeleteTask({ taskId, fetchList }) {
    function handleDelete(){
        const toDoToDelete = { taskId: taskId };
    Axios({
        method: "DELETE",
        url: "/api/todos",
        data: toDoToDelete,
    })
    .then((response)=>{
        console.log("task deleted", response.data)
        fetchList();
    })
    .catch((error)=>{
        console.log('error in delete comp',error)
    })
    }
    
    return (
         <td className="DeleteTask"><button onClick={handleDelete}>Delete</button></td>  
    );
}

export default DeleteTask;
