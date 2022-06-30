import './App.css';
import { Bayes } from './components/Bayes';
import { Input } from './components/Input';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  const handleForm = (input) => {
    console.log(input);
  };

  return (
    <div className="App bg-slate-50 min-h-screen font-sans">
      <div className="input-wrapper flex place-content-center place-items-center h-screen overflow-hidden ">
        <Input handleForm={handleForm} />
      </div>
      <Bayes />
    </div>
  );
}

export default App;
