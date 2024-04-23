import {useEffect, useState} from 'react';
import './App.css';
import SensorChart from './components/SensorChart';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';


function App() {

  interface SensorDataEntry {
    date: string;
    humidity: number;
    pressure: number;
    temperature: number;
    }

const [sensorData, setSensorData] = useState<SensorDataEntry[]>([]);
const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
  }, [])
  async function fetchData() {
    try {
      await axios.get('http://192.168.0.100:5005/daily-sensor-data').then(response => {
        setSensorData(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message)
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
    <Router>    
      <Navbar/>
      <Routes>
        <Route path="/" element={<SensorChart sensor="Temperature" unit="°C" data={tempData} error={error ?? ''} dates={tempLabels}/>}/>
        <Route path="/humidity" element={<SensorChart sensor="Humidity" unit="%" data={humData} error={error ?? ''}dates={tempLabels}/>}/>
        <Route path="/pressure" element={<SensorChart sensor="Pressure" unit="hPa" data={pressData} error={error ?? ''}dates={tempLabels}/>}/>
      </Routes>
          
    </Router>
  );
}

export default App;