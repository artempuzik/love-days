import React, { useMemo, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import styles from './styles';
import TaskComponent from '../components/TaskComponent';

const TasksScreen = () => {
    // Get tasks from Redux state
    const tasks = useSelector(state => state.app.tasks);

    const filtered = useMemo(() => Object.values(tasks).filter(t => t.status), []);

    const [selectedMonth, setSelectedMonth] = useState(null);
    const [eqPoints, setEqPoints] = useState(null);

    const filteredTasks = useMemo(() => {
        return filtered.filter(task => {
            const taskMonth = new Date(task.start).getMonth();
            const isMonthMatch = selectedMonth === 'all' || taskMonth === +selectedMonth;

            const isPointsMatch = eqPoints === 'all' || task.points === +eqPoints;

            return isMonthMatch && isPointsMatch;
        });
    }, [filtered, selectedMonth, eqPoints]);

    const emptyRenderList = useMemo(() => (
        <View style={styles.empty}>
            <Text style={styles.emptyText}>No items to display</Text>
        </View>
    ), [])

    return (
        <View style={styles.container}>
            <View style={styles.filters}>
                <View style={styles.filterItem}>
                    <Text style={styles.label}>Choose months:</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: styles.inputIOS,
                            placeholder: styles.placeholder,
                        }}
                        onValueChange={(value) => setSelectedMonth(value)}
                        items={[
                            { label: "Select all months", value: 'all'},
                            { label: "January", value: 0 },
                            { label: "February", value: 1 },
                            { label: "March", value: 2 },
                            { label: "April", value: 3 },
                            { label: "May", value: 4 },
                            { label: "June", value: 5 },
                            { label: "July", value: 6 },
                            { label: "August", value: 7 },
                            { label: "September", value: 8 },
                            { label: "October", value: 9 },
                            { label: "November", value: 10 },
                            { label: "December", value: 11 },
                        ]}
                        placeholder={{ label: 'Select all months', value: 'all', color: '#9EA0A4' }}
                    />
                </View>
                <View style={styles.filterItem}>
                    <Text style={styles.label}>Choose points:</Text>
                    <RNPickerSelect
                        style={{
                            inputIOS: styles.inputIOS,
                            placeholder: styles.placeholder,
                        }}
                        onValueChange={(value) => setEqPoints(value)}
                        items={[
                            { label: "Select all points", value: 'all'},
                            { label: "0", value: 0 },
                            { label: "1", value: 1 },
                            { label: "2", value: 2 },
                            { label: "3", value: 3 },
                            { label: "4", value: 4 },
                            { label: "5", value: 5 },
                            { label: "6", value: 6 },
                            { label: "7", value: 7 },
                            { label: "8", value: 8 },
                            { label: "9", value: 9 },
                            { label: "10", value: 10 },
                        ]}
                        placeholder={{ label: 'Select all points', value: 'all', color: '#9EA0A4' }}
                    />
                </View>
            </View>

            <FlatList
                data={filteredTasks}
                renderItem={({ item }) => <TaskComponent task={item} />}
                ListEmptyComponent={emptyRenderList}
            />
        </View>
    );
};

export default TasksScreen;
