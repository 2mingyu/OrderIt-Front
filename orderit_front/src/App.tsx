import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
