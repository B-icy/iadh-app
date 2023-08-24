"use client"

import * as React from 'react';
import { useRef, useEffect, useState, Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AllCards from './getEmployeeCards';
import BasicCard from './employeeCard';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const nameRef = useRef('')
  const salaryRef = useRef('')
  const positionRef = useRef('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    fetch("/api/addUser", {
      method: "POST",
      body: JSON.stringify({
        "name": nameRef.current.value,
        "salary": salaryRef.current.value,
        "position": positionRef.current.value,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
        window.location.reload();
    }).catch((e) => console.log(e))

    //const card = document.createElement("div");
    //card.setAttribute("class", "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-fzkmmq-MuiPaper-root-MuiCard-root")
    //card.innerHTML = '<div class="MuiCardContent-root css-46bh2p-MuiCardContent-root"><div class="MuiTypography-root MuiTypography-h5 css-ag7rrr-MuiTypography-root">' + nameRef.current.value + '</div><p class="MuiTypography-root MuiTypography-body1 css-9eg9l8-MuiTypography-root">' + positionRef.current.value + '</p><p class="MuiTypography-root MuiTypography-body2 css-e784if-MuiTypography-root"># of Days Worked: 26 </p><p class="MuiTypography-root MuiTypography-body2 css-e784if-MuiTypography-root">Salary: DT ' + salaryRef.current.value +'</p></div>';
    //document.getElementById("allCards")?.appendChild(card)

    setOpen(false);
  };

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/getUsers')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  var cards = <AllCards data= { data } />

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="name"
            fullWidth
            variant="standard"
            inputRef={nameRef}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Position"
            defaultValue="Employee"
            type="name"
            fullWidth
            variant="standard"
            inputRef={positionRef}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="salary"
            label="Base Salary (Day)"
            type="number"
            fullWidth
            variant="standard"
            inputRef={salaryRef}
          />
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    
      { cards }

    </div>
  );
}
