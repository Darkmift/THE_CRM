import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

import styles from './layout.module.scss';

type Props = {};

function MainLayout({}: Props) {
  return (
    <Container component="main" className={styles['layout']} maxWidth={false}>
      <AppHeader />
      <Outlet />
    </Container>
  );
}

export default MainLayout;
