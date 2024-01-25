/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, StyleSheet, ImageProps, ImageBackground, TouchableOpacity, Text } from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavorite: any;
}

const ImageBackgroundInfo = (props: ImageBackgroundInfoProps) => {
    return (
        <View>
            <ImageBackground source={props.imagelink_portrait} style={styles.ItemBackgroundImage}>
                {props.EnableBackHandler ? (
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity onPress={() => props.BackHandler()}>
                            <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            props.ToggleFavorite(props.favourite, props.type, props.id);
                        }}>
                            <GradientBGIcon name='like' color={props.favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.ImageHeaderBarContainerWithoutBack}>
                        <TouchableOpacity onPress={() => {
                            props.ToggleFavorite(props.favourite, props.type, props.id);
                        }}>
                            <GradientBGIcon name='like' color={props.favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>{props.name}</Text>
                                <Text style={styles.ItemSubtitleText}>{props.special_ingredient}</Text>
                            </View>
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.PropertyFirst}>
                                    <CustomIcon
                                        name={props.type === 'Bean' ? 'bean' : 'beans'}
                                        size={props.type === 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={[styles.PropertyTextFirst, { marginTop: props.type === 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0 }]}>
                                        {props.type}
                                    </Text>
                                </View>
                                <View style={styles.PropertyFirst}>
                                    <CustomIcon
                                        name={props.type === 'Bean' ? 'location' : 'drop'}
                                        size={FONTSIZE.size_16}
                                        color={COLORS.primaryOrangeHex}
                                    />
                                    <Text style={styles.PropertyTextFirst}>
                                        {props.ingredients}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.InfoContainerRow}>
                            <View style={styles.RatingContainer}>

                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
    ItemSubtitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,
    },
    PropertyFirst: {
        height: 55,
        width: 55,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    RatingContainer: {},

});

export default ImageBackgroundInfo;
