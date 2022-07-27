import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/material/Grid';
import CardOverflow from '@mui/joy/CardOverflow';
import { useNavigate } from 'react-router-dom';

const StyledDiv = styled('div')(() => ({
  color: '#fff',
}));

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const redirectItem = () => {
    navigate('/customer-item-description');
  };

  return (
    <StyledDiv
     sx={{
      display: 'flex',
      justifyContent: 'center',
      paddingX: 5,
    }}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '3rem' }}>My Products</Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
            <Grid item xs={4} sm={4} md={3} key={1}>
              <Card
                variant="outlined"
                sx={{ minWidth: '10%', width: '100%', mt: 3 }}
                onClick={redirectItem}
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
                    product_name
                  </Typography>
                </Box>
                <AspectRatio
                  minHeight="120px"
                  maxHeight="200px"
                  sx={{ my: 2 }}
                >
                  <img src='https://m.media-amazon.com/images/I/61AwGDDZd3L._SX522_.jpg' alt="product_img" />
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
                        Transfer
                      </Button>
                    </Box>
                  </Link>
                </CardOverflow>
              </Card>
            </Grid>
        </Grid>
      </Box>
    </StyledDiv>
  );
}