/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import { useStore } from '../store/store';

const CartScreen = () => {
    const CartList = useStore((state: any) => state.CartList);
    console.log(CartList.length);
    return (
        <View>
            <Text>CartScreen</Text>
        </View>
    );
};


export default CartScreen;
