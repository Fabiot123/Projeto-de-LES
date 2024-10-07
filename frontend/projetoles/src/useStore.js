import create from "zustand";

const useStore = create((set) => ({
  cart: [],
  addToCart: (book) =>
    set((state) => ({
      cart: [...state.cart, { ...book, quantity: 1 }],
    })),
}));

export default useStore;
