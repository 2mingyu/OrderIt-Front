import { API_URL } from './apiConfig';

interface MenuItem {
  item_id: number;
  name: string;
  price: number;
  imagePath: string;
  imageUrl?: string;
}

interface MenuList {
  [category: string]: {
    [itemName: string]: MenuItem;
  };
}

async function GetMenuList(setMenuList: (menuList: any) => void) {
  let tmpMenuList = {
    'HOT': {
      '아메리카노': {
        "item_id": 1,
        "name": "아메리카노",
        "price": 3000,
        "imagePath": "example.jpg",
      }
    },
    'Cold': {
    },
    'Dessert': {
      'greentealatte_ice': {
        "item_id": 2,
        "name": "greentealatte_ice",
        "price": 5000,
        "imagePath": "6831e236-4eec-4c81-b53b-d2bb282835cegreentealatte_ice.png",
      }
    },
  };
  setMenuList(tmpMenuList);
  let menuList: MenuList = {};
  try {
    const categoryResponse = await fetch(`http://${API_URL}/api/item/category`, {method: 'GET', headers: {'Content-Type': 'application/json'}}); 
    if (categoryResponse.status === 200) {
      const categories: string[] = await categoryResponse.json()
      for (const category of categories) {
        const itemResponse = await fetch(`http://${API_URL}/api/item/${category}`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
        if (itemResponse.status === 200) {
          const items: MenuItem[] = await itemResponse.json();
          menuList[category] = {};
          items.forEach(item => {
            item.imageUrl = `http://${API_URL}/${item.imagePath}`;
            menuList[category][item.name] = item;
          });
        }
        else {
          throw new Error(`/api/item/${category} ${itemResponse.status}`);
        }
      }
      setMenuList(menuList);
    }
    else {
      throw new Error(`/api/item/category ${categoryResponse.status}`);
    }
    
    
  }
  catch (error) {
    console.error(error);
  }
}

export default GetMenuList;
