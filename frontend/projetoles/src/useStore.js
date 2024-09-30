import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, product]
  })),
}));

export default useStore;
