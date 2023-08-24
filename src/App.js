import List from "./List";
import Alert from "./Alert";
import { useState } from "react";


function App(){
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted.");
    if(!name){
      showAlert(true, "danger", "Please enter a value.")
    }else if(name && isEditing){
      // alert and edit
    }else{
      showAlert(true, "success", "New item added to the list.")
      const randomId = Math.floor(new Date().getTime() * Math.random());
      const newItem = {id: randomId.toString(), title: name};
      setList([...list, newItem]);
      setName("")
    }    
  }
  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg})
  }
  const clearList = () => {
    showAlert(true, "danger", "Your list is empty now.");
    setList([]);
  }
  const removeItem = (id, title) => {
    showAlert(true, "danger", `${title} removed.`);
    setList(list.filter(item => item.id !== id));
  }

  return (
    <section className="section-container">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <h3 className="title">Grocery List</h3>
      <div className="form-control">
        <input type="text" placeholder="e.g. Pencil Box" value={name} onChange={(e)=>setName(e.target.value)}/>
        <button className="submit-btn" type="submit">{isEditing? "Edit": "Submit"}</button>
      </div>

      </form>
      {list.length > 0 && (
      <div className="grocery-container">
        <List items={list} removeItem={removeItem}/>
        <button className="clear-btn" onClick={clearList}>Clear items</button>
      </div>

      )}
    </section>
  )
}

export default App;
