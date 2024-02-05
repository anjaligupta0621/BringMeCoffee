/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useStore } from '../store/store';
import { COLORS, SPACING } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = () => {

    const [showAnimation, setShowAnimation] = useState(false);

    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
    const tabBarHeight = useBottomTabBarHeight();
    console.log(OrderHistoryList.length);

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            { showAnimation ? <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} /> : <></> }

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, {
                    marginBottom: tabBarHeight,
                }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Order History" />
                        {OrderHistoryList.length === 0 ? (
                            <EmptyListAnimation title={'No Order History'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {OrderHistoryList.map((data: any, index: any) => (
                                    <OrderHistoryCard 
                                        key={index.toString()}
                                        CartList={data.CartList}
                                        CartListPrice={data.CartListPrice}
                                        navigationHandler={() => {}}
                                        OrderDate={data.OrderDate}
                                    />
                                ))}
                            </View>)}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    LottieAnimation: {
        height: 250,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_30,
    },
});

export default OrderHistoryScreen;
