import * as React from 'react';
import { useRef, useEffect, useState, Component } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import rates from 'public/rates.json';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const nameRef = useRef('')
  const salaryRef = useRef('')
  const positionRef = useRef('')
  const daysWorkedRef = useRef('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    fetch("/api/removeUser", {
      method: "POST",
      body: JSON.stringify({
        "id": props.uid
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      window.location.reload();
    }).catch((e) => console.log(e))

    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleConfirmEdit = () => {
    fetch("/api/editUser", {
      method: "POST",
      body: JSON.stringify({
        "name": nameRef.current.value,
        "salary": salaryRef.current.value,
        "position": positionRef.current.value,
        "id": props.uid,
        "daysWorked": daysWorkedRef.current.value,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
        window.location.reload();
    }).catch((e) => console.log(e))

    setOpenEdit(false);
  };

  return (
    <main>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you'd like to delete {props.name}?</DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            defaultValue={props.name}
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
            defaultValue={props.position}
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
            defaultValue={props.salary}
            type="number"
            fullWidth
            variant="standard"
            inputRef={salaryRef}
          />
        </DialogContent>

        <DialogContent>
          <TextField
            margin="dense"
            id="salary"
            label="# of Days Worked"
            defaultValue={props.daysWorked}
            type="number"
            fullWidth
            variant="standard"
            inputRef={daysWorkedRef}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleConfirmEdit}>Confirm</Button>
        </DialogActions>
      </Dialog>


    <Card sx={{ width: 300, height: 200, m: 1 }}>
    <Fab 
        size="small" 
        onClick={handleClickOpen} 
        sx={{ position: "relative", float: "right", margin: 0.5, boxShadow: 1 }}>
        <DeleteIcon/>
      </Fab>
      <Fab 
        size="small" 
        onClick={handleClickOpenEdit} 
        sx={{ position: "relative", float: "right", margin: 0.5, boxShadow: 1 }}>
        <EditIcon/>
      </Fab>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.position}
        </Typography>
        <Typography variant="body2">
          # of Days Worked: {props.daysWorked}
        </Typography>
        <Typography variant="body2">
          Per Day Pay: DT {props.salary}
        </Typography>
        <Typography variant="body2">
          Monthly Salary: DT {props.salary * props.daysWorked}
        </Typography>
        <Typography variant="body2">
          Monthly Net Pay: DT {props.salary * props.daysWorked * Number(rates.taxRate)}
        </Typography>
      </CardContent>
    </Card>
    </main>
  );
}
