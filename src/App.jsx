import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './config/routes';

export default function App() {
  return (
    <div className="app min-h-screen bg-surface font-sans">
      <Navbar />
      <main className="app__main min-h-[60vh]">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
