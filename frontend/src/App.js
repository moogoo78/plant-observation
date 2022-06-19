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
import EventSummary from './EventSummary';
const OptionContext = React.createContext();

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

function getStepContent(state, dispatch) {
  // console.log(state);
  switch (state.step) {
    case 0:
    return <EventForm dispatch={dispatch} data={state.data} />;
    case 1:
    return <ObservationForm dispatch={dispatch} data={state.data} />;
    case 2:
    return <EventSummary dispatch={dispatch} data={state.data} />;
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
  data: {
    date: null,
    project: null,
    location: null,
    principal: null,
    observations: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
  case 'setStep':
    return {
      ...state,
      step: action.value
    };
  case 'setOptions':
    return {
      ...state,
      options: action.value,
      isLoading: false,
    }
  case 'setData':
    console.log(action, 'setdata');
    return {
      ...state,
      data: {
        ...state.data,
        [action.name]: action.value,
      }
    }
  default:
    throw new Error();
  }
}

const AppContent = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    console.log();
    let url = `${process.env.API_PREFIX}event-options`;
    // console.log(url);
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data);
        dispatch({type: 'setOptions', value: data});
        console.log('🐣', data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  const postData = (data) => {
    let url = `${process.env.API_PREFIX}observations`;
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
       body: JSON.stringify(data),
     }).then((resp) => {
       if (!resp.ok) {
         console.error(resp.status);
       }
       return resp.json()
     }).catch((error) => {
       console.error(error.message);
     });
  };
  console.log((state.options === null) ? '🥚': '🐔', state);
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
                  Thank you.
                </Typography>
                <Typography variant="subtitle1">
                  aaaa
                </Typography>
              </React.Fragment>
            ) : (
                <OptionContext.Provider value={state.options}>
                  {getStepContent(state, dispatch)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {state.step !== 0 && (
                    <Button onClick={() => dispatch({type:'setStep', value: state.step-1})} sx={{ mt: 3, ml: 1 }}>
                      回上一步
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => {
                      dispatch({type:'setStep', value: state.step+1});
                      if (state.step == steps.length - 1 ) {
                        postData(state.data);
                      }
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {state.step === steps.length - 1 ? '送出' : '下一步'}
                  </Button>
                </Box>
              </OptionContext.Provider>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
     </Container>
     }
    </>
  );
}

const App = () => {
  return (
    <AppWrapper>
      <AppContent />
    </AppWrapper>
  )
}
export {App, OptionContext}
