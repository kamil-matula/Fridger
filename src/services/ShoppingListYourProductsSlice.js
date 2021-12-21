import { createSlice } from '@reduxjs/toolkit';
import { fridgerApi } from 'services/fridger/fridgerApi';

const ShoppingListYourProductsSlice = createSlice({
  name: 'shoppingListYourProducts',
  initialState: { value: {} },
  reducers: {
    setState: (state, action) => {
      state.value = action.payload.value;
    },
    setStatus: (state, action) => {
      const { shoppingListId, productId, status } = action.payload;
      idx = state.value[shoppingListId].products.findIndex(
        (e) => e.id === productId
      );
      state.value[shoppingListId].products[idx].status = status;
    },
    setPrice: (state, action) => {
      const { shoppingListId, productId, price } = action.payload;
      idx = state.value[shoppingListId].products.findIndex(
        (e) => e.id === productId
      );
      state.value[shoppingListId].products[idx].price = price;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      fridgerApi.endpoints.shoppingListYourProducts.matchFulfilled,
      (state, action) => {
        const { products: shoppingListYourProducts, id: shoppingListId } =
          action.payload;

        // if there is no shopping list create new one
        if (!(shoppingListId in state.value)) {
          state.value[shoppingListId] = { products: [], price: 0 };
        }

        const shoppingListYourProductsIds = shoppingListYourProducts.map(
          (product) => product.id
        );
        const stateProductsIds = state.value[shoppingListId].products.map(
          (product) => product.id
        );

        // remove ShoppingListYourProductsSlice state products
        // that are not in shoppingListYourProducts
        state.value[shoppingListId].products = state.value[
          shoppingListId
        ].products.filter((stateProduct) =>
          shoppingListYourProductsIds.includes(stateProduct.id)
        );

        // add new product from shoppingListYourProducts
        shoppingListYourProducts.forEach((product) => {
          if (!stateProductsIds.includes(product.id)) {
            state.value[shoppingListId].products.push(product);
          }
        });

        // update name, note, quantity
        shoppingListYourProducts.forEach((product) => {
          const idx = state.value[shoppingListId].products.findIndex(
            (stateProduct) => stateProduct.id === product.id
          );
          state.value[shoppingListId].products[idx].name = product.name;
          state.value[shoppingListId].products[idx].note = product.note;
          state.value[shoppingListId].products[idx].quantity = product.quantity;
          state.value[shoppingListId].products[idx].quantity_type =
            product.quantity_type;
        });
      }
    );
  },
});

export default ShoppingListYourProductsSlice.reducer;

export const { setStatus, setPrice, updateState, setState } =
  ShoppingListYourProductsSlice.actions;
