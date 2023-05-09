'use client';
import { Container } from '@mui/material';
import React from 'react';
import MainHeader from './MainHeader';

type Props = { children: React.ReactNode };

function MainBody({ children }: Props) {
  return (
    <Container component="body" sx={{ padding: 0 }}>
      <MainHeader />
      {children}
    </Container>
  );
}

export default MainBody;
