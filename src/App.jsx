import { useEffect, useState } from "react"

function App() {

  const [allTodo, setAllTodo] = useState([]);
  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" });

  //1st
  function handleInput(e) {
    setSingleTodo((prevValue) => ({
      ...prevValue, [e.target.name]: e.target.value,
    }));
  }
  //2nd
  function handleClick() {
    setAllTodo([...allTodo, singleTodo]);
    localStorage.setItem("todos", JSON.stringify([...allTodo, singleTodo]));
  }
  //3rd
  useEffect(() => {
    function getTodoFromLocalStorage() {
      let data = JSON.parse(localStorage.getItem("todos")) || [];
      setAllTodo(data);
    }
    getTodoFromLocalStorage();
  }, [])
  //4th
  function deleteTodo(index) {
    let updateTodos = allTodo.filter((_, i) => i !== index);
    setAllTodo(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header and Inputs */}
      <div className="flex flex-col text-center gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold p-5">Todo app</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            onChange={handleInput}
            name="title"
            className="border rounded-md px-3 py-2 w-full sm:w-auto"
            type="text"
            placeholder="enter todo"
          />
          <input
            onChange={handleInput}
            name="desc"
            className="border rounded-md px-3 py-2 w-full sm:w-auto"
            type="text"
            placeholder="enter desc"
          />
          <div>
            <button
              onClick={handleClick}
              className="bg-green-500 cursor-pointer font-semibold rounded-md px-6 py-2 w-full sm:w-auto"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-between mt-8">
        {
          allTodo.map((data, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-3 m-2 w-full sm:w-[48%] lg:w-[520px] bg-white shadow-sm hover:shadow-md transition"
            >
              {/* Left Section */}
              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-gray-500 text-sm font-medium">#{index + 1}</span>
                <h1 className="text-base sm:text-lg font-bold text-gray-800 truncate">{data.title}</h1>
                <p className="text-sm text-gray-600 break-words">{data.desc}</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 cursor-pointer rounded-md text-sm font-semibold transition ml-2"
              >
                Delete
              </button>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App
