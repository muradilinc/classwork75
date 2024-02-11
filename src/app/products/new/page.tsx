'use client';
import React from 'react';
import { Typography } from '@mui/material';
import ProductForm from '@/components/ProductForm/ProductForm';
import { useMutation } from '@tanstack/react-query';
import { ProductMutation } from '@/types';
import axiosApi from '@/axiosApi';
import { useRouter } from 'next/navigation';

const NewProductPage = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (productData: ProductMutation) => {
      const formData = new FormData();
      formData.append('category', productData.category);
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);

      if (productData.image) {
        formData.append('image', productData.image);
      }

      await axiosApi.post('/products', formData);
    }
  });

  const onSubmit = async (productData: ProductMutation) => {
    await mutation.mutateAsync(productData);
    void router.push('/');
  };

  return (
    <>
      <Typography variant="h4">New product</Typography>
      <ProductForm onSubmit={onSubmit} isLoading={mutation.isPending}/>
    </>
  );
};

export default NewProductPage;