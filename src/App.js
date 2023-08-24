import List from "./List";
import Alert from "./Alert";
import { useState } from "react";


function App(){
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: true, msg: "", type: ""});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted.");
    if(!name){
      // alert
    }else if(name && isEditing){
      // alert and edit
    }else{
      // show alert
      const randomId = Math.floor(new Date().getTime() * Math.random());
      const newItem = {id: randomId.toString(), title: name};
      setList([...list, newItem]);
      setName("")
    }    
  }

  return (
    <section className="section-container">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert/>}
      <h3 className="title">Grocery Bud</h3>
      <div className="form-control">
        <input type="text" placeholder="e.g. Pencil Box" value={name} onChange={(e)=>setName(e.target.value)}/>
        <button className="submit-btn" type="submit">{isEditing? "Edit": "Submit"}</button>
      </div>

      </form>
      <div className="grocery-container">
        <List items={list}/>
        <button className="clear-btn">Clear items</button>
      </div>
    </section>
  )
}

export default App;
