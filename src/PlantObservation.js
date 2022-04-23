import React from 'react';
import {TextField} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { zhTW } from 'date-fns/locale';

const PlantObservation = () => {
   const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
     <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhTW}>
       <h3>Hello World</h3>
       <MobileDatePicker
         label="日期"
         inputFormat="yyyy-MM-dd"
         value={value}
         mask='____-__-__'
         onChange={handleChange}
         renderInput={(params) => <TextField {...params} variant="standard"/>}
        />
    </LocalizationProvider>
  );
};

export default PlantObservation;
