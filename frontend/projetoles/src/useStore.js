import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],
  addToCart: (book, quantity) =>
    set((state) => ({
      cart: [...state.cart, { ...book, quantity }],
    })),

  addQuantity: (book, quantity) =>
    set((state) => ({
      cart: state.cart
        .map((item) => {
          if (item.lvr_id == book.lvr_id) {
            item.quantity = quantity;
          }
          if (quantity > 0) {
            return item;
          }
        })
        .filter((item) => {
          if (item) return item;
        }),
    })),
}));

export default useStore;
