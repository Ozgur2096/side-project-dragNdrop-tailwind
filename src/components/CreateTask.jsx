import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: '',
    name: '',
    status: 'todo',
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error('A task must have at least 3 characters');

    if (task.name.length > 100)
      return toast.error('A task must have at most 100 characters');

    setTasks(prevTasks => {
      // Check if prevTasks is an array or initialize it as an empty array if it's not
      const updatedTasks = Array.isArray(prevTasks)
        ? [...prevTasks, task]
        : [task];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    toast.success('Task created');

    // Reset the task input after submission
    setTask({
      id: '',
      name: '',
      status: 'todo',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-2'
        value={task.name}
        onChange={e => setTask({ ...task, id: uuidv4(), name: e.target.value })}
      />
      <button className='bg-cyan-500 rounded-md pc-4 h-12  text-white'>
        Create
      </button>
    </form>
  );
};

export default CreateTask;
