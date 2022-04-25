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

export default function AddressForm() {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleChangeV = (newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>調查事件</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MobileDatePicker
            label="調查日期"
            inputFormat="yyyy-MM-dd"
            value={value}
            mask='____-__-__'
            onChange={handleChangeV}
            renderInput={(params) => <TextField {...params} variant="standard" fullWidth required/>}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[]}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option) => option.treeID}
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
            renderInput={(params) => <TextField {...params} label="調查人員" variant="standard" fullWidth />}
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
    </React.Fragment>
  );
}
