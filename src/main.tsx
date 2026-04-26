import { createRoot } from 'react-dom/client'
import { Suspense, lazy, useState, useEffect } from 'react';
import './index.css'
import LoadingScreen from './components/ui/LoadingScreen.tsx';

const App = lazy(() => import('./App.tsx'));

function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate completion after loading screen finishes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(
  <Main />,
)
