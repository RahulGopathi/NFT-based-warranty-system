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

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  let { id } = useParams();
  const [item, setItem] = useState([]);
  const [itemStatus, setItemStatus] = useState('No such Item');
  const [product, setProduct] = useState([]);
  const [productStatus, setProductStatus] = useState('No such Product');
  const api = useAxios();

  useEffect(() => {
    fetchItem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchItem = async () => {
    try {
      const response = await api.get('/items/' + id);
      console.log(response.data);
      if (response.status === 200) {
        setItem(response.data);
        fetchProduct(response.data.product);
      }
    } catch (e) {
      setItemStatus('An Error Occurred! please try again later.');
    }
  };

  const fetchProduct = async (product_id) => {
    try {
      const response = await api.get('/products/' + product_id);
      console.log(response.data);
      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (e) {
      setProductStatus('An Error Occurred! please try again later.');
    }
  };

  return (
    <div>
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
                  {product.retailer_name}
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
                  <span className="fields">Warranty Status - </span> Expires on{' '}
                  {item.warranty_end_date}
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
          >
            Transfer
          </Button>
        </Box>
      </Box>
    </div>
  );
}
