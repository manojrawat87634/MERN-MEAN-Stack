import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [userInp, setUserInp] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    const t_arr = localStorage.getItem('todos');
    if (t_arr){
      setTodos(JSON.parse(t_arr));
    }  
    else{
      localStorage.setItem("todos",JSON.stringify([]));
    }
  },[]);

  return (
  <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4">
    {/* Ambient gradient glow */}
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#6366f180,transparent_40%),radial-gradient(circle_at_80%_80%,#a855f780,transparent_40%)]" />

    <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-6">
      <h1 className="text-xl font-semibold text-white tracking-tight mb-6">
        Tasks
      </h1>

      {/* Todo list */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
        {todos.map((e, i) => (
          <div
            key={i}
            className="group flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm text-white/90 hover:bg-white/10 transition"
          >
            <span className="opacity-0 group-hover:opacity-100 text-xs text-white/40 transition">
         
            </span>
            <span className="truncate">{e}</span>
            <button onClick={()=>{
                const newTodo = todos.filter((el)=> e != el);
                 localStorage.setItem('todos', JSON.stringify(newTodo));
                setTodos(newTodo);
            }}>Delete</button>

          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="New task"
          onChange={(e) => setUserInp(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />

        <button
          onClick={() => {
            
            const newTodos = [...todos, userInp];
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
          }}
          className="shrink-0 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-400 active:scale-95 transition"
        >
          Add
        </button>
      </div>
    </div>
  </div>
);


}

export default App
