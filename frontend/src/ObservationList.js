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
import { getObservationChoicesText } from 'ObservationChoices.js';

export default function ObservationList({records}) {

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        已加入紀錄
      </Typography>
      <List dense={true}>
        {records.map((x, idx) => {
          const secondaryText = getObservationChoicesText(x);
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
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
                primary={`${x.tree.treeID}-${x.tree.name}`}
                secondary={secondaryText}
              />
            </ListItem>
          )})}
      </List>
  </>
)
};
