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
// import db from  './firebase';
// import { ObservationChoices } from 'ObservationChoices.js';

import ObservationList from 'ObservationList.js';
import { OptionContext } from './App';


export default function ObservationForm({dispatch, data}) {
  const initObserv = () => ({
    plant: '',
    checked: [],
    remarks: ''
  });

  const options = React.useContext(OptionContext);
  const [observ, setObserv] = React.useState(initObserv());
  const handleAddObserv = () => {
    let observations = data.observations;
    if (observ.plant) {
      observations.push(observ);
      dispatch({type: 'setData', name: 'observations', value: observations});
      setObserv(initObserv());
    }
  }

  const handleRemoveObserv = (event, index) => {
    // console.log(index);
    let observations = data.observations;
    observations.splice(index, 1);
    dispatch({type: 'setData', name: 'observations', value: observations});
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>調查表格</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Autocomplete
            id="observ-plant"
            options={options.plant}
            value={observ.plant}
            getOptionLabel={(option) => (option.name) ? `${option.name}. ${option.label}` : ''}
            isOptionEqualToValue={(option) => option.id}
            renderInput={(params) => <TextField {...params} label="植物" variant="standard" fullWidth required/>}
            onChange={(e, v) => setObserv( {...observ, plant: v })}
          />
        </Grid>
        {(options.mof.length) ? options.mof.map((x) => (
          <Grid item xs={12} sm={12} key={x.name}>
            <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
              <FormLabel component="legend">{x.title}</FormLabel>
              <FormGroup row>
                {(x.choices.length) ? x.choices.map((option) => {
                  const dataKey = `${x.id}/${option.id}`;
                  const checked = (observ && observ.checked.length > 0 && observ.checked.indexOf(dataKey) >= 0 ) ? true : false;
                  return (
                    <FormControlLabel
                      key={dataKey}
                      control={
                        <Checkbox checked={checked} onChange={(e) => {
                          let values = [...observ.checked];
                          if (checked === false) {
                            values.push(dataKey);
                          } else {
                            const foundIndex = values.findIndex( (x)=> x === dataKey );
                            if (foundIndex >= 0) {
                              values.splice(foundIndex, 1);
                            }
                          }
                          setObserv({ ...observ, checked: values });
                        }} />
                      }
                      label={`${option.name}-${option.label}`}
                    />
                  )}) : null }
              </FormGroup>
              <FormHelperText>{x.description}</FormHelperText>
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
            value={observ.remarks}
            onChange={(e, v) => (setObserv({...observ, remarks: v}))}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
            onClick={handleAddObserv}
          >
            新增紀錄
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <ObservationList observations={data.observations} onRemove={handleRemoveObserv}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
