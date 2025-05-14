import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<h1>Inicio del proyecto</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
