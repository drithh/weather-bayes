import { useState } from 'react';
export const Input = ({ handleForm }) => {
  const [input, setInput] = useState({
    Temperature: '',
    JarakPandang: '',
    Kelembaban: '',
    KecepatanAngin: '',
    DerajatAngin: '',
    TekananUdara: '',
    CurahHujan: '',
  });
  return (
    <div className="w-3/5 h-96 bg-white rounded-xl grid grid-cols-3 p-8 gap-4 shadow-sm">
      <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
        <label className="pl-2 font-bold text-purple-900 text-left text-xl">
          Temperature
        </label>
        <input
          type="number"
          name="Temperature"
          className="w-full h-8 pl-4 py-5 border-2 border-gray-100 rounded-lg outline-none shadow"
          value={input.Temperature}
          onChange={(e) => {
            setInput({ ...input, Temperature: e.target.value });
          }}
        />
      </div>
      <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
        <label className="pl-2 font-bold text-purple-900 text-left text-xl">
          Jarak Pandang
        </label>
        <input
          type="number"
          name="JarakPandang"
          className="w-full h-8 pl-4 py-5 border-2 border-gray-100 rounded-lg outline-none shadow"
          value={input.JarakPandang}
          onChange={(e) => {
            setInput({ ...input, JarakPandang: e.target.value });
          }}
        />
      </div>
      <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
        <label className="pl-2 font-bold text-purple-900 text-left text-xl">
          Kelembaban
        </label>
        <input
          type="number"
          name="Kelembaban"
          className="w-full h-8 pl-4 py-5 border-2 border-gray-100 rounded-lg outline-none shadow"
          value={input.Kelembaban}
          onChange={(e) => {
            setInput({ ...input, Kelembaban: e.target.value });
          }}
        />
      </div>
      <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
        <label className="pl-2 font-bold text-purple-900 text-left text-xl">
          Kecepatan Angin
        </label>
        <input
          type="number"
          name="KecepatanAngin"
          className="w-full h-8 pl-4 py-5 border-2 border-gray-100 rounded-lg outline-none shadow"
          value={input.KecepatanAngin}
          onChange={(e) => {
            setInput({ ...input, KecepatanAngin: e.target.value });
          }}
        />
      </div>
      <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
        <label className="pl-2 font-bold text-purple-900 text-left text-xl">
          Derajat Angin
        </label>
        <input
          type="number"
          name="DerajatAngin"
          className="w-full h-8 pl-4 py-5 border-2 border-gray-100 rounded-lg outline-none shadow"
          value={input.DerajatAngin}
          onChange={(e) => {
            setInput({ ...input, DerajatAngin: e.target.value });
          }}
        />
      </div>
      <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
        <label className="pl-2 font-bold text-purple-900 text-left text-xl">
          Tekanan Udara
        </label>
        <input
          type="number"
          name="TekananUdara"
          className="w-full h-8 pl-4 py-5 border-2 border-gray-100 rounded-lg outline-none shadow"
          value={input.TekananUdara}
          onChange={(e) => {
            setInput({ ...input, TekananUdara: e.target.value });
          }}
        />
      </div>
      <div className="input-wrapper flex flex-col place-items-end gap-y-2 px-6 col-span-3">
        <button
          className="px-8 py-2 border-2 border-gray-100 rounded-lg outline-none shadow hover:bg-purple-700 hover:text-white transition-all font-bold"
          onClick={() => {
            handleForm(input);
          }}
        >
          Predict
        </button>
      </div>
    </div>
  );
};
