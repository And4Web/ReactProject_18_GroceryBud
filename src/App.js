import List from "./List";
import Alert from "./Alert";
import { useEffect, useState } from "react";

const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if(list){
    return JSON.parse(list);
  }else{
    return [];
  }
}

function App(){
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted.");
    if(!name){
      showAlert(true, "danger", "Please enter a value.")
    }else if(name && isEditing){
      showAlert(true, "success", "Item edited.");

      // setName(list.map(item=>{
      //   if(item.id === editId){
      //     item.title = name;
      //     return item.title;
      //   }
      // }))

      // alternate way: update list not just name, as we will store list in localstorage for persistance. if we edit name only not the entire list which is store in localstorage then on refresh we will get old list not the updated.
      
      setList(list.map(item=>{
        if(item.id === editId){
          return {...item, title: name}
        }
        return item
      }))

      setName("");
      setEditId(null);
      setIsEditing(false);
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
  const editItem = (id) => {
    setEditId(id);
    setIsEditing(true);

    const item = list.find(item=>item.id === id);
    
    setName(item.title);
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
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className="clear-btn" onClick={clearList}>Clear items</button>
      </div>

      )}
    </section>
  )
}

export default App;
