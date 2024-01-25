/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({ navigation, route }: any) => {
    const ItemOfIndex = useStore((state: any) =>
        route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList
    )[route.params.index];

    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);

    const [price, setPrice] = useState(ItemOfIndex.prices[0]);
    const [fullDesc, setFullDesc] = useState(false);

    const ToggleFavorite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    const BackHandler = () => {
        navigation.pop();
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <ImageBackgroundInfo
                    EnableBackHandler={true}
                    imagelink_portrait={ItemOfIndex.imagelink_portrait}
                    type={ItemOfIndex.type}
                    id={ItemOfIndex.id}
                    favourite={ItemOfIndex.favourite}
                    name={ItemOfIndex.name}
                    special_ingredient={ItemOfIndex.special_ingredient}
                    ingredients={ItemOfIndex.ingredients}
                    average_rating={ItemOfIndex.average_rating}
                    ratings_count={ItemOfIndex.ratings_count}
                    roasted={ItemOfIndex.roasted}
                    BackHandler={BackHandler}
                    ToggleFavorite={ToggleFavorite}
                />
                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>
                        Description
                    </Text>
                    {fullDesc ? (<TouchableWithoutFeedback onPress={() => {
                        setFullDesc(prev => !prev);
                    }}>
                        <Text style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
                    </TouchableWithoutFeedback>) : (
                        <TouchableWithoutFeedback onPress={() => {
                            setFullDesc(prev => !prev);
                        }}>
                            <Text numberOfLines={3} style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
                        </TouchableWithoutFeedback>
                    )}

                    <Text style={styles.InfoTitle}>
                        Size
                    </Text>
                    <View style={styles.SizeOuterContainer}>
                        {ItemOfIndex.prices.map((data: any) => (
                            <TouchableOpacity
                                key={data.size}
                                onPress={() => setPrice(data)}
                                style={[styles.SizeBox, {
                                    borderColor: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex,
                                }]
                                }>
                                <Text style={[styles.SizeText, {
                                    fontSize: ItemOfIndex.type === 'bean' ? FONTSIZE.size_14 : FONTSIZE.size_16,
                                    color: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex,
                                }]
                                }>
                                    {data.size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <PaymentFooter
                price={price}
                buttonTitle={'Add to Cart'}
                buttonPressHandler={() => { }}
            />
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
    FooterInfoArea: {
        padding: SPACING.space_20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,
    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    }
});

export default DetailsScreen;