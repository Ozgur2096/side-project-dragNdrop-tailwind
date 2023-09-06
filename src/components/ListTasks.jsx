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

  return (
    <div className='w-64'>
      <Header text={text} bg={bg} count={tasksToMap.length} /> List
    </div>
  );
};
const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pt-4 rounded-md uppercase text-sm text-white`}
    >
      {text}{' '}
      <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
        {count}
      </div>
    </div>
  );
};
