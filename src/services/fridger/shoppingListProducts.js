import { convertStatus, convertQuantityType } from 'services/dataConverters';
import { fridgerApi } from './fridgerApi';

const shoppingListsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    addShoppingListProduct: builder.mutation({
      query: ({ shoppingList, name, note, price, quantity, quantityType }) => ({
        url: `shopping-list-products`,
        method: 'POST',
        body: {
          shopping_list: shoppingList,
          name,
          note,
          price,
          quantity,
          quantity_type: convertQuantityType(quantityType),
        },
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    editShoppingListProduct: builder.mutation({
      query: ({
        productId,
        status,
        name,
        note,
        price,
        quantity,
        quantityType,
      }) => ({
        url: `shopping-list-products/${productId}`,
        method: 'PATCH',
        body: {
          status: status ? convertStatus(status) : status,
          name,
          note,
          price,
          quantity,
          quantity_type: quantityType
            ? convertQuantityType(quantityType)
            : quantityType,
        },
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    buyProducts: builder.mutation({
      query: ({ shoppingList, products }) => ({
        url: `shopping-lists/${shoppingList}/buy-products`,
        method: 'POST',
        body: { products },
      }),
      invalidatesTags: ['ShoppingListProducts', 'Statistics'],
    }),
    deleteShoppingListProduct: builder.mutation({
      query: ({ id }) => ({
        url: `shopping-list-products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    shoppingListAllProducts: builder.query({
      query: ({ id }) => ({
        url: `shopping-lists/${id}/all-products`,
        method: 'GET',
      }),
      transformResponse: (response) =>
        response.map((product) => {
          product.status = convertStatus(product.status);
          product.quantity_type = convertQuantityType(product.quantity_type);
          product.quantity = parseFloat(product.quantity).toString();
          return product;
        }),
      providesTags: ['ShoppingListProducts'],
    }),
    shoppingListYourProducts: builder.query({
      query: ({ id }) => ({
        url: `shopping-lists/${id}/your-products`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        response.products = response.products.map((product) => {
          product.status = convertStatus(product.status);
          product.quantity_type = convertQuantityType(product.quantity_type);
          product.quantity = parseFloat(product.quantity).toString();
          return product;
        });
        return response;
      },
      providesTags: ['ShoppingListProducts'],
    }),
    shoppingListSummary: builder.query({
      query: ({ id }) => ({
        url: `shopping-lists/${id}/summary`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        response.users = response.users.map((user) => {
          user.products = user.products.map((product) => {
            product.status = convertStatus(product.status);
            product.quantity_type = convertQuantityType(product.quantity_type);
            product.quantity = parseFloat(product.quantity).toString();
            return product;
          });
          return user;
        });

        return response;
      },
      providesTags: ['ShoppingListProducts'],
    }),
  }),
});

export const {
  useAddShoppingListProductMutation,
  useEditShoppingListProductMutation,
  useBuyProductsMutation,
  useDeleteShoppingListProductMutation,
  useShoppingListAllProductsQuery,
  useShoppingListYourProductsQuery,
  useShoppingListSummaryQuery,
} = shoppingListsApi;
