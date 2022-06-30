import './App.css';
import { Bayes } from './components/Bayes';
import { Input } from './components/Input';
import { useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  const handleForm = (input) => {
    setData({
      DerajatAngin: parseFloat(input.DerajatAngin),
      KecepatanAngin: parseFloat(input.KecepatanAngin),
      Kelembaban: parseFloat(input.Kelembaban),
      JarakPandang: parseFloat(input.JarakPandang),
      TekananUdara: parseFloat(input.TekananUdara),
      Temperature: parseFloat(input.Temperature),
    });
  };

  return (
    <div className="App bg-slate-50 min-h-screen font-sans">
      <div className="title text-[5rem] font-extrabold font-title pt-20 pb-10 text-gray-800 uppercase tracking-widest">
        Tebak Cuaca
      </div>
      <div className="input-wrapper flex flex-col place-items-center gap-y-8 h-screen overflow-hidden ">
        <Input handleForm={handleForm} />
        <Bayes input={data} />
        {/* {data.length > 0 && <Bayes input={data} />} */}
      </div>
    </div>
  );
};

export default App;
