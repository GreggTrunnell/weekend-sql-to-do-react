
function Header(props) {
    return (
        <div className="Header">
            <h1>TO DO APP</h1>
           <h1>{props.firstName} {props.lastName}'s To Do App</h1>
        </div>
    );
} 

export default Header;
