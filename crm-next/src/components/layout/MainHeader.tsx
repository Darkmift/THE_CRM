'use client';
import { AppBar, Container, Toolbar } from '@mui/material';
import React from 'react';

type Props = {};

function MainHeader({}: Props) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters></Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
