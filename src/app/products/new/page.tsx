'use client';
import React from 'react';
import { Typography } from '@mui/material';
import ProductForm from '@/components/ProductForm/ProductForm';
import { useMutation } from '@tanstack/react-query';
import { ProductMutation } from '@/types';
import axiosApi from '@/axiosApi';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (productData: ProductMutation) => {
      await axiosApi.post('/products', {
        ...productData,
        price: parseFloat(productData.price),
      });
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

export default Page;