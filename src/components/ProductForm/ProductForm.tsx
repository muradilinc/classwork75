'use client';
import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { ProductMutation } from '@/types';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (productMutation: ProductMutation) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<ProductMutation>({
    title: '',
    price: '',
    description: '',
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

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
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