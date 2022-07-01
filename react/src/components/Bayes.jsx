import ProgressBar from '@ramonak/react-progress-bar';
import {
  AnimatedWeatherIcon,
  AnimatedWeatherTimes,
} from 'animated-weather-icon';
import { useState, useEffect } from 'react';
import dataResult from './dataResult.json';
const math = require('mathjs');

export const Bayes = (input) => {
  const [result, setResult] = useState({
    clear: 0,
    foggy: 0,
    mostlyCloudy: 0,
    overcast: 0,
    partlyCloudy: 0,
  });

  const [icon, setIcon] = useState('');

  const [topOne, setTopOne] = useState('');
  useEffect(() => {
    const renderTarget = document.querySelector('#icon');
    if (!icon) {
      setIcon(new AnimatedWeatherIcon(renderTarget));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (input.input.length !== 0) {
      setResult(resolveBayes(dataResult, input.input));
    }
  }, [input]);

  useEffect(() => {
    if (result.clear !== 0) {
      if (failCheck(result)) {
        console.log('wweirdd');
        return;
      }
      const weatherText = [
        'Cerah',
        'Berkabut',
        'Sebagian Besar Berawan',
        'Mendung',
        'Sedikit Berawan',
      ];
      const top = getTopOne(result);
      setTopOne(weatherText[top]);

      const weatherIcon = [
        'Clear',
        'Fog',
        'Cloudy',
        'Overcast',
        'Broken Clouds',
      ];
      console.log(icon);
      icon.setType(weatherIcon[top], AnimatedWeatherTimes.Day);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  return (
    <>
      <div
        className={
          'max-w-6xl w-full h-max bg-white rounded-xl  shadow-md p-14 mb-20 ' +
          (topOne === '' ? 'hidden' : 'test')
        }
      >
        {/* {topOne !== '' && ( */}
        <div className="text-2xl font-bold text-purple-900 text-left font-lato">
          Aku tebak Kondisi Cuaca Di tempat tersebut adalah
          <span className="font-medium"> {topOne}</span> !
        </div>
        {/* )} */}

        <div className="relative wrapper flex place-content-between place-items-center gap-x-8 h-min">
          {/* {topOne !== '' && ( */}
          <div className="precentage w-full">
            <div className="text-2xl mt-4 font-medium text-purple-900 text-left">
              Dengan Presentase:
            </div>
            <div className="progress-wrapepr pt-4 flex flex-col gap-y-2 place-content-center w-[34rem]">
              <div className="flex place-content-between">
                <div className="weather text-xl font-bold text-[#FFDE7D]">
                  Cerah
                </div>
              </div>
              <ProgressBar
                // isLabelVisible={false}
                customLabel={(result.clear * 100).toFixed(2) + '%'}
                className="w-[34rem]"
                completed={result.clear * 100 < 1 ? 0 : result.clear * 100}
                bgColor="#FFDE7D"
              />
            </div>
            <div className="progress-wrapepr pt-4 flex flex-col gap-y-2 place-content-center w-[34rem]">
              <div className="flex place-content-between">
                <div className="weather text-xl font-bold text-[#CADEFC]">
                  Sedikit Berawan
                </div>
              </div>
              <ProgressBar
                // isLabelVisible={false}
                customLabel={(result.partlyCloudy * 100).toFixed(2) + '%'}
                className="w-[34rem]"
                completed={
                  result.partlyCloudy * 100 < 1 ? 0 : result.partlyCloudy * 100
                }
                bgColor="#CADEFC"
              />
            </div>
            <div className="progress-wrapepr pt-4 flex flex-col gap-y-2 place-content-center w-[34rem]">
              <div className="flex place-content-between">
                <div className="weather text-xl font-bold text-[#A6B1E1]">
                  Sebagian Besar Berawan
                </div>
              </div>
              <ProgressBar
                // isLabelVisible={false}
                customLabel={(result.mostlyCloudy * 100).toFixed(2) + '%'}
                className="w-[34rem]"
                completed={
                  result.mostlyCloudy * 100 < 1 ? 0 : result.mostlyCloudy * 100
                }
                bgColor="#A6B1E1"
              />
            </div>
            <div className="progress-wrapepr pt-4 flex flex-col gap-y-2 place-content-center w-[34rem]">
              <div className="flex place-content-between">
                <div className="weather text-xl font-bold text-[#3D84A8]">
                  Berkabut
                </div>
              </div>
              <ProgressBar
                // isLabelVisible={false}
                customLabel={(result.foggy * 100).toFixed(2) + '%'}
                className="w-[34rem]"
                completed={result.foggy * 100 < 1 ? 0 : result.foggy * 100}
                bgColor="#3D84A8"
              />
            </div>
            <div className="progress-wrapepr pt-4 flex flex-col gap-y-2 place-content-center w-[34rem]">
              <div className="flex place-content-between">
                <div className="weather text-xl font-bold text-[#424874]">
                  Mendung
                </div>
              </div>
              <ProgressBar
                // isLabelVisible={false}
                customLabel={(result.overcast * 100).toFixed(2) + '%'}
                className="w-[34rem]"
                completed={
                  result.overcast * 100 < 1 ? 0 : result.overcast * 100
                }
                bgColor="#424874"
              />
            </div>
          </div>
          {/* )} */}

          <div className="icon w-2/5 absolute right-0 top-12" id="icon"></div>
        </div>
      </div>
    </>
  );
};

const failCheck = (data) => {
  // check if data key is not a number
  const keys = Object.keys(data);
  const check = keys.find((key) => {
    return isNaN(data[key]);
  });
  if (check) {
    return true;
  }
  return false;
};

const getTopOne = (data) => {
  const max = Math.max(...Object.values(data));
  const keys = Object.keys(data);
  const index = keys.findIndex((key) => data[key] === max);
  return index;
};

const resolveBayes = (dataResult, input) => {
  const probabilty = {
    Temperature: {},
    JarakPandang: {},
    Kelembaban: {},
    KecepatanAngin: {},
    DerajatAngin: {},
    TekananUdara: {},
    CurahHujan: {},
  };
  Object.keys(dataResult).forEach((key) => {
    probabilty[key] = getNormalDistribution(dataResult[key], input[key]);
  });
  probabilty.CurahHujan = getProbabilty(dataResult.Temperature);
  const result = {
    likelihood: {},
    likelihoodNormal: {},
  };

  result.likelihood = getLikelihood(probabilty);
  result.likelihoodNormal = getLikelihoodNormal(result.likelihood);

  return result.likelihoodNormal;
};

const getLikelihoodNormal = (data) => {
  const result = {};
  const sumData = Object.keys(data)
    .map((key) => {
      return data[key];
    })
    .reduce((a, b) => a + b);
  Object.keys(data).forEach((key) => {
    result[key] = data[key] / sumData;
  });

  return result;
};

const getLikelihood = (data) => {
  const result = {
    clear: 1,
    foggy: 1,
    mostlyCloudy: 1,
    overcast: 1,
    partlyCloudy: 1,
  };
  Object.keys(data).forEach((key) => {
    Object.keys(data[key]).forEach((key2) => {
      result[key2] *= data[key][key2];
    });
  });
  return result;
};

const getProbabilty = (data) => {
  const groupData = {
    clear: 0,
    foggy: 0,
    mostlyCloudy: 0,
    overcast: 0,
    partlyCloudy: 0,
  };
  const total = Object.keys(data).map((key) => {
    return data[key].data.length;
  });
  const totalData = math.sum(total);
  Object.keys(data).forEach((key) => {
    groupData[key] = data[key].data.length / totalData;
  });
  return groupData;
};

const getNormalDistribution = (data, input) => {
  const result = {
    clear: 0,
    foggy: 0,
    mostlyCloudy: 0,
    overcast: 0,
    partlyCloudy: 0,
  };
  Object.keys(data).forEach((key) => {
    result[key] =
      (1 / (data[key].stdDev * math.sqrt(2 * math.pi))) *
      math.pow(
        math.e,
        (-1 / 2) * math.pow((input - data[key].mean) / data[key].stdDev, 2)
      );
  });
  return result;
};
