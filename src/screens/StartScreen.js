import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Text, TextInput, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./styles";
import Button from "../components/Button";
import { ROUTES } from "../navigation/routes";
import { setUser } from "../store/app";

const StartScreen = ({ navigation }) => {
    const user = useSelector(state => state.app.user);
    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [userNameMe, setUserNameMe] = useState('');
    const [userNamePartner, setUserNamePartner] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);  // State to manage the visibility of the date picker

    const goToMain = useCallback(() => {
        dispatch(setUser({
            me: userNameMe,
            partner: userNamePartner,
            start: date.toJSON()
        }));
        navigation.navigate(ROUTES.MAIN);
    }, [dispatch, navigation, userNamePartner, userNameMe, date]);
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const onChangeValue = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    useEffect(() => {
        if(user) {
            setUserNameMe(user.me)
            setUserNamePartner(user.partner)
            setDate(new Date(user.start))
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Love Days</Text>
            <TextInput style={styles.textInput} value={userNameMe} onChangeText={setUserNameMe} placeholder="Yours name" />
            <TextInput style={styles.textInput} value={userNamePartner} onChangeText={setUserNamePartner} placeholder="Partner's name" />
            <View style={{ width: '100%' }}>
                <Button title={date ? date.toLocaleDateString() : "Pick a Date"} subTitle={date ?  'Start date:' : ''} onPress={showDatepicker} />
            </View>
            {showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display={"spinner"}
                onChange={onChangeValue}
            />)}
            <View style={{ width: '100%' }}>
                <Button title={'Next'} onPress={goToMain} disabled={!userNameMe || !userNamePartner} />
            </View>
        </View>
    );
};

export default StartScreen;
