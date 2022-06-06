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
  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        已加入紀錄
      </Typography>
      <List dense={true}>
        {observations.map((x, idx) => {
          const textList = x.checked.map((x) => {
            const keys = x.split('__');
            const mofCatIndex = options.mof.findIndex((x) => x.name === keys[0]);
            const mofIndex = options.mof[mofCatIndex].choices.findIndex((x) => x.name === keys[1]);
            const v = options.mof[mofCatIndex].choices[mofIndex];
            return `${options.mof[mofCatIndex].label}: ${v.name}. ${v.label}`;
          });

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
                primary={`${x.plant.name}. ${x.plant.label}`}
                secondary={textList.join(', ')}
              />
            </ListItem>
          )})}
      </List>
  </>
)
};
