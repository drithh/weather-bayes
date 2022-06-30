const csv = require('csv-parser');
const fs = require('fs');
const math = require('mathjs');
const gaussian = require('gaussian');

const main = async () => {
  const csvData = [];

  const data = await new Promise((resolve, reject) => {
    fs.createReadStream('test.csv')
      .pipe(csv())
      .on('data', (data) => csvData.push(data))
      .on('end', () => resolve(csvData))
      .on('error', (err) => reject(err));
  });

  const dataResult = {
    TempMax: {},
    TempMin: {},
    TempMean: {},
    WindVeloc: {},
    Humidity: {},
    IndeksRadiasiUV: {},
  };

  const input = {
    TempMax: 31,
    TempMin: 21,
    TempMean: 24.26,
    WindVeloc: 8,
    Humidity: 68,
    IndeksRadiasiUV: 7,
  };

  Object.keys(dataResult).forEach((key) => {
    dataResult[key] = clusteringGroup(data, key);
  });

  Object.keys(dataResult).forEach((key) => {
    console.log(key);
    getNorm(dataResult[key], input[key]);
  });
};

const getNorm = (data, input) => {
  // iterate thorub object
  Object.keys(data).forEach((key) => {
    console.log(normalDistribution(data[key].mean, data[key].stdDev, input));
  });
};

const normalDistribution = (mean, stdDev, input) => {
  return (
    (1 / (stdDev * math.sqrt(2 * math.pi))) *
    math.pow(math.e, (-1 / 2) * math.pow((input - mean) / stdDev, 2))
  );
};

const clusteringGroup = (data, className) => {
  const groupData = {
    tidakHujan: [],
    rendah: [],
    sedang: [],
    tinggi: [],
    sangatTinggi: [],
  };
  const curahHujan = {
    tidakHujan: { stdDev: 0, mean: 0 },
    rendah: { stdDev: 0, mean: 0 },
    sedang: { stdDev: 0, mean: 0 },
    tinggi: { stdDev: 0, mean: 0 },
    sangatTinggi: { stdDev: 0, mean: 0 },
  };
  data.forEach((item) => {
    switch (item.Hujan) {
      case 'Tidak Hujan':
        groupData.tidakHujan.push(parseInt(item[className]));
        break;
      case 'Rendah':
        groupData.rendah.push(parseInt(item[className]));
        break;
      case 'Sedang':
        groupData.sedang.push(parseInt(item[className]));
        break;
      case 'Tinggi':
        groupData.tinggi.push(parseInt(item[className]));
        break;
      case 'Sangat Tinggi':
        groupData.sangatTinggi.push(parseInt(item[className]));
        break;
      default:
        break;
    }
  });

  Object.keys(curahHujan).forEach((key) => {
    const data = groupData[key];
    const mean = math.mean(data);
    const stdDev = math.std(data);
    curahHujan[key].mean = mean;
    curahHujan[key].stdDev = stdDev;
  });

  return curahHujan;
};

main().catch(console.error);
