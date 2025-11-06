import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import { ToastProvider } from './providers/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <Header />
      <Container />
      <Footer />
    </ToastProvider>
  );
}

export default App;
