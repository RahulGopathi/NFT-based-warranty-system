import { styled } from '@mui/material/styles';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';

const StyledDiv = styled('div')(() => ({
  marginTop: 40,
  marginLeft: 50,
}));

export default function RetailerDashboard() {

  const [value, setValue] = React.useState('1');
    return (
        <StyledDiv>
          <h1>Retailer Dashboard</h1>
        </StyledDiv>
    );
  }

  