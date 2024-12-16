
function AddToDo( {addToDo, setNewToDo} ) {
  function setToDo(e){
      setNewToDo(e.target.value)
    }
  function handleSubmit(e){
      e.preventDefault();
      addToDo();
    }  

  return (
    <div className="AddToDo">   
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a To Do" onChange={setToDo} />
        <br />
        <button onClick={ addToDo }>Add To Do</button>
      </form>
    </div>
  );
}

export default AddToDo;

