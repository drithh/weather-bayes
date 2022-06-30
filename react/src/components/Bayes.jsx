// import dataResult.json
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

  useEffect(() => {
    if (input) {
      setResult(resolveBayes(dataResult, input));
    }
  }, [input]);

  useEffect(() => {
    console.log(result);
  }, [result]);
  return (
    <div>
      <h1>Bayes</h1>
    </div>
  );
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
