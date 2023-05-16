import useCustomTheme from '@/hooks/useCustomLocal';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import styles from './layout.module.scss';

type Props = {};

function MainLayout({}: Props) {
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
