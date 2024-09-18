import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import {articles} from "../config";
import ArticlesComponent from "../components/ArticlesComponent";

const ArticlesScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={articles}
                renderItem={({ item, index }) => <ArticlesComponent article={item} index={index} />}
            />
        </View>
    );
};

export default ArticlesScreen;
