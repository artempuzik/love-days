import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {ROUTES} from "../navigation/routes";

const ArticleComponent = ({ article, index }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => navigation.navigate(ROUTES.ARTICLE, { id: index })}>
            <Text style={styles.text}>{article.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderColor: '#40c9e7',
        backgroundColor: '#a0e7f6',
        borderRadius: 15,
        borderWidth: 1,
        marginVertical: 15,
    },
    text: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000',
        marginVertical: 5,
    },
});

export default ArticleComponent;
