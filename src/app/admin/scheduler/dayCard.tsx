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

export default function DayCard(props) {
  return (
    <main>
    <Card sx={{ width: 350, height: 400, m: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {props.day}
        </Typography>
        <Card sx={{ padding: .1 }}>
            <CardContent sx={{ padding: 0.5,'&:last-child': { pb: 0.5 }, }}>
                <Typography>
                    Beshir Aissi
                </Typography>
            </CardContent>
        </Card>
      </CardContent>
    </Card>
    </main>
  );
}
