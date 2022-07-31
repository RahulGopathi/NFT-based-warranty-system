import * as React from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';
// import { Link } from 'react-router-dom';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import '../customer/customerItemDescription.css';
import { Button } from '../../components/Button';
import Otpinput from '../../components/otpInput';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
// import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { API_BASE_URL, BASE_URL, firebaseConfig } from '../../config';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ClaimItemDescription() {
  let { order_id } = useParams();
  const [captchaRendered, setCaptchaRendered] = useState(false);
  const [item, setItem] = useState([]);
  const [itemStatus, setItemStatus] = useState('Loading...');
  const [inputOTP, setInputOTP] = useState('');
  const [dialogStatusText, setDialogStatusText] = useState('');
  const [open, setOpen] = React.useState(false);
  let query = useQuery();

  const getInputData = (input) => {
    const otp =
      input.input1 +
      input.input2 +
      input.input3 +
      input.input4 +
      input.input5 +
      input.input6;
    setInputOTP(otp);
    console.log(otp);
  };

  const handleClickOpen = () => {
    setOpen(true);
    const phoneNumber = '+91' + item.phno;
    const appVerifier = window.recaptchaVerifier;

    console.log('sending OTP to ' + phoneNumber);
    setDialogStatusText('Sending OTP to ' + phoneNumber);

    appVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setDialogStatusText('');
      })
      .catch((error) => {
        setDialogStatusText('An error occurred while sending OTP');
        console.log(error);
      });
  };

  const handleCloseOtp = () => {
    setOpen(false);
  };

  const completeOrder = async () => {
    const response = await axios.get(API_BASE_URL + '/orders/claim_order/', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        order_id: order_id,
      },
    });
    const data = await response.data;
    if (response.status === 200) {
      setDialogStatusText('Transferring NFT...');
    } else {
      setDialogStatusText(data[Object.keys(data)[0]]);
    }
  };
  const handleClaim = () => {
    if (inputOTP) {
      const code = inputOTP;
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          setDialogStatusText('Loading...');
          completeOrder();
        })
        .catch((error) => {
          setDialogStatusText('The OTP entered is incorrect, please try again');
        });
    } else {
      setDialogStatusText('Invalid OTP entered');
    }
  };

  useEffect(() => {
    fetchItem();

    if (!captchaRendered) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
      setCaptchaRendered(true);
    }

    if (query.get('setOpen') === 'true') {
      setOpen(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItem = async () => {
    try {
      const response = await fetch(
        API_BASE_URL + '/orders/get_order/?order_id=' + order_id,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setItem(data);
      } else {
        setItemStatus(data[Object.keys(data)[0]]);
      }
    } catch (e) {
      setItemStatus('An Error Occurred! please try again later.');
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {item.item_data ? (
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography className="product_name">
              {item.item_data.product.name}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              margin: 'auto',
              height: '100%',
              width: '90vw',
              flexGrow: 1,
              backgroundColor: 'transparent',
              color: 'white',
            }}
          >
            <Grid container spacing={2}>
              <Card
                variant="outlined"
                sx={{ minWidth: '10%', width: 300, height: 190, mt: 3 }}
              >
                <AspectRatio minHeight="120px" maxHeight="200px">
                  <Img
                    src={BASE_URL + item.item_data.warranty_image}
                    alt="product_img"
                  />
                </AspectRatio>
              </Card>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Serial Number - </span>{' '}
                      {item.item_data.serial_no}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Retailer - </span>{' '}
                      {item.item_data.product.retailer_name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Description - </span>{' '}
                      {item.item_data.product.product_data}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Warranty Period - </span>{' '}
                      {item.item_data.product.warranty_period} months
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Warranty Status - </span> Expires
                      on {item.item_data.warranty_end_date}
                    </Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 1,
              }}
            >
              <Button
                className="btns"
                buttonStyle="btn--primary"
                buttonSize="btn--large"
                onClick={handleClickOpen}
              >
                Claim
              </Button>

              {/* <<<<<<<< OTP Input Dialog Box >>>>>>>> */}

              <Dialog
                open={open}
                onClose={handleClaim}
                className="dialog"
                PaperProps={{
                  style: {
                    backgroundColor: '#0a1929',
                    color: '#fff',
                    border: 0.1,
                    borderColor: '#A4A9AF',
                    borderStyle: 'solid',
                  },
                }}
              >
                <DialogTitle sx={{ margin: 'auto', fontSize: 25 }}>
                  {dialogStatusText ? '' : 'Enter OTP'}
                </DialogTitle>
                <DialogContent sx={{ pb: 0 }}>
                  <DialogContentText sx={{ color: '#A4A9AF' }}>
                    {dialogStatusText ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography sx={{ fontSize: '1.2rem' }}>
                          {dialogStatusText}
                        </Typography>
                      </Box>
                    ) : (
                      <div>
                        Enter the OTP sent to the Mobile Number ending with{' '}
                        <b>XXXXXX{String(item.phno).slice(-4)}.</b>
                      </div>
                    )}
                  </DialogContentText>
                  {!dialogStatusText && (
                    <Otpinput getInputData={getInputData} />
                  )}
                </DialogContent>
                <DialogActions>
                  {dialogStatusText ? (
                    <Button onClick={handleCloseOtp}>Close</Button>
                  ) : (
                    <Button onClick={handleClaim}>Claim</Button>
                  )}
                </DialogActions>
              </Dialog>

              {/* <<<<<<<< Dialog Box Ends >>>>>>>> */}
            </Box>
          </Box>
        </div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '30vh' }}>
          <Typography
            variant="h5"
            sx={{ position: 'relative', top: '50%', color: '#A4A9AF' }}
          >
            {itemStatus}
          </Typography>
        </Box>
      )}
    </div>
  );
}
