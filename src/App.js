import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterUser from './registerUser';
import Login from './login';
import Homepage from './homepage';
import * as Sentry from "@sentry/react";
// import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: "https://f035b9290525abcd0ddb70db1a8287f2@o4509347749101568.ingest.us.sentry.io/4509347750215680",
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
