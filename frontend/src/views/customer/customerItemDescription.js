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
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import useAxios from '../../utils/useAxios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#000',
  },
  '& .MuiInputBase-root': {
    color: '#A4A9AF',
  },
  '& label': {
    color: '#000',
  },
  '& label.Mui-focused': {
    color: '#000',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#B0B9C2',
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
    },
  },
});

export default function ComplexGrid() {
  let { id } = useParams();
  const [item, setItem] = useState([]);
  const [itemStatus, setItemStatus] = useState('Loading...');
  const api = useAxios();
  const [open, setOpen] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);
  const [label, setLabel] = React.useState('');

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenLink = () => {
    setOpenLink(true);
    setOpen(false);
  };

  const handleCloseLink = () => {
    setOpenLink(false);
  };

  useEffect(() => {
    fetchItem();
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
                marginTop: 5,
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
              <Dialog open={open} onClose={handleClose} className="dialog-1">
                <DialogTitle sx={{margin: 'auto', fontSize: 25 }}>Transfer</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the Mobile no. of the person you want to transfer the product to
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Mobile Number"
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClickOpenLink}>Transfer</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={openLink} onClose={handleCloseLink} className="dialog-2">
                <DialogContent>
                  <DialogContentText>
                    Copy and Share this unique transfer link
                  </DialogContentText>
                  <div className="text-field">
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
                      sx={{ color: 'white', mt: 1 }}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseLink}>Cancel</Button>
                  <Button onClick={handleCloseLink}>Copy</Button>
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
