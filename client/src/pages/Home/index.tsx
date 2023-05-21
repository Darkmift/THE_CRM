import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  return <Container sx={{ padding: '20px' }}>{t('Welcome to React')}</Container>;
}

export default HomePage;
