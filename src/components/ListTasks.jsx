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
    <div>
      {status.map((state, index) => (
        <Section key={index} state={state} />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ state }) => {
  return <h2>{state} List</h2>;
};