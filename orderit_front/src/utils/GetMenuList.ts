function GetMenuList(setMenuList: (menuList: any) => void) {
  let tmpMenuList = {
    'Coffee': {
      '에스프레소': {
        price: 1000
      },
      '콜드브루' : {
        price: 1
      },
      '아이스 아메리카노': {
        price: 2000
      },
      '핫 아메리카노': {
        price: 2000
      },
      '아이스 카페라떼': {
        price: 2
      },
      '핫 카페라떼': {
        price: 3
      },
      '아이스 아인슈페너': {
        price: 8
      },
      '핫 아인슈페너': {
        price: 9
      },
      '카푸치노': {
        price: 10
      },
    },
    'NonCoffee': {
      '아이스 바닐라라떼': {
        price: 4
      },
      '핫 바닐라라떼': {
        price: 5
      },
      '아이스 그린티라떼': {
        price: 6
      },
      '핫 그린티라떼': {
        price: 7
      },
      '레몬 에이드': {
        price: 11
      },
      '자몽 에이드': {
        price: 12
      },
      '복숭아 아이스티': {
        price: 13
      },
      '레몬 아이스티': {
        price: 14
      },
    },
    'Dessert': {
      '레드벨벳케이크': {
        price: 5000
      },
      '롤 케이크': {
        price: 6000
      },
      '치즈 케이크': {
        price: 15
      },
      '초코 쿠키': {
        price: 16
      },
      '플레인 쿠키': {
        price: 17
      },
      '소금빵': {
        price: 18
      },
      '스트로베리 초콜릿 생크림 케이크': {
        price: 19
      },
    },
  };

  setMenuList(tmpMenuList);
}

export default GetMenuList;
