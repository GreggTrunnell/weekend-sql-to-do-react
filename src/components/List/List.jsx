
import axios from "axios";
import DeleteTask from '../deleteTask/deleteTask';
import TableHead from '../TableHead/TableHead';



function List( { toDos, fetchList } ) {
    function toggleIsComplete( id, status ){
        const taskToComplete = {
            id: id,
            isComplete: !status,
        }
        axios({
          method: "PUT",
          url: '/api/todos',
          data: taskToComplete
        })
        .then((response)=>{
          fetchList();
        })
        .catch((error)=>{
          console.log("error PUT app.jsx", error)
        });
      };
    return (

    <div className="List">
     <table>
      <TableHead/>
        <tbody>
          {toDos.map(( toDo )=>(
            <tr key={toDo.id}> 
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
      </table>  
    </div>
    );
}

export default List;
