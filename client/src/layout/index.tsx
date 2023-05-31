import useCustomTheme from '@/hooks/useCustomLocal';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import styles from './layout.module.scss';

function MainLayout() {
  const { ThemeProvider, themeWithLocale } = useCustomTheme();

  return (
    <ThemeProvider theme={themeWithLocale}>
      <Container component="main" className={styles['layout']} maxWidth={false}>
        <AppHeader />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default MainLayout;
