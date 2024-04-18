import React, {useEffect, useState} from 'react';
import LineChart from './LineChart';
import axios from 'axios';


interface SensorDataEntry {
  sensor: string;
  unit: string;
  data: number[];
  error: string;
  dates: string[]
  }

const SensorChart: React.FC<SensorDataEntry> = ({sensor, unit, data, error, dates}) => {




  return (

<div>
      {error ? (
        <h1 className='error'>{error}</h1>
      ) :  (
        <div className="data">
          <h1>{sensor}</h1>
          <LineChart data={data} labels={dates} unit={unit}/>
        </div>
      )}
    </div>
  );
};

export default SensorChart;
