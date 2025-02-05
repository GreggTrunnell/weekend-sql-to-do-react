import React from "react";
import Axios from "axios";
// will need two props. one to target the item to be deleted and one to delete
function DeleteTask({ id, fetchList }) {
    function handleDelete(){
        const toDoToDelete = { id: id };
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
         <td className="DeleteTask"><button className="deleteColor" onClick={handleDelete}>Delete</button></td>  
    );
}

export default DeleteTask;
