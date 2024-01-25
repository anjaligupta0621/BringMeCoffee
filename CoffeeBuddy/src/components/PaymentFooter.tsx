/* eslint-disable prettier/prettier */

import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SPACING } from '../theme/theme';

interface PriceProps {
    price: string;
    currency: string;
}

interface PaymentFooterProps {
    price: PriceProps;
    buttonPressHandler: any;
    buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({ price, buttonPressHandler, buttonTitle }) => {
    return (
        <View style={styles.PriceFooter}>
            <View style={styles.PriceContainer}>
                <Text style={styles.PriceTitle}>Price</Text>
                <Text style={styles.PriceText}>
                    {price.currency} <Text style={styles.Price}>
                        {price.price}
                    </Text>
                </Text>
            </View>
            <TouchableOpacity style={styles.PayButton}>
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
    },
    PriceContainer: {},
    PriceTitle: {},
    PriceText: {},
    Price: {},
    PayButton: {},
    ButtonText: {},
});

export default PaymentFooter;