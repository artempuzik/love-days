import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress, title = '', disabled = false, color = '#f38383', subTitle=''} = props;
    const bg = disabled ? '#868585' : color
    return (
        <Pressable
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : bg,
                },
                styles.button,
            ]}
            onPress={onPress} disabled={disabled}
        >
            {subTitle && <Text style={styles.subText}>{subTitle}</Text>}
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 42,
        borderRadius: 15,
        elevation: 3,
        margin: 10,
    },
    subText: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginBottom: 5,
    },
    text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
