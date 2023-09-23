import { create } from 'zustand'

export const useLogin = create((set) => ({
  isLogged: false,
  setIsLogged: (isLogged) => set({ isLogged })
}))