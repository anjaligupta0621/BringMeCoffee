/* eslint-disable prettier/prettier */

import * as React from 'react';
import { View, StyleSheet, ImageProps, ImageBackground, TouchableOpacity } from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favorite: boolean;
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
            <ImageBackground source={props.imagelink_portrait} style={styles.ItemBackgroundImage}></ImageBackground>
            {props.EnableBackHandler ? (
                <View style={styles.ImageHeaderBarContainerWithBack}>
                    <TouchableOpacity>
                        <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <GradientBGIcon name='like' color={props.favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.ImageHeaderBarContainerWithoutBack}>
                    <TouchableOpacity>
                        <GradientBGIcon name='like' color={props.favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                </View>
            )}
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

});

export default ImageBackgroundInfo;
