import React from 'react';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

interface Props {
  title: string;
  price: number;
  id: string;
}

const ProductItem: React.FC<Props> = ({title, price, id}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardHeader title={title}/>
        <CardContent>
          <strong>
            Price: {price} KGS
          </strong>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductItem;