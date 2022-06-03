import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  Checkbox,
  Autocomplete,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Avatar,
}  from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
// import { collection, getDocs } from "firebase/firestore";
import db from  './firebase';
import { ObservationChoices } from 'ObservationChoices.js';
import ObservationList from 'ObservationList.js';

const initData = () => {
  let initData = {
    tree: null,
    remarks: '',
  };
  for (const i in ObservationChoices) {
    const k = ObservationChoices[i].key;
    initData[k] = [];
  }
  return initData;
}

export default function ObservationForm() {
  const [records, setRecords] = React.useState([]);
  const [plants,setPlants] = React.useState([]);
  const [data, setData] = React.useState(initData());

  const handleChange = (_, key, value, checked=null) => {
    console.log('change', key, value, value, checked);
    setData((ps)=> {
      let newValue = null;
      if (ObservationChoices.find((x) => x.key === key)) {
        newValue = ps[key];
        if (checked === true) {
          const idx = ps[key].indexOf(value);
          if (idx >= 0) {
            newValue.splice(idx ,1);
          }
        } else {
          newValue.push(value);
        }
      } else {
        newValue = value;
      }
      return({
        ...ps,
        [key]: newValue,
      });
    });
  }

  const handleAddRecord = (_) => {
    let newRecords = records;
    if (data.tree) {
      newRecords.push(data);
      //setRecords(newRecords);
      setData(initData());
    }
  }
  console.log('render', data);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>調查表格</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="observ-plant"
            options={plants}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option.id}
            value={data.tree || null}
            renderInput={(params) => <TextField {...params} label="植物" variant="standard" fullWidth required/>}
            onChange={(e, value)=> handleChange(e, 'tree', value)}
          />
        </Grid>
        {(ObservationChoices.length) ? ObservationChoices.map((x) => (
          <Grid item xs={12} sm={12} key={x.key}>
            <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
              <FormLabel component="legend">{x.title}</FormLabel>
              <FormGroup row>
                {(x.choices.length) ? x.choices.map((option) => {
                  const dataKey = `${x.key}_${option.name}`;
                  const checked = (data && data[x.key].length > 0 && data[x.key].indexOf(option.name) >=0 ) ? true : false;
                  return (
                    <FormControlLabel
                      key={dataKey}
                      control={
                        <Checkbox checked={checked} onChange={(e)=> handleChange(e, x.key, option.name, checked)} />
                      }
                      label={`${option.name}-${option.label}`}
                    />
                  )}) : null }
              </FormGroup>
              <FormHelperText>{x.helperText}</FormHelperText>
            </FormControl>
          </Grid>
        )) : null}
        <Grid item xs={12} ms={12}>
          <TextField
            id="remarks"
            variant="standard"
            label="備註"
            multiline
            fullWidth
            rows={3}
            value={data.remarks}
            onChange={(e, val) => (setData({...data, remarks: val}))}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddRecord}
          >
            新增紀錄
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <ObservationList records={records} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
