import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import './App.css';

function App() {
  const [data , setData ] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errors, setErrors] = useState({ taskError: '', categoryError: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState("All");

  // set task in local storage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setData(JSON.parse(savedTasks));
    }
  }, []);  

  // main function for add or edit task
  const saveTask = (e) => {
    e.preventDefault();

    setErrors({ taskError: '', categoryError: '' });

    const taskinput = e.target.taskinput.value;
    const category = e.target.category.value;    

    if (!taskinput.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        taskError: 'Please enter a task name.'
      }));
      return;
    }
  
    if (!category) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        categoryError: 'Please select a category.'
      }));
      return;
    }

    const updatedTask = { id: isEditing ? currentTask.id : Date.now(), task: taskinput, category: category, done: false };
    
    let updatedData;
    if (isEditing) {
      updatedData = data.map(task => task.id === currentTask.id ? updatedTask : task);
    } else {
      updatedData = [...data, updatedTask];
    }

    setData(updatedData);
    localStorage.setItem("tasks", JSON.stringify(updatedData));

    e.target.reset();
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentTask(null); 
  };
  
  // for task done or not 
  const toggleTaskStatus = (id) => {
    const updatedData = data.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setData(updatedData);
    localStorage.setItem('tasks', JSON.stringify(updatedData)); // also save
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task); 
    setIsModalOpen(true);
  };

  const deleteTask = (id) => {
    const updatedData = data.filter(task => task.id !== id);
    setData(updatedData);
    localStorage.setItem('tasks', JSON.stringify(updatedData));
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredTasks = data.filter(item => {
    const statusMatch =
      filter === 'done' ? item.done :
      filter === 'notdone' ? !item.done :
      true;
  
    const categoryMatch =
      selectedCategory === 'all' ? true :
      selectedCategory === 'home' ? item.category === 'Home' :
      selectedCategory === 'personal' ? item.category === 'Personal' :
      selectedCategory === 'office' ? item.category === 'Office' :
      true;
  
    return statusMatch && categoryMatch;
  });


  return (
    <div className="App w-75 ">
      
      <div className="left d-flex flex-column justify-content-start align-items-center w-25 bg-light-subtle rounded-start-5">
        <div className="logo my-5">
          <i class="bi bi-clipboard-data fs-1 "></i>
        </div>

        <div className="menu d-flex flex-column align-items-start gap-3">
          
          <div className={`${selectedCategory === 'all' ? 'active' : ''}`}>
            <button className={`border-0 d-flex gap-2 bg-transparent`} onClick={() => handleCategoryChange('all')} >
              <i class="bi bi-clipboard2-check-fill"></i>
              Tasks
            </button>
          </div>

          <div class="dropdown"> 
            <button class="dropdown-toggle border-0 d-flex gap-2 bg-transparent" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-folder-fill"></i>
              Categories
              <i class="bi bi-chevron-down dropdown-icon"></i>
            </button>
            <ul class="dropdown-menu">
              <li><button class={`dropdown-item ${selectedCategory === 'home' ? 'active' : ''}`} onClick={() => handleCategoryChange('home')}>Home</button></li>
              <li><button class={`dropdown-item ${selectedCategory === 'personal' ? 'active' : ''}`} onClick={() => handleCategoryChange('personal')}>Personal</button></li>
              <li><button class={`dropdown-item ${selectedCategory === 'office' ? 'active' : ''}`} onClick={() => handleCategoryChange('office')}>Office</button></li>
            </ul>  
          </div>

        </div>
      </div>


      <div className="right w-75 bg-light rounded-end-5">
        <h4 className='text-center my-5'>All your tasks</h4>
      
        <div className="bar d-flex justify-content-between mx-5 px-5">
          <h5>Tasks</h5>
          <div className="filter d-flex gap-2">
            <button className={`bg-transparent border px-3 ${filter === 'all' ? 'active' : ''}`}  onClick={() => handleFilterChange('all')} >All</button>
            <button className={`bg-transparent border px-3 ${filter === 'done' ? 'active' : ''}`}  onClick={() => handleFilterChange('done')}>Done</button>
            <button className={`bg-transparent border px-3 ${filter === 'notdone' ? 'active' : ''}`}  onClick={() => handleFilterChange('notdone')}>Not done</button>
            <i class="bi bi-funnel-fill"></i>
          </div>
        </div>
        
        <div className="tasks d-flex flex-column mx-5 px-5">

        <div className='d-flex flex-column gap-3 mb-3' id='alltask'>
          {filteredTasks.length === 0 ? (
            <p className="mt-3 text-center text-secondary">No tasks found.</p>
          ) : (
            filteredTasks.map((item) => (
              <div key={item.id} className="task-item d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className='p-3 px-4 me-4 border-end'>
                    <i onClick={() => toggleTaskStatus(item.id)} className={`bi ${item.done ? 'bi-check-circle-fill' : 'bi-circle'}`} style={{ fontSize: '1.5rem' }}></i>
                  </div>

                  <div className='d-flex flex-column'>
                    <strong 
                      style={{ 
                        textDecoration: item.done ? 'line-through' : 'none', 
                        opacity: item.done ? 0.5 : 1,
                      }}
                    >{item.task}</strong>  

                    <div className='d-flex align-items-center gap-2'>
                      <div className='rounded-circle' 
                        style={{ 
                          opacity: item.done ? 0.5 : 1,
                          width: '9px', height: '9px',
                          backgroundColor:
                            item.category === 'Home' ? 'green' 
                            : item.category === 'Office' ? 'blue' 
                            : item.category === 'Personal' ? 'red' 
                            : 'gray'
                        }}
                      ></div>
                      <span 
                        className='tag' 
                        style={{ 
                          opacity: item.done ? 0.5 : 1,
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-4 me-5">
                  <i className="bi bi-pencil-fill" onClick={() => handleEditTask(item)}></i>
                  <i className="bi bi-trash3-fill" onClick={() => deleteTask(item.id)}></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

        <div className="add d-flex flex-column mt-3 mx-5 px-5">
          {/*----- Task Count -----*/}
          <p className="text-muted mb-2">Total Tasks: {filteredTasks.length}</p>

          <button type="button" className='addbtn d-flex gap-2 align-items-center justify-content-center w-100 bg-transparent  p-2'
           onClick={() => {setIsEditing(false); setIsModalOpen(true);}}>
            <i class="bi bi-plus-square"></i>
            Add a task
          </button>

          <Modal 
            isOpen={isModalOpen} 
            onRequestClose={() => setIsModalOpen(false)} 
            contentLabel={isEditing ? "Save Changes" : "New Task"}
            className="custom-overlay modal-content bg-white border-0 rounded-1 p-4"
          >
            <div className="modal-header pb-2 border-bottom">
              <h5 className="modal-title">
                {isEditing ? 'Save Changes' : 'New Task'}
              </h5>
              <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
            </div>
            <div className="modal-body">
              {/*======== form ========*/}
              <form onSubmit={saveTask}>
                <label htmlFor="task" className='d-flex mt-3 flex-column gap-2'>
                  Task Name  
                  <input type="text" name='taskinput' id="task" defaultValue={isEditing ? currentTask.task : ''} className='form-control' />
                  {errors.taskError && <small className="text-danger">{errors.taskError}</small>}
                </label>

                <label className='mt-4 mb-1'>Category</label>                      
                <div className='d-flex gap-3'>
                  <label className='d-flex gap-1'>
                    <input type="radio" id="home" name='category' value="Home" defaultChecked={isEditing && currentTask.category === 'Home'}  />
                    Home
                  </label>
                  <label className='d-flex gap-1'>
                    <input type="radio" id="personal" name='category' value="Personal" defaultChecked={isEditing && currentTask.category === 'Personal'}  />
                    Personal
                  </label>
                  <label className='d-flex gap-1'>
                    <input type="radio" id="office" name='category' value="Office" defaultChecked={isEditing && currentTask.category === 'Office'}  />
                    Office
                  </label>
                </div>
                {errors.categoryError && <small className="text-danger">{errors.categoryError}</small>}

                <div className="modal-footer border-top  mt-4 px-0 pt-3 d-flex gap-2">
                  <button type="submit" className="btn btn-dark">
                    {isEditing ? 'Save Changes' : 'Add New'}
                  </button>
                  <button type="button" className="btn btn-light" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
              </form>
            </div>
          </Modal>




        </div>

      </div>
    
    </div>
  );
}

export default App;
