import React, {useMemo} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useRoute} from "@react-navigation/native";
import styles from './styles';
import {articles} from "../config";

const ArticleScreen = () => {
    const route = useRoute()
    const article = useMemo(() => typeof route?.params?.id === 'number' ?  articles[route.params.id] : null, [route])

    if(!article) {
        return null
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Text style={[styles.title, { textAlign: 'center' }]}>{article.title}</Text>
                {
                    article.description ? (
                        <Text style={styles.articleText}>{article.description}</Text>
                    ) : null
                }
                {
                    article.main ? (
                        article.main.map((block, index) => (
                            <View key={index}>
                                <Text style={styles.articleTitle}>{block.title}</Text>
                                <Text style={styles.articleText}>{block.description}</Text>
                            </View>
                        ))
                    ) : null
                }
                {
                    article.examples ? (
                        <>
                            <Text style={[styles.articleTitle, { textAlign: 'center' }]}>Real-Life Examples</Text>
                            {
                                article.examples.map((block, index) => (
                                    <View key={index}>
                                        <Text style={styles.articleTitle}>{block.title}</Text>
                                        <Text style={styles.articleText}>{block.description}</Text>
                                    </View>
                                ))
                            }
                        </>
                    ) : null
                }
            </View>
        </ScrollView>
    );
};

export default ArticleScreen;
