/* eslint-disable prettier/prettier */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CoffeeData } from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (cartItem: any) => set(produce(state => {
                let found = false;
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id === cartItem.id) {
                        found = true;
                        let size = false;
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (state.CartList[i].prices[j].size === cartItem.prices[0].size) {
                                size = true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                        if (size === false) {
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].prices.sort((a: any, b: any) => {
                            if (a.size > b.size) {
                                return -1;
                            }
                            if (a.size < b.size) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    }
                }
                if (found === false) {
                    state.CartList.push(cartItem);
                }
            })),
            calculateCartPrice: () => set(produce(state => {
                let totalPrice = 0;
                for (let i = 0; i < state.CartList.length; i++) {
                    let tempPrice = 0;
                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                        tempPrice = tempPrice + (parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity);
                    }
                    state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
                    totalPrice = totalPrice + tempPrice;
                }
                state.CartPrice = totalPrice.toFixed(2).toString();
            })),

        }), { name: 'coffee-app', storage: createJSONStorage(() => AsyncStorage) }
    )
)

