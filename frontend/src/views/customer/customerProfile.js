import { useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import '../customer/customerProfile.css';
import { Button } from '../../components/Button';
import TextField from '@mui/material/TextField';
import { WalletContext } from '../../contexts/WalletContext';

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

export default function CustomerProfile() {
  const [label, setLabel] = useState('');
  const { customer } = useContext(WalletContext);

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <div>
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography className="product_name">Profile</Typography>
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
          <Box className="profile">
            <Grid item xs>
              <Box sx={{ margin: 2 }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                >
                  <span>Name</span>
                </Typography>
                <div className="text-field">
                  <StyledTextField
                    fullWidth
                    size="small"
                    value={customer.name || ' '}
                    onChange={handleChange}
                    label={label === '' ? ' ' : ' '}
                    InputLabelProps={{ shrink: false }}
                    textColor="#A4A9AF"
                    variant="outlined"
                    sx={{ color: 'white' }}
                  />
                </div>
              </Box>
              <Box sx={{ margin: 2 }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                >
                  <span>Mobile no.</span>
                </Typography>
                <div className="text-field">
                  <StyledTextField
                    fullWidth
                    type="number"
                    size="small"
                    value={customer.phno || ' '}
                    onChange={handleChange}
                    label={label === '' ? ' ' : ' '}
                    InputLabelProps={{ shrink: false }}
                    textColor="#A4A9AF"
                    variant="outlined"
                    defaultValue="9030406785"
                    sx={{ color: 'white' }}
                  />
                </div>
              </Box>
              <Box sx={{ margin: 2 }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                >
                  <span>Wallet Address</span>
                </Typography>
                <div className="text-field">
                  <StyledTextField
                    fullWidth
                    size="small"
                    value={customer.wallet_address || ' '}
                    onChange={handleChange}
                    label={label === '' ? ' ' : ' '}
                    InputLabelProps={{ shrink: false }}
                    textColor="#A4A9AF"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    defaultValue="0x61543ABF468e38CfC2D574920c9fc4E563c1Db33"
                    sx={{ color: 'white' }}
                  />
                </div>
              </Box>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 3,
            }}
          >
            <Button
              className="btns"
              buttonStyle="btn--primary"
              buttonSize="btn--large"
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
