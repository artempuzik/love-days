import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scroll: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c5b6f8',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f8e1e1',
        textDecorationLine: 'underline',
        margin: 10,
    },
    pointsWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    header: {
        padding: 20,
        height: 60,
        backgroundColor: '#c5b6f8'
    },
    points: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#40c9e7',
        margin: 10,
    },
    timer: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#20b275',
        margin: 10,
    },
    task: {
        fontSize: 24,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        textAlign: 'center',
        color: '#fff',
        marginVertical: 25,
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#a0e7f6',
        borderRadius: 8,
        color: '#000',
        paddingRight: 30,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    emptyText: {
        color: '#1a1a1a',
        fontSize: 24,
    },
    placeholder: {
        color: '#1a1a1a',
    },
    filterItem: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
    },
    filters: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
});
