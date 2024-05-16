import { tmpMenuList } from './tmpMenuList';
import { API_URL_SPRING } from './apiConfig_spring';
import { preloadImage } from './preloadImage';

async function Get_item(setMenuList: (menuList: TypeMenuList) => void) {
  // 임시
  setMenuList(tmpMenuList);
  // 서버 api 호출
  let menuList: TypeMenuList = {};
  try {
    const categoryResponse = await fetch(
      `http://${API_URL_SPRING}/api/item/category`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ); 
    if (categoryResponse.status === 200) {
      const categories: string[] = await categoryResponse.json()
      for (const category of categories) {
        const itemResponse = await fetch(
          `http://${API_URL_SPRING}/api/item/${category}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (itemResponse.status === 200) {
          const items: TypeMenuItem[] = await itemResponse.json();
          menuList[category] = {};
          for (const item of items) {
            if (item.eng_name) {
              item.imageUrl = `http://${API_URL_SPRING}/${item.imagePath}`;
              item.imageObj = await preloadImage(item.imageUrl);
              menuList[category][item.eng_name] = item;
            }
          };
        }
        else {
          throw new Error(`/api/item/${category} ${itemResponse.status}`);
        }
      }
      setMenuList(menuList);
      console.log('Get_item 완료');
    }
    else {
      throw new Error(`/api/item/category ${categoryResponse.status}`);
    }
    
    
  }
  catch (error) {
    console.error(error);
  }
}

export default Get_item;
