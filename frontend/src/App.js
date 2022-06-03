import React from 'react';
import {
  CssBaseline,
  AppBar,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
// import {
//   AdapterDateFns,
//   LocalizationProvider
// } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { zhTW } from 'date-fns/locale';
import EventForm from './EventForm';
import ObservationForm from './ObservationForm';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
s      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['新增事件', '調查記錄', '確認'];

function getStepContent(state) {
  // console.log(state);
  switch (state.step) {
    case 0:
    return <EventForm options={state.options} />;
    case 1:
    return <ObservationForm />;
    case 2:
    return null;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

const AppWrapper = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhTW}>
        <CssBaseline />
        <AppContent />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
const initialState = {
  step: 0,
  options: null,
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
  case 'setStep':
    return {
      ...state,
      step: action.value
    };
  case 'setOptions':
    console.log(action.value);
    return {
      ...state,
      options: action.value,
      isLoading: false,
    }
  default:
    throw new Error();
  }
}

const AppContent = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const host = 'http://127.0.0.1:8000';
    let url = `${host}/api/v1/event-options`;
    console.log(url);
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data);
        dispatch({type: 'setOptions', value: data});
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SOW
          </Typography>
        </Toolbar>
      </AppBar>
    {state.isLoading === true ? <>loading</> : 
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Plant Observation
          </Typography>
          <Stepper activeStep={state.step} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {state.step === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(state)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {state.step !== 0 && (
                    <Button onClick={() => dispatch({type:'setStep', value: state.step-1})} sx={{ mt: 3, ml: 1 }}>
                      回上一步
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => dispatch({type:'setStep', value: state.step+1})}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {state.step === steps.length - 1 ? '送出' : '下一步'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
     </Container>
     }
    </>
  );
}

export default function App() {
  return (
    <AppWrapper>
      <AppContent />
    </AppWrapper>
  )
}
