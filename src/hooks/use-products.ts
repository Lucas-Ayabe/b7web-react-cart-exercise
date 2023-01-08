import { useReducer } from "react";
import { Product } from "../domain";

type State = { list: Product[]; inCart: Product[] };
type ProductsReducer = (state: State, action: number) => State;

const byProductId = (productId: number) => {
  return ({ id }: Product) => id === productId;
};

const addProductToCart: ProductsReducer = (state, productId) => {
  const product = state.list.find(byProductId(productId));
  if (!product) return state;

  const canAdd = product.quantity - 1 >= 0;
  const quantityAdded = canAdd ? 1 : 0;

  const productInCart = state.inCart.find(byProductId(productId));
  const cartProducts = state.inCart.concat(
    productInCart ? [] : [{ ...product, quantity: 0 }]
  );

  return {
    list: state.list.map((product) => {
      return product.id === productId
        ? { ...product, quantity: product.quantity - quantityAdded }
        : product;
    }),
    inCart: cartProducts.map((product) => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    }),
  };
};

export const useProducts = (products: Product[]) => {
  return useReducer(addProductToCart, { list: products, inCart: [] });
};
