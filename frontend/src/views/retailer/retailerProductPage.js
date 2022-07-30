import { useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import useAxios from '../../utils/useAxios';
import './retailerDashboard.css';
import { useParams } from 'react-router-dom';
import './retailerProductPage.css';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import '../customer/customerItemDescription.css';
import { Button } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledDiv = styled('div')(() => ({
  marginTop: 40,
  marginLeft: 50,
  color: '#fff',
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

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

export default function RetailerProduct() {
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = React.useState({});
  const [issuedItems, setIssuedItems] = React.useState([]);
  const [UnissuedItems, setUnissuedItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const api = useAxios();

  const searchInputHandler = async (e) => {
    const value = e.target.value;

    const items = product.items;
    const issued_items = items.filter((item) => item.owner !== null);
    const unissued_items = items.filter((item) => item.owner === null);
    const search_issued_items = issued_items.filter((item) =>
      item.serial_no.toLowerCase().includes(value.toLowerCase())
    );
    const search_unissued_items = unissued_items.filter((item) =>
      item.serial_no.toLowerCase().includes(value.toLowerCase())
    );
    setIssuedItems(search_issued_items);
    setUnissuedItems(search_unissued_items);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    const { data } = await api.get(`/products/${params.id}`);
    setProduct(data);
    // filter for issued items
    const issuedItems = data.items.filter((item) => item.owner !== null);
    setIssuedItems(issuedItems);
    // filter for unissued items
    const unissuedItems = data.items.filter((item) => item.owner === null);
    setUnissuedItems(unissuedItems);
  };

  function UnIssuedItemRows(props) {
    const { items } = props;
    if (items.length === 0) {
      return (
        <React.Fragment>
          <React.Fragment>
            <Grid item xs={10}>
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  className="issued-products-body"
                  align="center"
                >
                  NO ITEMS
                </Typography>
              </Box>
            </Grid>
          </React.Fragment>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {UnissuedItems.map((item, index) => {
          return (
            <Grid item xs={10} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  className: 'table_row',
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                }}
              >
                <Box sx={{ width: '40%' }}>
                  <Typography>{item.serial_no}</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Typography>{item.warranty_period}</Typography>
                </Box>
                <Box
                  sx={{ width: '40%', alignItems: 'center', display: 'flex' }}
                >
                  <Box>
                    <Button
                      className="nav-button"
                      variant="outlined"
                      color="success"
                      onClick={handleOpen}
                    >
                      <Typography
                        component="span"
                        level="body1"
                        className="nav-button-text"
                      >
                        Issue to Customer
                      </Typography>
                    </Button>
                    
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  function IssuedItemRows(props) {
    const { items } = props;
    if (items.length === 0) {
      return (
        <React.Fragment>
          <Grid item xs={10}>
            <Box sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className="issued-products-body"
                align="center"
              >
                NO ITEMS
              </Typography>
            </Box>
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {items.map((item, index) => {
          return (
            <Grid item xs={10} key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  className: 'table_row',
                }}
              >
                <Box sx={{ width: '40%' }}>
                  <Typography>{item.serial_no}</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Typography>{item.warranty_period}</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Typography>{item.owner}</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Box>
                    <Button
                      className="nav-button"
                      variant="outlined"
                      color="success"
                    >
                      <Typography
                        component="span"
                        level="body1"
                        className="nav-button-text"
                      >
                        View Warranty Card
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }



  useEffect(() => {
    fetchData();
    console.log(product);
    console.log(issuedItems);
    console.log(UnissuedItems);
  }, []); // eslint-disable-line
  return (
    <StyledDiv>
      <div>
      <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Issue to Customer</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To Issue to User please Enter the customer name and phone number
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="phone"
                          label="Phone Number"
                          type="number"
                          fullWidth
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="Name"
                          label="Customer Name"
                          type="text"
                          fullWidth
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Issue</Button>
                      </DialogActions>
      </Dialog>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography className="product_name">{product.name}</Typography>
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
                <Img src={product.image} alt="product_img" />
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
                    <span className="fields">Category - </span>{' '}
                    {product.category}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{ fontSize: '1.3rem', color: 'rgb(200, 200, 200)' }}
                  >
                    <span className="fields">Description - </span>{' '}
                    {product.product_data}
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box sx={{ width: '100%' }}>
        <Grid
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Grid>
            <Tabs
              textColor="#A4A9AF"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={<span style={{ color: '#A4A9AF' }}>Unissued Items</span>}
                {...a11yProps(0)}
              />
              <Tab
                label={<span style={{ color: '#A4A9AF' }}>Issued Items</span>}
                {...a11yProps(1)}
              />
            </Tabs>
          </Grid>
          <Grid
            columns={{ xs: 12 }}
            sx={{
              marginLeft: { xs: 1, md: 10 },
              marginBottom: 1,
              width: { xs: '80%', md: '50%' },
            }}
          >
            <StyledTextField
              sx={{ marginTop: { xs: 5, md: 0 } }}
              fullWidth
              textColor="#A4A9AF"
              variant="outlined"
              label="Search"
              onChange={searchInputHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlined sx={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {/* table headings as box headings */}
              <Grid item xs={10}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    color: 'white',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  <Box sx={{ width: '40%' }}>
                    <Typography>Serial No</Typography>
                  </Box>
                  <Box sx={{ width: '20%' }}>
                    <Typography>Warranty Period</Typography>
                  </Box>
                  <Box sx={{ width: '40%' }}>
                    <Typography>Action</Typography>
                  </Box>
                </Box>
              </Grid>
              {/* table body */}
              <UnIssuedItemRows items={UnissuedItems} />
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {/* table headings as box headings */}
              <Grid item xs={10}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 1,
                    color: 'white',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  <Box sx={{ width: '20%' }}>
                    <Typography>Serial No</Typography>
                  </Box>
                  <Box sx={{ width: '30%' }}>
                    <Typography>Warranty Period</Typography>
                  </Box>
                  <Box sx={{ width: '20%' }}>
                    <Typography>Owner</Typography>
                  </Box>
                  <Box sx={{ width: '20%' }}>
                    <Typography>Action</Typography>
                  </Box>
                </Box>
              </Grid>
              {/* table body */}
              <IssuedItemRows items={issuedItems} />
            </Grid>
          </Box>
        </TabPanel>
      </Box>
    </StyledDiv>
  );
}
