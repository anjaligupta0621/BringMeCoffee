/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoritesScreen = ({navigation}: any) => {

    const FavoritesList = useStore((state: any) => state.FavoritesList);
    const tabBarHeight = useBottomTabBarHeight();

    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);

    const ToggleFavorite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title={'Favorites'} />
                        {FavoritesList.length === 0 ? (
                            <EmptyListAnimation title={'No Favorites'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {FavoritesList.map((data: any) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: data.index,
                                                id: data.id,
                                                type: data.type,
                                            });
                                        }}
                                        key={data.id}
                                    >
                                        <FavoritesItemCard
                                            id={data.id}
                                            name={data.name}
                                            type={data.type}
                                            average_rating={data.average_rating}
                                            imagelink_portrait={data.imagelink_portrait}
                                            special_ingredient={data.special_ingredient}
                                            ingredients={data.ingredients}
                                            roasted={data.roasted}
                                            ratings_count={data.ratings_count}
                                            description={data.description}
                                            favourite={data.favourite}
                                            ToggleFavoriteItem={ToggleFavorite}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
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
        gap: SPACING.space_20,
    },
})

export default FavoritesScreen;