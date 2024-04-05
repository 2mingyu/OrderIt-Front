interface MenuItem {
  item_id: number;
  name: string;
  price: number;
  imagePath: string;
  imageUrl?: string;
  imageObj?: HTMLImageElement;
}


interface MenuList {
  [category: string]: {
    [itemName: string]: MenuItem;
  };
}

interface CartItem {
  menuName: string;
  price: number;
  quantity: number;
}

type Cart = {
  [key: string]: CartItem;
}