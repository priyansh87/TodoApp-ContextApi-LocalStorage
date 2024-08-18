import { useState , useEffect} from "react"
import { TodoProvider } from "./context";

function App() {


  const [todos , setTodos ] = useState([]) ; 

  const addTodo = (todo)=>{
    setTodos( (prev)=> [{id : Date.now() , ...todo} , ...prev ])
  }

  const updateTodo = (id , todo)=>{
    setTodos(prev=> prev.map( (prevTodo) => (prevTodo.id === id  ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos( (prev)=> prev.filter( (prevTodo) => (prevTodo.id !== id)))
  }


  const toggleComplete = (id) => {
    setTodos(prev=> prev.map( (prevTodo) => (prevTodo.id === id ? {...prevTodo, completed :!prevTodo.completed } : prevTodo)))
  }


  // local storage : 
  // jb tk react pe hai tb tk local storage access kr skte hai as it is clint side rendering : 
  // ! localstorage stores and sends data in the fomr of a string : 
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if( todos && todos.length > 0 ){
      setTodos(todos)
    }
  }, [])

  useEffect( ()=> {
    // this takes keys , values : keys should be same while getting : 
    localStorage.setItem("todos" , JSON.stringify(todos))
  })
  

  return (
    <TodoProvider value = {{ todos , addTodo , updateTodo , deleteTodo , toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
            </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
