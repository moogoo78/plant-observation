import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { OptionContext } from './App';

export default function EventForm({dispatch, data}) {
  const options = React.useContext(OptionContext);

  let dateString = '';
  if (data.date instanceof Date && !isNaN(data.date)) {
    const x = data.date.toLocaleDateString('en-GB',  { timeZone: 'Asia/Taipei' });
    dateString = x;
  }

  // duplicated: ObesrvationList
  let labelMap = {};
  let catIdIndex = {};
  for (const i in options.mof) {
    catIdIndex[options.mof[i].id] = parseInt(i, 10);
    for (const c of options.mof[i].choices) {
      labelMap[`${options.mof[i].id}/${c.id}`] = c.label;
    }
  }

  const getColLabels = (checked, col_index) => {
    let ret = [];
    for (const key of checked) {
      const keyList = key.split('/');
      const index = catIdIndex[keyList[0]];
      if (col_index === index) {
        ret.push(labelMap[key]);
      }
    }
    return ret.join('/');
  }

  return (
    <Paper sx={{p:3}} evelation={3}>
      <Typography>調查日期: {dateString}</Typography>
      <Typography>調查計劃: {data.project?.name}</Typography>
      <Typography>調查地點: {data.location?.name}</Typography>
      <Typography>主責: {data.principal?.name}</Typography>
      <Typography>紀錄內容:</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>(標號)植物</TableCell>
            {options.mof.map((x, idx) => {
              return (
                <TableCell align="right" key={idx}>{x.label}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.observations.map((row, index) => {
            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${row.plant.name}.${row.plant.label}`}
                </TableCell>
                {options.mof.map((column, col_idx) => {
                  return (
                    <TableCell align="right" key={col_idx}>{getColLabels(row.checked, col_idx)}</TableCell>
                  )
                })}
              </TableRow>
            )})
          }
        </TableBody>
      </Table>
    </Paper>
  );
}
