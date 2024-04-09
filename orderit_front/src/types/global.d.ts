interface TypeMenuItem {
  item_id: number;
  name: string;
  price: number;
  imagePath: string;
  imageUrl?: string;
  imageObj?: HTMLImageElement;
}


interface TypeMenuList {
  [category: string]: {
    [menuItemName: string]: TypeMenuItem;
  };
}

interface TypeCartItem {
  menuItem: TypeMenuItem;
  quantity: number;
}

type TypeCart = {
  [key: string]: TypeCartItem;
}