import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import { ToastProvider } from './providers/ToastProvider';

export default function App() {
  return (
    <ToastProvider>
      <Header />
      <Container />
      <Footer />
    </ToastProvider>
  );
}
