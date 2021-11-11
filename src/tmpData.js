// TODO: Fix models (in API they will look different than in this file)!

const tmp =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

export const requestsList = [
  {
    id: 0,
    avatar: tmp,
    nick: 'Minkx0',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'can view',
  },
  {
    id: 1,
    avatar: tmp,
    nick: 'Minkx1',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'can edit',
  },
  {
    id: 2,
    avatar: tmp,
    nick: 'Minkx2',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'administrator',
  },
];

export const friendsList = [
  {
    id: 3,
    avatar: tmp,
    nick: 'Minkx3',
    permission: 'administrator',
  },
  {
    id: 4,
    avatar: tmp,
    nick: 'Minkx4',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'can edit',
  },
  {
    id: 5,
    avatar: tmp,
    nick: 'Minkx5',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'can edit',
  },
  {
    id: 6,
    avatar: tmp,
    nick: 'Minkx6',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'can view',
  },
  {
    id: 7,
    avatar: tmp,
    nick: 'Minkx7',
    name: 'Ardelle',
    surname: 'Coppage',
    permission: 'administrator',
  },
  {
    id: 8,
    avatar: tmp,
    nick: 'Minkx8',
    name: 'Ardelle',
    surname: 'Coppage',
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
  {
    // General:
    id: 1,
    name: 'Pain de mie à la farine complète 1',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',

    // Details:
    nutri: 'A',
    nova: 'N1',
    additives,
    nutritions,
  },
  {
    // General:
    id: 2,
    name: 'Pain de mie à la farine complète 2',
    producer: 'La Boulangère Bio',
    currentQuantity: 450,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',

    // Details:
    nutri: 'A',
    nova: 'N1',
    additives,
    nutritions,
  },
  {
    // General:
    id: 3,
    name: 'Pain de mie à la farine complète 3',
    producer: 'La Boulangère Bio',
    currentQuantity: 300,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',

    // Details:
    nutri: 'A',
    nova: 'N1',
    additives,
    nutritions,
  },
];

export const fridgesList = [
  { id: '1', title: 'Home' },
  { id: '2', title: 'Bunker' },
  { id: '3', title: 'My fridge' },
];
