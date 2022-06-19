import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Avatar,
}  from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { OptionContext } from './App';

export default function ObservationList({observations, onRemove}) {
  const options = React.useContext(OptionContext);
  let labelMap = {};
  let catIdIndex = {};
  for (const i in options.mof) {
    catIdIndex[options.mof[i].id] = parseInt(i, 10);
    for (const c of options.mof[i].choices) {
      labelMap[`${options.mof[i].id}/${c.id}`] = c.label;
    }
  }
  //console.log(labelMap, catIdIndex);

  const getLabels = (checked) => {
    let tmp = options.mof.map((x) => []);
    let ret = [];

    for (const key of checked) {
      const keyList = key.split('/');
      const index = catIdIndex[keyList[0]];
      tmp[index].push(labelMap[key]);
    }

    for (const i in tmp) {
      if (tmp[i].length > 0) {
        ret.push(options.mof[i].label + ': ' + tmp[i].join('/'));
      }
    }
    return ret.join(', ');
  }

  return (
    <>
    {observations.length > 0 ?
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
      紀錄列表
      </Typography>
      : null
    }
      <List dense={true}>
        {observations.map((observ, idx) => {
          const catLabels = options.mof.map((x)=> {});
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={(e) => onRemove(e, idx)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Avatar>
                  <EditIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`${observ.plant.name}. ${observ.plant.label}`}
                secondary={getLabels(observ.checked)}
              />
            </ListItem>
          )})}
      </List>
  </>
)
};
