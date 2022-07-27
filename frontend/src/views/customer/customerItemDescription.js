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

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <div>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            }}
        >
            <Typography className='product_name'>Product Name</Typography>
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
                {/* <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="product_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTPk6elA9hRWkLUG7DNvhOFw9MS8Xlhi1Uw&usqp=CAU" />
                    </ButtonBase>
                </Grid> */}
                <Card
                variant="outlined"
                sx={{ minWidth: '10%', width: 300, mt: 3 }}
                >
                    <AspectRatio
                        minHeight="120px"
                        maxHeight="200px"
                    >
                        <Img src='https://m.media-amazon.com/images/I/61AwGDDZd3L._SX522_.jpg' alt="product_img" />
                    </AspectRatio>
                </Card>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontSize: '1.3rem' }}>
                                Serial Number: 
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontSize: '1.3rem' }}>
                                Retailer: 
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontSize: '1.3rem' }}>
                                Description: 
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontSize: '1.3rem' }}>
                                Warranty Status: 
                            </Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
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
                >
                    Transfer
                </Button>
            </Box>
        </Box>
    </div>
  );
}