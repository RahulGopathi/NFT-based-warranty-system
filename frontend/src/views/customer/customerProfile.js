import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
// import ButtonBase from '@mui/material/ButtonBase';
// import { Link } from 'react-router-dom';
// import Card from '@mui/joy/Card';
// import AspectRatio from '@mui/joy/AspectRatio';
import '../customer/customerItemDescription.css';
import { Button } from '../../components/Button';
// import { useParams } from 'react-router';
// import { useState, useEffect } from 'react';
// import useAxios from '../../utils/useAxios';
import TextField from '@mui/material/TextField';

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
    const [label, setLabel] = React.useState("");

    const handleChange = event => {
        setLabel(event.target.value);
    };
//   let { id } = useParams();
//   const [item, setItem] = useState([]);
//   const [itemStatus, setItemStatus] = useState('Loading...');
//   const api = useAxios();

//   useEffect(() => {
//     fetchItem();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const fetchItem = async () => {
//     try {
//       const response = await api.get('/items/' + id);
//       console.log(response.data);
//       if (response.status === 200) {
//         setItem(response.data);
//       }
//     } catch (e) {
//       setItemStatus('An Error Occurred! please try again later.');
//     }
//   };

  return (
    <div>
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography className="product_name">
              Profile
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
            <Box className='profile'>
                <Grid item xs>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                        <span>Name</span>
                    </Typography>
                    <div className='text-field'>
                        <StyledTextField fullWidth size="small" onChange={handleChange} label={label=== "" ? " ": " "} InputLabelProps={{shrink: false}} textColor="#A4A9AF" variant="outlined" defaultValue="User Name" sx={{ color: 'white' }}/>
                    </div>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                        <span>Mobile no.</span>
                    </Typography>
                    <div className='text-field'>
                        <StyledTextField fullWidth size="small" onChange={handleChange} label={label=== "" ? " ": " "} InputLabelProps={{shrink: false}} textColor="#A4A9AF" variant="outlined" defaultValue="9030406785" sx={{ color: 'white' }}/>
                    </div>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                    >
                        <span>Wallet Address</span>
                    </Typography>
                    <div className='text-field'>
                        <StyledTextField fullWidth size="small" onChange={handleChange} label={label=== "" ? " ": " "} InputLabelProps={{shrink: false}} textColor="#A4A9AF" variant="outlined" InputProps={{ readOnly: true, }} defaultValue="0x61543ABF468e38CfC2D574920c9fc4E563c1Db33" sx={{ color: 'white' }}/>
                    </div>
                </Grid>
            </Box>
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
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </div>
    </div>
  );
}
