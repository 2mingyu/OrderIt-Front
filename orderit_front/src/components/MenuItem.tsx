import React from 'react';

interface MenuItemProps {
  menuName: string;
  menuDetails: any;
  setSelectedMenu: (menuName: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuName, menuDetails, setSelectedMenu }) => {
  return (
    <div className="menuElement" onClick={() => setSelectedMenu(menuName)}>
      <div className="menuImage">이미지 들어갈 자리</div>
      <div className="menuInfo">
        <h2>{menuName}</h2>
        <h3 className="menuPrice">{menuDetails.price}원</h3>
      </div>
    </div>
  );
};

export default MenuItem;
