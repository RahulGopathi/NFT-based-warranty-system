import { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, InputAdornment, Tab, Tabs, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const StyledDiv = styled('div')(() => ({
  marginTop: 40,
  marginLeft: 50,
  color: '#fff',
}));

const StyledTextField = styled(TextField)({
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <StyledDiv>
      <Box sx={{ width: '60%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs textColor="#A4A9AF" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="My Products" {...a11yProps(0)} />
            <Tab label="Issued Items" {...a11yProps(1)} />
            <Tab label="Search Products" {...a11yProps(2)} component={() => (<StyledTextField sx={{ marginLeft: 10, marginBottom: 1 }} fullWidth variant="outlined" InputProps={{
              endAdornment: <InputAdornment position="end"><SearchOutlinedIcon sx={{ color: 'white' }} /></InputAdornment>,
            }} />)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </StyledDiv >
  );
}

