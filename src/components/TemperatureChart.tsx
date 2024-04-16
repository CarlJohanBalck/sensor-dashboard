import React, {useEffect, useState} from 'react';
import LineChart from './LineChart';
import axios from 'axios';
import { stat } from 'fs';

const TemperatureChart: React.FC = () => {

interface SensorDataEntry {
    date: string;
    humidity: number;
    pressure: number;
    temperature: number;
    }

const [sensorData, setSensorData] = useState<SensorDataEntry[]>([]);

  useEffect(() => {
    fetchIngredients()
  }, [])
  async function fetchIngredients() {
    try {
      await axios.get('http://192.168.0.100:5005/daily-sensor-data').then(response => {
        setSensorData(response.data)
       
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  } catch (error) {

      throw error;
    }
  }

  let temp: number[] = []
  let hum: number[] = []
  let press: number[] = []
  let date: string[] = []

  for (let i = 0; i < sensorData.length; i++) {
    const data = sensorData[i]
    temp.push(data.temperature)
    hum.push(data.humidity)
    press.push(data.pressure)
    date.push(data.date)
  } 

  const tempData = temp;
  const humData = hum;
  const pressData = press;
  const tempLabels = date;


  return (
    <div>
      <h1>Temperature</h1>
      <LineChart data={tempData} labels={tempLabels} />
      <h1>Humidity</h1>
      <LineChart data={humData} labels={tempLabels} />
      <h1>Pressure</h1>
      <LineChart data={pressData} labels={tempLabels} />
    </div>
  );
};

export default TemperatureChart;
