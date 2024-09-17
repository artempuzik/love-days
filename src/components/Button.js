import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress, title = '', disabled = false, color = '#f38383'} = props;
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
    text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
