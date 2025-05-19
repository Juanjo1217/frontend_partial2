import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterUser from './registerUser';
import Login from './login';
import Homepage from './homepage';
import * as Sentry from "@sentry/react";
import { GrowthBook, GrowthBookProvider, useGrowthBook } from "@growthbook/growthbook-react";
import { autoAttributesPlugin } from "@growthbook/growthbook/plugins";
import { use } from 'react';

// Configuración de GrowthBook
const gb = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: process.env.REACT_APP_GROWTHBOOK_CLIENT_KEY,
  user: { id: "user-id-333" },
  onFeatureUsage: (key, result) => {
    console.log("Feature used:", key, result);
  },
});

gb.loadFeatures().then(() =>
  console.log("GrowthBook connected", gb.getFeatures())
);

// Configuración de Sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  tracesSampleRate: 1.0,
});

function App() {
  // Inicializa GrowthBook
  
  return (
    <GrowthBookProvider growthbook={gb} plugins={[autoAttributesPlugin]}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </GrowthBookProvider>
  );
}

export default App;
