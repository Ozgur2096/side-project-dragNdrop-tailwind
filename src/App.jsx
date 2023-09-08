import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import CreateTask from './components/CreateTask';
import ListTasks from './components/ListTasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-16'>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
