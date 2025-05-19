import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterUser from './registerUser';
import Login from './login';
import Homepage from './homepage';
import * as Sentry from "@sentry/react";
// import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: "https://2840efb448eb552311f2710560e5109a@o4509348136353792.ingest.us.sentry.io/4509348139565056",
  // integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});



function App() {
  // throw new Error("Error de prueba");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
