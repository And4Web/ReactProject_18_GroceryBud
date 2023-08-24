import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

function List({items, removeItem}) { 

  return (
    <div className='list-container'>
      {items.map(item=>{
        const {id, title} = item;
        return (
          <article key={id} className='grocery-item'>
            <p className='grocery-title'>{title}</p>
            <div className="btn-container">
              <button className="edit-btn" type='button'>
                <FaEdit/>
              </button>
              <button className="delete-btn" type='button' onClick={()=>removeItem(id)}>
                <FaTrash/>
              </button>
            </div>
          </article>
        )
      })}
      
    </div>
  )
}


export default List
