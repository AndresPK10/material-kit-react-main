import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {GetMaximoValorByVariableDispostivo} from '../../actions/LecturaSensorAction'
import {getVariableByName} from '../../actions/VariableAction';
import { useEffect, useState } from 'react';
import BrokenImageRoundedIcon from '@mui/icons-material/BrokenImageRounded';

const TotalCustomers = (props) =>{ 
  const [variable, setvariable] = useState({
    id_Variable : '',
    nombre: ''
  });
  const [valorLumbral, setValorLumbral] = useState({
    valorPromedio : 0,
    valorMinimo : 0,
    valorMaximo : 0
  });
  useEffect(()=>{
    GetValorMostrar()
  },props.IdDispostivo);

  useEffect(()=> {
    GetVariableByName()
  },[]);

  function GetVariableByName(){
    getVariableByName("PH Plantas").then(result  =>{
      setvariable(result.data);
    })
  }

  function GetValorMostrar(){

    let request = {
      IdDispositivo : typeof(props.props.IdDispostivo) == "undefined" ? '' : props.props.IdDispostivo,
      IdVariable: variable.id_Variable
    }
    GetMaximoValorByVariableDispostivo(request).then(
      result => {
        setValorLumbral(result.data);
      }
    )
  }

  return(
  <Card 
  sx={{ height: '100%' }} 
  {...props.props.Medida}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {variable.nombre}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {valorLumbral.valorPromedio}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Grid>
            <Grid item xs={12} lg={12}>
              <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
              >
                Min {valorLumbral.valorMinimo}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography
                          color="textSecondary"
                          gutterBottom
                          variant="overline"
              >
                Max {valorLumbral.valorMaximo}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <BrokenImageRoundedIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)};

export default TotalCustomers;