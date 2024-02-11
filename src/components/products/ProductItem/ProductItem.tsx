import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import placeholder from '@/assets/images/placeholder.png';
import { apiURL } from '@/constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  title: string;
  price: number;
  id: string;
  image: string | null;
  category: string;
}

const ProductItem: React.FC<Props> = ({title, price, id, image, category}) => {
  let cardImage = placeholder.src;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <strong>
            Price: {price} KGS
          </strong>
        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;