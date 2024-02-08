import React, { useState } from "react";
import "./MainWindow.css";
import Login from "./Login";
import Start from "./Start";
import Menu from "./Menu";
import Result from "./Result";

interface MainWindowProps {
    currentPage: string;
    setCurrentPage: (value: string) => void;
    TOGO: string;
    setTOGO: (value: string) => void;
}

interface CartItem {
    quantity: number;
    price: number;
}

const MainWindow: React.FC<MainWindowProps> = ({ currentPage, setCurrentPage, TOGO, setTOGO }) => {
    const [menuList, setMenuList] = useState({});
    const [cart, setCart] = useState({});
    let page;
    switch (currentPage) {
        case 'Login':
            page = <Login setCurrentPage={setCurrentPage} />
            break;
        case 'Start':
            page = <Start setCurrentPage={setCurrentPage} setMenuList={setMenuList} setTOGO={setTOGO} />
            break;
        case 'Menu':
            page = <Menu setCurrentPage={setCurrentPage} menuList={menuList} cart={cart} setCart={setCart} />
            break;
        case 'Result':
            page = <Result setCurrentPage={setCurrentPage} TOGO={TOGO} cart={cart} />
            break;
        default:
            page = <h1>Error</h1>
    }

    return (
        <div className="MainWindow">
            {page}
        </div>
    )
}

export default MainWindow;