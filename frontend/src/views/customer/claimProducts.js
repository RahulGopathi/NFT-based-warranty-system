import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import { Button as CustomButton } from '../../components/Button';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/material/Grid';
import CardOverflow from '@mui/joy/CardOverflow';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import useCustomerAxios from '../../utils/useCustomerAxios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { WalletContext } from '../../contexts/WalletContext';
import { BASE_URL } from '../../config';

const StyledDiv = styled('div')(() => ({
  color: '#fff',
}));

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

export default function CustomerClaim() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemsStatus, setItemsStatus] = useState('No Items');
  const api = useCustomerAxios();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [label, setLabel] = useState('');
  const { customer } = useContext(WalletContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirectItem = (id) => {
    navigate('/customer/claim/order/' + id);
  };

  useEffect(() => {
    fetchItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItems = async () => {
    try {
      const response = await api.get('/orders/?phno=' + customer.phno);
      console.log(response.data);
      console.log(customer.phno);
      if (response.status === 200) {
        setItems(response.data);
      }
    } catch (e) {
      setItemsStatus('An Error Occurred! please try again later.');
    }
  };

  return (
    <StyledDiv
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingX: 5,
      }}
    >
      {items.length === 0 ? (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '3rem' }}>
              Claim your Products
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              position: 'relative',
              top: '50%',
              color: '#A4A9AF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '25vh',
            }}
          >
            {itemsStatus}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '3rem' }}>
              Claim your Products
            </Typography>
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={3}>
              <Card
                variant="outlined"
                sx={{ minWidth: '10%', width: '100%', mt: 3, pb: 7 }}
                onClick={handleClickOpen}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontSize="md"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    Claim Other Product?
                  </Typography>
                </Box>
                <AspectRatio
                  minHeight="120px"
                  maxHeight="200px"
                  sx={{ mt: 4, mb: 0 }}
                >
                  <AddCircleIcon fontSize="large"></AddCircleIcon>
                </AspectRatio>
              </Card>
            </Grid>
            {Array.from(items).map((item, index) => (
              <Grid item xs={4} sm={4} md={3} key={index}>
                <Card
                  variant="outlined"
                  sx={{ minWidth: '10%', width: '100%', mt: 3 }}
                >
                  <Box
                    onClick={() => {
                      redirectItem(item.order_id);
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontSize="md"
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {item.item_data.product.name}
                      </Typography>
                    </Box>
                    <AspectRatio
                      minHeight="120px"
                      maxHeight="200px"
                      sx={{ my: 2 }}
                    >
                      <img
                        src={BASE_URL + item.item_data.warranty_image}
                        alt="product_img"
                      />
                    </AspectRatio>
                  </Box>
                  <CardOverflow
                    variant="soft"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 1.5,
                      py: 1.5,
                      px: 'var(--Card-padding)',
                      borderTop: '1px solid',
                      borderColor: 'neutral.outlinedBorder',
                      bgcolor: 'background.level1',
                    }}
                  >
                    <Link
                      to={
                        '/customer/claim/order/' +
                        item.order_id +
                        '?setOpen=true'
                      }
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        color: 'white',
                        width: '100%',
                      }}
                    >
                      <Box>
                        <Button
                          variant="solid"
                          size="sm"
                          color="primary"
                          sx={{ ml: 'auto', fontWeight: 600 }}
                        >
                          Claim
                        </Button>
                      </Box>
                    </Link>
                  </CardOverflow>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* <<<<<<< Serial Number Input Dialog >>>>>>>> */}

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
              Claim
            </DialogTitle>
            <DialogContent sx={{ pb: 0 }}>
              <DialogContentText sx={{ color: '#A4A9AF' }}>
                Enter the Serial no. of the product you want to claim
              </DialogContentText>
              <div>
                <StyledTextField
                  fullWidth
                  type="text"
                  size="small"
                  label={label === '' ? ' ' : ' '}
                  InputLabelProps={{ shrink: false }}
                  textColor="#A4A9AF"
                  variant="outlined"
                  sx={{ color: 'white', mt: 2 }}
                />
              </div>
            </DialogContent>
            <DialogActions className="dialog-btns">
              <CustomButton onClick={handleClose} className="left-btn">
                Cancel
              </CustomButton>
              <CustomButton onClick={handleClose} className="right-btn">
                Claim
              </CustomButton>
            </DialogActions>
          </Dialog>

          {/* <<<<<<< End Dialog >>>>>>>> */}
        </Box>
      )}
    </StyledDiv>
  );
}
