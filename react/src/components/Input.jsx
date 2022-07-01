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
    <div className="max-w-6xl w-full h-max bg-white rounded-xl  shadow-md">
      <div className="title py-4 text-4xl text-purple-900 my-6 font-bold font-lato">
        Masukkan Data Yang Diperlukan
      </div>
      <div className="grid grid-cols-3 p-8 gap-4">
        <div className="input-wrapper flex flex-col place-content-start gap-y-2 px-6">
          <label className="pl-2 font-bold text-purple-900 text-left text-xl">
            Temperature
            <span className="text-gray-400 text-base font-medium"> °C</span>
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
            <span className="text-gray-400 text-base font-medium"> km</span>
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
            <span className="text-gray-400 text-base font-medium"> 0-1</span>
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
            <span className="text-gray-400 text-base font-medium"> km/jam</span>
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
            <span className="text-gray-400 text-base font-medium"> °</span>
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
            <span className="text-gray-400 text-base font-medium">
              {' '}
              milibar
            </span>
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
            type="reset"
            className="px-8 py-2 border-2 mt-6 border-gray-100 rounded-lg outline-none shadow text-purple-900 hover:bg-purple-700 hover:text-white transition-all font-bold"
            onClick={() => {
              handleForm(input);
              // setInput({
              //   Temperature: '',
              //   JarakPandang: '',
              //   Kelembaban: '',
              //   KecepatanAngin: '',
              //   DerajatAngin: '',
              //   TekananUdara: '',
              //   CurahHujan: '',
              // });
            }}
          >
            Predict
          </button>
        </div>
      </div>
    </div>
  );
};
