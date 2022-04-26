import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const SearchUser = ({ filter }) => {
  return (
    <FormControl style={{
      background: '#fff',
      marginBottom: '20px',
      width: '130px'
    }}>
      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={filter}
      >
        <MenuItem value={'gender'}>choose gender</MenuItem>
        <MenuItem value={'male'}>Male</MenuItem>
        <MenuItem value={'female'}>Female</MenuItem>
      </Select>
    </FormControl>
  )
}