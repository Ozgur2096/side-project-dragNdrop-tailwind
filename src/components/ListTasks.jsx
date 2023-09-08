import toast from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter(task => task.status === 'todo');
    const fInProgress = tasks.filter(task => task.status === 'inprogress');
    const fClosed = tasks.filter(task => task.status === 'closed');

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const status = ['todo', 'inprogress', 'closed'];

  return (
    <div className='flex gap-20'>
      {status.map((state, index) => (
        <Section
          key={index}
          state={state}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ state, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: item => {
      console.log(item);
      addItemToSection(item.id);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = 'to  do';
  let bg = 'bg-slate-500';
  let tasksToMap = todos;

  if (state === 'inprogress') {
    text = 'In Progress';
    bg = 'bg-purple-500';
    tasksToMap = inProgress;
  }

  if (state === 'closed') {
    text = 'Closed';
    bg = 'bg-green-500';
    tasksToMap = closed;
  }

  const addItemToSection = id => {
    console.log(id, state);
    setTasks(prev => {
      const mTasks = prev.map(t => {
        if (t.id === id) {
          return { ...t, status: state };
        }
        return t;
      });
      console.log(mTasks);

      localStorage.setItem('tasks', JSON.stringify(mTasks));

      return mTasks;
    });
  };

  return (
    <div ref={drop} className='w-64'>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map(task => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};
const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pt-4 rounded-md uppercase text-sm text-white p-4`}
    >
      {text}{' '}
      <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = id => {
    const fTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(fTasks));
    setTasks(fTasks);
    toast('Task removed');
  };

  return (
    <div
      ref={drag}
      className='relative p-4 mt-8 shadow-md rounded-md cursor-grab'
    >
      <p>{task.name}</p>
      <button
        className='absolute bottom-1 right-1 text-slate-400'
        onClick={() => {
          handleRemove(task.id);
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      </button>
    </div>
  );
};
