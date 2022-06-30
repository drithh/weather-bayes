const csv = require('csv-parser');
const fs = require('fs');
const math = require('mathjs');

const input = {
  Temperature: 20.02222222,
  JarakPandang: 11.27,
  Kelembaban: 0.54,
  KecepatanAngin: 24.6652,
  DerajatAngin: 359,
  TekananUdara: 1013.43,
};

const bayes = async () => {
  const csvData = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream('/bayes/test.csv')
      .pipe(csv())
      .on('data', (data) => csvData.push(data))
      .on('end', () => resolve(csvData))
      .on('error', (err) => reject(err));
  });

  const dataResult = {
    Temperature: {},
    JarakPandang: {},
    Kelembaban: {},
    KecepatanAngin: {},
    DerajatAngin: {},
    TekananUdara: {},
  };

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
    dataResult[key] = clusteringGroup(csvData, key);
  });

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
  console.log(result.likelihoodNormal);
};

const generateJson = async () => {
  const csvData = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream('./test.csv')
      .pipe(csv())
      .on('data', (data) => csvData.push(data))
      .on('end', () => resolve(csvData))
      .on('error', (err) => reject(err));
  });

  const dataResult = {
    Temperature: {},
    JarakPandang: {},
    Kelembaban: {},
    KecepatanAngin: {},
    DerajatAngin: {},
    TekananUdara: {},
  };

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
    dataResult[key] = clusteringGroup(csvData, key);
  });
  console.log(dataResult);
  let data = JSON.stringify(dataResult);
  fs.writeFileSync('../react/src/components/dataResult.json', data);

  // Object.keys(dataResult).forEach((key) => {
  //   probabilty[key] = getNormalDistribution(dataResult[key], input[key]);
  // });
  // probabilty.CurahHujan = getProbabilty(dataResult.Temperature);

  // const result = {
  //   likelihood: {},
  //   likelihoodNormal: {},
  // };
  // result.likelihood = getLikelihood(probabilty);
  // result.likelihoodNormal = getLikelihoodNormal(result.likelihood);
  // console.log(result.likelihoodNormal);
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

const clusteringGroup = (data, className) => {
  const curahHujan = {
    clear: { data: [], stdDev: 0, mean: 0 },
    foggy: { data: [], stdDev: 0, mean: 0 },
    mostlyCloudy: { data: [], stdDev: 0, mean: 0 },
    overcast: { data: [], stdDev: 0, mean: 0 },
    partlyCloudy: { data: [], stdDev: 0, mean: 0 },
  };
  data.forEach((item) => {
    switch (item.Cuaca) {
      case 'Clear':
        curahHujan.clear.data.push(parseFloat(item[className]));
        break;
      case 'Foggy':
        curahHujan.foggy.data.push(parseFloat(item[className]));
        break;
      case 'Mostly Cloudy':
        curahHujan.mostlyCloudy.data.push(parseFloat(item[className]));
        break;
      case 'Overcast':
        curahHujan.overcast.data.push(parseFloat(item[className]));
        break;
      case 'Partly Cloudy':
        curahHujan.partlyCloudy.data.push(parseFloat(item[className]));
        break;
      default:
        break;
    }
  });
  Object.keys(curahHujan).forEach((key) => {
    const data = curahHujan[key].data;
    const mean = math.mean(data);
    const stdDev = math.std(data);
    curahHujan[key].mean = mean;
    curahHujan[key].stdDev = stdDev;
  });

  return curahHujan;
};

generateJson();
