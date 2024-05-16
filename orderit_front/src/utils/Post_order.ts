import { API_URL_SPRING } from './apiConfig_spring';

async function Post_order(cart: TypeCart, dineOrTakeout: string) {
  // data setting
  const detailDtoList: {itemId: number, quantity: number}[] = [];
  let totalPrice = 0;
  Object.values(cart).forEach((cartItem) => {
    const { menuItem, quantity } = cartItem;
    detailDtoList.push({
      itemId: menuItem.item_id,
      quantity: quantity
    });
    totalPrice += menuItem.price * quantity;
  });
  const orderType = (dineOrTakeout==='Takeout') ? 'TAKE_OUT' : 'ON_SITE'
  const data = {
    "detailDtoList": detailDtoList,
    "totalPrice": totalPrice,
    "orderType": orderType
  }
  try {
    const response = await fetch(
      `http://${API_URL_SPRING}/api/order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    console.log(data);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.log(`/api/order ${response.status}`);
      return responseJson;
    }
    else {
      throw new Error(`/api/order ${response.status}`);
    }
  }
  catch (error) {
    console.error(error);
    return false;
  }
}

export default Post_order;