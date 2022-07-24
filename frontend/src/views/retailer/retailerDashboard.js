<<<<<<< HEAD
import { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
=======
import { useState } from 'react';
>>>>>>> main
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/material/Grid';
import CardOverflow from '@mui/joy/CardOverflow';
=======
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import AspectRatio from '@mui/joy/AspectRatio';
>>>>>>> main

const StyledDiv = styled('div')(() => ({
  marginTop: 40,
  marginLeft: 50,
  color: '#fff',
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: '#00AB55',
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
      borderColor: '#00AB55',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RetailerDashboard() {
  const [value, setValue] = useState(0);
<<<<<<< HEAD
  const [data, setData] = useState('');
  const api = useAxios();
=======
>>>>>>> main

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

<<<<<<< HEAD
  const calculateDateDifference = (date) => {
    const now = new Date().getDate();
    const then = new Date(date).getDate();
    const diff = now - then;
    const diffDays = Math.floor(diff);
    return diffDays;
  };

  const fetchData = async () => {
    try {
      const response = await api.get('/products');
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
      setData('Error');
    }
  };

  useEffect(() => {
    fetchData();
  });

=======
>>>>>>> main
  return (
    <StyledDiv>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            textColor="#A4A9AF"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="My Products" {...a11yProps(0)} />
            <Tab label="Issued Items" {...a11yProps(1)} />
            <Tab
              label="Search Products"
              {...a11yProps(2)}
              component={() => (
                <StyledTextField
                  sx={{ marginLeft: 10, marginBottom: 1, width: '50%' }}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlinedIcon sx={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ width: '100%' }}>
<<<<<<< HEAD
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Tabs
                scrollButtons
=======
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                scrollButtons
                centered
>>>>>>> main
                variant="scrollable"
                textColor="#A4A9AF"
                value={value}
                onChange={handleChange}
              >
                <Tab
                  label="Mobiles"
                  component={() => (
                    <Button onClick={() => setValue(0)}>
                      <Avatar
                        sx={{
                          height: 64,
                          width: 64,
                        }}
                        variant="square"
                        src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png"
                      />
                      <Typography>Mobiles</Typography>
                    </Button>
                  )}
                />
                <Tab
<<<<<<< HEAD
                  label="Laptops"
=======
                  label="Search Products"
>>>>>>> main
                  component={() => (
                    <Button onClick={() => setValue(0)}>
                      <Avatar
                        sx={{
                          height: 64,
                          width: 64,
                        }}
                        variant="square"
                        src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png"
                      />
                      <Typography sx={{ mx: 1 }}>Laptops</Typography>
                    </Button>
                  )}
                />
                <Tab
<<<<<<< HEAD
                  label="Home"
=======
                  label="Search Products"
>>>>>>> main
                  component={() => (
                    <Button onClick={() => setValue(0)}>
                      <Avatar
                        sx={{
                          height: 64,
                          width: 64,
                        }}
                        variant="square"
                        src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg"
                      />
                      <Typography sx={{ mx: 1 }}>Home</Typography>
                    </Button>
                  )}
                />
                <Tab
<<<<<<< HEAD
                  label="Appliances"
=======
                  label="Search Products"
>>>>>>> main
                  component={() => (
                    <Button onClick={() => setValue(0)}>
                      <Avatar
                        sx={{
                          height: 64,
                          width: 64,
                        }}
                        variant="square"
                        src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png"
                      />
                      <Typography sx={{ mx: 1 }}>Appliances</Typography>
                    </Button>
                  )}
                />
                <Tab
<<<<<<< HEAD
                  label="Gadgets"
=======
                  label="Search Products"
>>>>>>> main
                  component={() => (
                    <Button onClick={() => setValue(0)}>
                      <Avatar
                        sx={{
                          height: 64,
                          width: 64,
                        }}
                        variant="square"
                        src="https://rukminim1.flixcart.com/image/416/416/ktketu80/motion-controller/s/e/p/quest-2-advanced-all-in-one-vr-headset-128-gb-oculus-original-imag6wfp5kfjfgvf.jpeg?q=70"
                      />
                      <Typography sx={{ mx: 1 }}>Gadgets</Typography>
                    </Button>
                  )}
                />
              </Tabs>
<<<<<<< HEAD
            </Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(data).map((product, index) => (
                <Grid item xs={4} sm={4} md={3} key={index}>
                  <Card
                    variant="outlined"
                    sx={{ minWidth: '10%', width: '100%', mt: 3 }}
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
                        {product.name}
                      </Typography>
                      <Typography variant="caption">
                        Updated {calculateDateDifference(product.updated_at)}d
                        ago
                      </Typography>
                    </Box>
                    <AspectRatio
                      minHeight="120px"
                      maxHeight="200px"
                      sx={{ my: 2 }}
                    >
                      <img src={product.image} alt="" />
                    </AspectRatio>
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
                        to="#"
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
                            Add Item
                          </Button>
                        </Box>
                      </Link>
                    </CardOverflow>
                  </Card>
                </Grid>
              ))}
            </Grid>
=======
              <Card
                variant="outlined"
                sx={{ minWidth: '10%', width: '20%', mt: 3 }}
              >
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
                >
                  <Typography
                    level="h2"
                    fontSize="md"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Yosemite National Park
                  </Typography>
                  <Typography level="body2">
                    April 24 to May 02, 2021
                  </Typography>
                </Box>
                <IconButton
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                >
                  <BookmarkAdd />
                </IconButton>

                <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                  <img
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270"
                    alt=""
                  />
                </AspectRatio>
                <Box sx={{ display: 'flex' }}>
                  <div>
                    <Typography level="body3">Total price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      $2900
                    </Typography>
                  </div>
                  <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ ml: 'auto', fontWeight: 600 }}
                  >
                    Explore
                  </Button>
                </Box>
              </Card>
            </Box>
>>>>>>> main
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </StyledDiv>
  );
}
