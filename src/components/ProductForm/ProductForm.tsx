'use client';
import React, { useState } from 'react';
import { CircularProgress, Grid, TextField, MenuItem} from '@mui/material';
import { Category, ProductMutation } from '@/types';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '@/components/UI/FileInput/FileInput';
import { useQuery } from '@tanstack/react-query';
import axiosApi from '@/axiosApi';

interface Props {
  onSubmit: (productMutation: ProductMutation) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const {data: categories, isLoading: categoriesLoading, isFetched} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoriesResponse = await axiosApi.get<Category[]>('/categories');
      return categoriesResponse.data;
    },
  });
  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    if (files){
      setState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  if (categoriesLoading && categories) {
    return <CircularProgress/>;
  }


  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="category"
            label="category"
            value={state.category}
            onChange={inputChangeHandler}
            name="category"
            required
          >
            <MenuItem value="" disabled> Please select a category</MenuItem>
            {
              categories && categories.map(category => <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>)
            }
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="title"
            label="title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="price"
            label="price"
            name="price"
            type="number"
            value={state.price}
            onChange={inputChangeHandler}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="description"
            name="description"
            value={state.description}
            onChange={inputChangeHandler}
            required
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            name="image"
            label="Product image"
          />
        </Grid>
        <Grid item xs>
          <LoadingButton
            disabled={isLoading}
            type="submit"
            color="primary"
            variant="contained"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon/>}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;