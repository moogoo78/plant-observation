import React from 'react';

import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
}  from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import { OptionContext } from './App';

export default function EventForm({dispatch, data}) {
  const options = React.useContext(OptionContext);
  // console.log('props', options, data);
  return (
    <>
      <Typography variant="h6" gutterBottom>調查活動</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MobileDatePicker
            label="調查日期"
            inputFormat="yyyy-MM-dd"
            value={data.date}
            mask='____-__-__'
            onChange={(v)=>dispatch({type:'setData', name: 'date', value: v})}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth required/>}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            options={options.person}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.id}
            value={data.principal}
            onChange={(e, v)=>dispatch({type:'setData', name: 'principal', value: v})}
            renderInput={(params) => <TextField {...params} label="主責人/單位" variant="standard" fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            disablePortal
            options={options.project}
            value={data.project}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.id}
            onChange={(e, v)=>dispatch({type:'setData', name: 'project', value: v})}
            renderInput={(params) => <TextField {...params} label="專案名稱" variant="standard" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options.location}
            value={data.location}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.id}
            onChange={(e, v)=>dispatch({type:'setData', name: 'location', value: v})}
            renderInput={(params) => <TextField {...params} label="調查地點" variant="standard" fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[]}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.treeID}
            renderInput={(params) => <TextField {...params} label="參與人員" variant="standard" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[]}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.treeID}
            renderInput={(params) => <TextField {...params} label="記錄者" variant="standard" fullWidth required />}
          />
        </Grid>
        {/*
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
            />
        </Grid>
         */}
      </Grid>
    </>
  );
}
