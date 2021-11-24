// TODO: Fix models (in API they will look different than in this file)!

export const requestsList = [
  {
    id: 0,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    nick: 'Gr4ss',
    name: 'Bulba',
    surname: 'Saur',
    permission: 'can view',
  },
  {
    id: 1,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    nick: 'Poison',
    name: 'Ivy',
    surname: 'Saur',
    permission: 'can edit',
  },
  {
    id: 2,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    nick: 'BigBoy',
    name: 'Venu',
    surname: 'Saur',
    permission: 'administrator',
  },
];

export const friendsList = [
  {
    id: 3,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    nick: 'RedBoy',
    permission: 'administrator',
  },
  {
    id: 4,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    nick: 'Dragggon',
    name: 'Chari',
    permission: 'can edit',
  },
  {
    id: 5,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    nick: 'Dragon123',
    surname: 'Zard',
    permission: 'can edit',
  },
  {
    id: 6,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    nick: 'Squirtle',
    name: 'Squirtle',
    surname: 'Squirtle',
    permission: 'can view',
  },
  {
    id: 7,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
    nick: 'NotSquirtle',
    name: 'War',
    surname: 'Tortle',
    permission: 'administrator',
  },
  {
    id: 8,
    avatar:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
    nick: 'BigBottleOfWater',
    name: 'Blastoise',
    permission: 'administrator',
  },
];

const additives = [
  {
    code: 'E150d',
    description: 'Sulphite ammonia caramel',
  },
  {
    code: 'E338',
    description: 'Phosphoric acid',
  },
  {
    code: 'E331',
    description: 'Sodium cirates',
  },
  { code: 'E951', description: 'Aspartame' },
  {
    code: 'E950',
    description: 'Acesfulfame k',
  },
];

// Example from OpenFoodFacts API:
const nutritions = {
  carbohydrates: 50,
  energy: 1184,
  fat: 4.8,
  fiber: 4.4,
  proteins: 7.1,
  salt: 1.5,
  'saturated-fat': 0.4,
  sodium: 0.6,
  sugars: 6,
};

export const productsInFridgeList = [
  // Products added by scanning barcode:
  {
    // General:
    id: 1,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare eros vel ullamcorper pretium.',
    producer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare eros vel ullamcorper pretium.',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '12.05.2023',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',

    // Details:
    barcode: '3760049790214',
    nutri: 'B',
    nova: 'N4',
    additives,
    nutritions,
  },
  {
    // General:
    id: 2,
    name: 'Nutella',
    producer: 'Ferrero',
    currentQuantity: 350,
    maxQuantity: 400,
    quantityType: 'g',
    expirationDate: '10.12.2021',
    image:
      'https://world.openfoodfacts.org/images/products/301/762/042/2003/front_en.327.full.jpg',

    // Details:
    barcode: '3017620422003',
    nutri: 'E',
    nova: 'N4',
    additives,
    nutritions,
  },
  {
    // General:
    id: 3,
    name: 'Nesquik',
    producer: 'Nestlé',
    currentQuantity: 250,
    maxQuantity: 250,
    quantityType: 'g',
    expirationDate: '07.01.2024',
    image:
      'https://world.openfoodfacts.org/images/products/303/371/006/5066/front_en.233.full.jpg',

    // Details:
    barcode: '3033710065066',
    nutri: 'B',
    nova: 'N4',
    additives,
    nutritions,
  },

  // Products added manually:
  {
    // General:
    id: 4,
    name: 'Cheese',
    currentQuantity: 200,
    maxQuantity: 250,
    quantityType: 'g',
  },
  {
    // General:
    id: 5,
    name: 'Milk',
    producer: 'Pilos',
    currentQuantity: 500,
    maxQuantity: 1000,
    quantityType: 'ml',
  },
  {
    // General:
    id: 6,
    name: 'Orange juice',
    currentQuantity: 1000,
    maxQuantity: 2000,
    quantityType: 'ml',
    expirationDate: '05.10.2021',
  },
  {
    // General:
    id: 7,
    name: 'Apple juice',
    producer: 'Solevita',
    currentQuantity: 1000,
    maxQuantity: 1500,
    quantityType: 'ml',
    expirationDate: '05.10.2021',
  },
];

export const fridgesList = [
  { id: 1, name: 'Home', items: 5, people: 4 },
  { id: 2, name: 'Bunker', items: 100, people: 1 },
  { id: 3, name: 'My fridge', items: 0, people: 5 },
  { id: 4, name: 'Another fridge', items: 10, people: 1 },
  { id: 5, name: 'Bin', items: 25, people: 1 },
  { id: 6, name: 'Medicines', items: 3, people: 1 },
  { id: 7, name: 'The last container', items: 4, people: 1 },
];

export const shoppingListsList = [
  {
    id: 1,
    name: 'Shopping List 1',
    uncheck: 4,
    dips: 11,
    check: 5,
    isShared: true,
    isActive: true,
    activeFridgeID: 1,
  },
  {
    id: 2,
    name: 'Shopping List 2',
    uncheck: 3,
    dips: 9,
    check: 6,
    isShared: true,
    isActive: true,
    activeFridgeID: 2,
  },
  {
    id: 3,
    name: 'Shopping List 3',
    uncheck: 7,
    dips: 0,
    check: 7,
    isShared: false,
    isActive: true,
    activeFridgeID: null,
  },
  {
    id: 4,
    name: 'Shopping List 4',
    uncheck: 0,
    dips: 0,
    check: 10,
    isShared: false,
    isActive: false,
    activeFridgeID: 4,
  },
  {
    id: 5,
    name: 'Shopping List 5',
    uncheck: 0,
    dips: 0,
    check: 7,
    isShared: true,
    isActive: false,
    activeFridgeID: null,
  },
];

export const shoppingListItems = [
  {
    id: 1,
    userNick: 'RedBoy',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    name: 'Mleko 1',
    quantity: 1,
    unit: 'pcs',
    status: 'unchecked',
    price: 1,
  },
  {
    id: 2,
    userNick: 'Dragggon',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    name: 'Mleko 2',
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quantity: 1000,
    unit: 'pcs',
    status: 'unchecked',
    price: 2,
  },
  {
    id: 3,
    userNick: 'RedBoy',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    name: 'Mleko 3',
    note: 'Proin ornare eros vel ullamcorper pretium. Nullam volutpat ac nisl eu accumsan. Maecenas dapibus mauris vitae elementum hendrerit. In dapibus augue a dui tempus, nec ultricies nisl pulvinar. Nulla nibh est, mattis at volutpat non, eleifend in enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ',
    quantity: 32,
    unit: 'pcs',
    status: 'indeterminate',
    price: 3,
  },
  {
    id: 4,
    userNick: 'RedBoy',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    name: 'Mleko 4',
    note: 'Nullam orci mi, finibus fermentum nisi blandit, consectetur rhoncus mi.',
    quantity: 12,
    unit: 'pcs',
    status: 'indeterminate',
    price: 4,
  },
  {
    id: 5,
    userNick: 'Dragggon',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    name: 'Mleko 5',
    note: 'Short description',
    quantity: 10,
    unit: 'pcs',
    status: 'indeterminate',
    price: 5,
  },
  {
    id: 6,
    userNick: 'Dragggon',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    name: 'Mleko 6',
    note: 'Vivamus gravida ornare quam id tempor. Nunc ut ex at dui consectetur volutpat. Praesent.',
    quantity: 4,
    unit: 'pcs',
    status: 'checked',
    price: 6,
  },
  {
    id: 7,
    userNick: 'RedBoy',
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    name: 'Mleko 7',
    note: 'Nam vel placerat elit, eget consectetur metus. Nam imperdiet nibh in diam sollicitudin, eu ultrices ligula elementum. ',
    quantity: 5,
    unit: 'pcs',
    status: 'checked',
    price: 7,
  },
  {
    id: 8,
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
    userNick: 'NotSquirtle',
    name: 'Mleko 8',
    quantity: 1,
    unit: 'pcs',
    status: 'checked',
    price: 3,
  },
  {
    id: 9,
    avatarURI:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    userNick: 'Squirtle',
    name: 'Mleko 9',
    quantity: 1,
    unit: 'pcs',
    status: 'indeterminate',
    price: 2,
  },
];
