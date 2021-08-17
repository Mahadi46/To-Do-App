import React,{useState,useEffect,useCallback}from 'react'
import todo from "../images/todo.svg"
import "../App.css"

//localstorage
const getLocalItems=()=>{
  const list=localStorage.getItem('lists')

  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }
  else{
    return []
  }

}


function Todo() {
  
  const[inputData,setInputData]=useState('')
  const[items,setItems]=useState(getLocalItems)
  const[toggleSubmit,setToggleSubmit]=useState(true)
  const[isEditItem,setIsEditItem]= useState(null)
  const[searchTerm,setSearchTerm]=useState(items)

  //Add Item

  const addItem=()=>{

    if(!inputData){
      alert("plz write something")
    }
    else if(inputData && !toggleSubmit){

       setItems(
         items.map((element)=>{
           if(element.id===isEditItem){
             return{...element,name:inputData}
           }
           return element;
         })
       )
       setToggleSubmit(true)
       setInputData('')
       setIsEditItem(null)
    }

    else{
    
      const allInputData={id: new Date().getTime().toString(), name:inputData}
      setItems([...items,allInputData])
      setInputData("")

    }
    
  }

  //Delete Item

  const deleteItem=(index)=>{
    const updateItems= items.filter((element)=>{
      return index!=element.id;
    })
    setItems(updateItems)
  }

  //Delete All

  const removeAll=()=>{
    setItems([])
  }

  //Edit Item

  const editItem=(id)=>{

     const newEditItem = items.find((element)=>{
          return element.id === id;
     })
     console.log(newEditItem)
     setToggleSubmit(false)
     setInputData(newEditItem.name)
     setIsEditItem(id)
  }


  useEffect(() => {
  
    localStorage.setItem('lists',JSON.stringify(items))
     
  }, [items])

  //Searchbar

  const handleChange = (value)=>{
     
        const newPosts = items.filter(function(post){
        return (post.name.toLowerCase().indexOf(value.toLowerCase())) >-1 });
        
       setSearchTerm(newPosts)
   
  }

  const debounce = (func)=>{
    let timer;
    return function(...args){
      const context = this;
      if(timer)clearTimeout(timer);
      timer = setTimeout(()=>{
        timer=null;
        func.apply(context,args);
      },500);
    }
  }

  const optimizedFn = useCallback(debounce(handleChange),[]);


    return (

      <React.Fragment>
      <div className="Search-items">
             <input type="text" placeholder="search item.." onChange={(e)=>optimizedFn(e.target.value)} />
      </div>

      <div className="main-div">

          
         <div className="child-div">
           <figure>
             
             <figcaption>To-Do List</figcaption>
           </figure>

           <div className="add items">
             <input type="text" placeholder="Add items.." 
             value={inputData}
             onChange={(e)=>setInputData(e.target.value)}
             />
            {
              toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
              <i className="far fa-edit add-btn" title="Update item" onClick={addItem} ></i>

                              
            }
             
           </div>
            <div className="showItems">
             {
               searchTerm.map((element)=>{
                 return (
                     <div className="eachItem" key={element.id}>
                       <h3>{element.name}</h3>
                       <div className="todo-btn">
                           <i className="far fa-edit add-btn" title="Edit item" onClick={()=>editItem(element.id)} ></i>
                           <i className="far fa-trash-alt add-btn" title="Delete item" onClick={()=>deleteItem(element.id)} ></i>
                       
                       </div>
                      
                     </div>
                 )
               })
             }
  
           </div>


          
           <div className="showItems">
              <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>
              CHECK LIST</span></button>
           </div>
             
         </div>

      </div>
      
      </React.Fragment>
    )}

export default Todo
