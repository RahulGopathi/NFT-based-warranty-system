import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
// import ButtonBase from '@mui/material/ButtonBase';
// import { Link } from 'react-router-dom';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import '../customer/customerItemDescription.css';
import { Button } from '../../components/Button';
import Otpinput from '../../components/otpInput';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import useCustomerAxios from '../../utils/useCustomerAxios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from "react-router-dom";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#fff',
  },
  '& .MuiInputBase-root': {
    color: '#A4A9AF',
  },
  '& label': {
    color: '#fff',
  },
  '& label.Mui-focused': {
    color: '#fff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B0B9C2',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ComplexGrid() {
  let { id } = useParams();
  const [item, setItem] = useState([]);
  const [itemStatus, setItemStatus] = useState('Loading...');
  const api = useCustomerAxios();
  const [open, setOpen] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);
  const [openOtp, setOpenOtp] = React.useState(false);
  const [label, setLabel] = React.useState('');
  let query = useQuery();

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenOtp = () => {
    setOpen(false);
    setOpenOtp(true);
  };

  const handleCloseOtp = () => {
    setOpenOtp(false);
  };

  const handleClickOpenLink = () => {
    setOpenOtp(false);
    setOpenLink(true);
  };

  const handleCloseLink = () => {
    setOpenLink(false);
  };

  useEffect(() => {
    fetchItem();
    if(query.get("setOpen") === 'true'){
      setOpen(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItem = async () => {
    try {
      const response = await api.get('/items/' + id);
      console.log(response.data);
      if (response.status === 200) {
        setItem(response.data);
      }
    } catch (e) {
      setItemStatus('An Error Occurred! please try again later.');
    }
  };

  return (
    <div>
      {item.product ? (
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography className="product_name">
              {item.product.name}
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
                  <Img src={item.warranty_image} alt="product_img" />
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
                      {item.serial_no}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Retailer - </span>{' '}
                      {item.product.retailer_name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Description - </span>{' '}
                      {item.product.product_data}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Warranty Period - </span>{' '}
                      {item.warranty_period} months
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                      <span className="fields">Warranty Status - </span> Expires
                      on {item.warranty_end_date}
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
                Transfer
              </Button>

              {/* <<<<<<<< Mobile Number Input Dialog Box >>>>>>>> */}

              <Dialog
                open={open}
                onClose={handleClose}
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
                  Transfer
                </DialogTitle>
                <DialogContent sx={{ pb: 0 }}>
                  <DialogContentText sx={{ color: '#A4A9AF' }}>
                    Enter the Mobile no. of the person you want to transfer the
                    product to
                  </DialogContentText>
                  <div>
                    <StyledTextField
                      fullWidth
                      type="tel"
                      size="small"
                      onChange={handleChange}
                      label={label === '' ? ' ' : ' '}
                      InputLabelProps={{ shrink: false }}
                      textColor="#A4A9AF"
                      variant="outlined"
                      defaultValue="9030406785"
                      sx={{ color: 'white', mt: 2 }}
                    />
                  </div>
                </DialogContent>
                <DialogActions className="dialog-btns">
                  <Button onClick={handleClose} className="left-btn">
                    Cancel
                  </Button>
                  <Button onClick={handleClickOpenOtp} className="right-btn">
                    Transfer
                  </Button>
                </DialogActions>
              </Dialog>

              {/* <<<<<<<< OTP Input Dialog Box >>>>>>>> */}

              <Dialog
                open={openOtp}
                onClose={handleCloseOtp}
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
                  Enter OTP
                </DialogTitle>
                <DialogContent sx={{ pb: 0 }}>
                  <DialogContentText sx={{ color: '#A4A9AF' }}>
                    Enter the OTP sent to your Mobile Number
                  </DialogContentText>
                  <Otpinput />
                </DialogContent>
                <DialogActions>
                  {/* <Button onClick={handleCloseOtp}>Resend OTP</Button> */}
                  <Button onClick={handleClickOpenLink}>Continue</Button>
                </DialogActions>
              </Dialog>

              {/* <<<<<<<< Transfer Link Display Dialog Box >>>>>>>> */}

              <Dialog
                open={openLink}
                onClose={handleCloseLink}
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
                  Transfer Link
                </DialogTitle>
                <DialogContent sx={{ pb: 0 }}>
                  <DialogContentText sx={{ color: '#61c97d' }}>
                    The following Transfer link has been sent to the Mobile
                    number you just entered!
                  </DialogContentText>
                  <div>
                    <StyledTextField
                      fullWidth
                      size="small"
                      onChange={handleChange}
                      label={label === '' ? ' ' : ' '}
                      InputLabelProps={{ shrink: false }}
                      textColor="#A4A9AF"
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      defaultValue="link"
                      sx={{ color: 'white', mt: 2 }}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseLink}>Close</Button>
                  <Button onClick={handleCloseLink}>Copy!</Button>
                </DialogActions>
              </Dialog>
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
