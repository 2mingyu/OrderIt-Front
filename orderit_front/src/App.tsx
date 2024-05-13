import { useEffect, useState } from "react";
import { useMenuList } from './context/MenuListContext';
import { useDineOrTakeout } from './context/DineOrTakeoutContext';
import GET_item from './utils/Get_item';

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
  const { setMenuList } = useMenuList();
  const { setDineOrTakeout } = useDineOrTakeout();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMenuList = async() => {
      setIsLoading(true);
      try {
        await Promise.race([
          GET_item(setMenuList),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout after 10 seconds")), 10000))
        ]);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    setDineOrTakeout('');
    fetchMenuList();
  }, [setMenuList, setDineOrTakeout]);
  return (
    <>
    {isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </BrowserRouter>
      </>
    )}
    </>
  );
}

export default App;
