import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './config/routes';

export default function App() {
  return (
   
    <div className="app min-h-screen bg-surface font-sans flex flex-col">
      <Navbar />
      <main className="app__main flex-1 min-h-[60vh]">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
