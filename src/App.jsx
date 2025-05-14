import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
