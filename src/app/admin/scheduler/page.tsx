"use client"

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Typography, Fab, Box , Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AddIcon from '@mui/icons-material/Add';
import DayCard from './dayCard'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WeekPicker from './weekCalendar'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false)
    const [age, setAge] = React.useState('');
    const nameRef = useRef(null)
    const salaryRef = useRef('40')
    const startDateRef = useRef(null)
    const endDateRef = useRef(null)

    const [data, setData] = useState({})
    const [payCardData, setPayCardData] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [date, setDate] = useState()
    const [payDate, setPayDate] = useState()
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        if (nameRef.current.value == '' ||
            startDateRef.current.value == '' ||
            salaryRef.current.value == '') 
        {
            console.log('fill in req fields')
        }
        else {
            fetch("/api/addPaycard", {
                method: "POST",
                body: JSON.stringify({
                "eid": nameRef.current.value,
                "startDate": startDateRef.current.value,
                "endDate": endDateRef.current.value,
                "salary": salaryRef.current.value,
                "payDate": date,
                }),
                headers: {
                "content-type": "application/json",
            },
            }).then(() => {
                window.location.reload();
            }).catch((e) => console.log(e))
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const pullPaycard = () => {
        fetch("/api/getPaycard", {
            method: "POST",
            body: JSON.stringify({
            "date": date,
            }),
            headers: {
            "content-type": "application/json",
        },
        }).then((data) => {
            setPayCardData(data);
            console.log(payCardData)
          }).catch((e) => console.log(e))
    }

    const handleCallback = childData => {
        // Update the name in the component's state
        const weekOf = new Date(childData);
        const d = new Date(weekOf.getFullYear(), weekOf.getMonth()+1, 0)
        setPayDate(d)
        setDate(weekOf);
        setPayCardData('')
    }
   
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
    if (!date) return <WeekPicker parentCallback={handleCallback}/>

    if (payCardData == '') {
        pullPaycard()
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                {date?.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </div>
            <p>
                { String(payCardData.toString()) }
            </p>
        <div>
            <WeekPicker parentCallback={handleCallback}/>
            <Fab variant="extended" onClick={handleClickOpen}>
                <AddIcon/>
                Add Schedule
            </Fab>
            <Dialog fullWidth open={open} onClose={handleClose} maxWidth='sm'>
                <DialogTitle>Add Schedule</DialogTitle>
                <DialogContent>
                    <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                    <Select
                        sx={{ minWidth: 230 }}
                        inputRef={ nameRef }
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Employee"
                        onChange={handleChange}
                    >
                        {data['query'].map(item => (
                            <MenuItem value={item.id} key={item.id}> { item.name } </MenuItem>
                        ))}
                    </Select>
                </DialogContent>

                <DialogContent>
                    <DateTimePicker
                        id="outlined-required"
                        label="Start Time"
                        //value={value}
                        inputRef={startDateRef}
                    />
                </DialogContent>

                <DialogContent>
                <DateTimePicker
                        label="End Time"
                        //value={value}
                        inputRef={endDateRef}
                    />
                </DialogContent>

                <DialogContent>
                    <TextField
                        id="outlined-required"
                        margin="dense"
                        label="Amount to be Paid"
                        type="number"
                        fullWidth
                        variant="standard"
                        defaultValue= { 40 }
                        inputRef={ salaryRef }
                    />
                </DialogContent>


            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
            </DialogActions>
        </Dialog>
            <Box id="allCards"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        maxWidth: 1,
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}>
                <DayCard day="Sun"/>
                <DayCard day="Mon"/>
                <DayCard day="Tue"/>
                <DayCard day="Wed"/>
                <DayCard day="Thu"/>
                <DayCard day="Fri"/>
                <DayCard day="Sat"/>
            </Box>
        </div>
        </LocalizationProvider>
    );
}
