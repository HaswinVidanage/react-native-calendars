import React, { Fragment} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    FlatList,
    Platform
} from 'react-native';
// import {Calendar} from 'react-native-calendars';
import Calendar from '../../../src/calendar/index'
import moment from 'moment';
import _ from 'lodash';
import styled from 'styled-components/native';
import PickerHandler from "./Picker.handler";
import {CalendarList} from 'react-native-calendars';
const testIDs = require('../testIDs');

const StyledText = styled.Text`
  color:  red;
`;

const PickerModal = styled.View`
	flex: 1;
	justifyContent: center;
	alignItems: center;
	marginTop: 22px;
	backgroundColor: purple
`;

const ModalView = styled.View`
	backgroundColor: red;
	width: ${props => props.calendarWidth ? props.calendarWidth : '328px'};
	borderRadius: 5px;
	margin: 20px;
	shadowColor: #000;
	shadowOffset: {
		width: 0px,
		height: 2px
	};
	shadowOpacity: 0.25;
	shadowRadius: 3.84px;
	elevation: 5;
`;

const PickerHeader = styled.View`
	backgroundColor: #F9A350; 
	height: 120px;
`;

const PickerTitle = styled.View`
	flex: 1; 
	marginLeft: 24px;
	marginRight: 24px;
	marginTop: 16px;
	marginBottom: 16px;
`;

const PickerTitleWrapper= styled.View`
	height: 20px;
`;

const PickerTitleText= styled.Text`
	fontSize: 14;
	color: #FFF;
`;

const SelectedDateWrapper = styled.View`
	flex:1;
	flexDirection: row;
	alignItems: flex-end;
`;

const SelectedDateText = styled.Text`
	fontSize: 32;
	color: #FFF;
`;

const PickerTopMenu = styled.View`
	backgroundColor: white; 
	height: 56px;
`;

const PickerContent = styled.View`
	backgroundColor: yellow;
	height:310px;
`;

const PickerBottomMenu = styled.View`
	backgroundColor: white; 
	height: 56px;
`;

const PickerTopMenuWrapper = styled.View`
    flex:1;
	flexDirection: row;
	paddingLeft: 24px;
	paddingRight: 24px;
`;

const YearSelector = styled.View`
	flex: 1;
	backgroundColor: green;
`;

const MonthPagination = styled.View`
	flex: 1;
	backgroundColor: yellow;
	flexDirection: row;
`;

const YearChangeButton = styled.TouchableOpacity`
    flex:1
`;

const MonthPaginationButtonBack = styled.TouchableOpacity`
    flex:1
`;

const MonthPaginationButtonForward = styled.TouchableOpacity`
    flex:1
`;

const FlexViewRed = styled.View`
	flex: 1;
	backgroundColor: red;
`;

const FlexViewYellow = styled.View`
	flex: 1;
	backgroundColor: yellow;
`;

const CalendarContentWrapper = styled.View`
	flex: 1;
	width: ${props => props.calendarWidth ? props.calendarWidth : '328px'};
	backgroundColor: green;
`;



const PickerScreen = (props) => {
    let {
        handlePickerVisibility,
        isPickerVisible,
        onDayPress,
        selected,
        onMonthChangeForward,
        onMonthChangeBackward,
        currentDate,
        isYearSelectionVisible,
        toggleYearSelection,
        rows,
        flatListRef,
        scrollToDate,
        onMomentumScrollEnd,
        getInitialScrollIndex
    } = PickerHandler(props);


    const getDisabledDates = (startDate, endDate, daysToDisable) => {
        const disabledDates = {};
        const start = moment(startDate);
        const end = moment(endDate);
        for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
            if (_.includes(daysToDisable, m.weekday())) {
                disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
            }
        }
        return disabledDates;
    };

    const renderHorizontalCalendar = () => {
        return (
            <CalendarList
                testID={testIDs.horizontalList.CONTAINER}
                // markedDates={markedDates}
                current={currentDate}
                pastScrollRange={24}
                futureScrollRange={24}
                horizontal
                pagingEnabled
                // onDayPress={(day) => {
                //     setNewDaySelected(day.dateString);
                // }}
            />
        );
    };
    const renderCalendarWithSelectableDate = ({item}) => {
        console.log('HDV row: ', item);
        return (
            <CalendarContentWrapper>
                <Calendar
                    onMonthChange={(date) => console.log('hdv onMonthChange', date)}
                    // renderTopHeader={false}
                    testID={testIDs.calendars.FIRST}
                    current={item}
                    style={styles.calendar}
                    hideExtraDays
                    // enableSwipeMonths={true}
                    onDayPress={onDayPress}
                    markedDates={{
                        [selected.dateString]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: 'orange',
                            selectedTextColor: 'red'
                        }
                    }}
                />
            </CalendarContentWrapper>
        );
    };

    const renderCalendarWithWeekNumbers = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with week numbers</Text>
                <Calendar
                    style={styles.calendar}
                    hideExtraDays
                    showWeekNumbers
                />
            </Fragment>
        );
    };

    const renderCalendarWithMarkedDatesAndHiddenArrows = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with marked dates and hidden arrows</Text>
                <Calendar
                    style={styles.calendar}
                    current={'2012-05-16'}
                    minDate={'2012-05-10'}
                    maxDate={'2012-05-29'}
                    disableAllTouchEventsForDisabledDays
                    firstDay={1}
                    markedDates={{
                        '2012-05-23': {selected: true, marked: true, disableTouchEvent: true},
                        '2012-05-24': {selected: true, marked: true, dotColor: 'red'},
                        '2012-05-25': {marked: true, dotColor: 'red'},
                        '2012-05-26': {marked: true},
                        '2012-05-27': {disabled: true, activeOpacity: 0, disableTouchEvent: false}
                    }}
                    hideArrows={true}
                    // disabledByDefault={true}
                />
            </Fragment>
        );
    };

    const renderCalendarWithPeriodMarkingAndSpinner = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with period marking and spinner</Text>
                <Calendar
                    // style={styles.calendar}
                    current={'2012-05-16'}
                    minDate={'2012-05-10'}
                    displayLoadingIndicator
                    markingType={'period'}
                    theme={{
                        calendarBackground: '#333248',
                        textSectionTitleColor: 'white',
                        textSectionTitleDisabledColor: 'gray',
                        dayTextColor: 'red',
                        todayTextColor: 'white',
                        selectedDayTextColor: 'white',
                        monthTextColor: 'white',
                        indicatorColor: 'white',
                        selectedDayBackgroundColor: '#333248',
                        arrowColor: 'white',
                        // textDisabledColor: 'red',
                        'stylesheet.calendar.header': {
                            week: {
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }
                        }
                    }}
                    markedDates={{
                        '2012-05-17': {disabled: true},
                        '2012-05-08': {textColor: 'pink'},
                        '2012-05-09': {textColor: 'pink'},
                        '2012-05-14': {startingDay: true, color: 'green', endingDay: true},
                        '2012-05-21': {startingDay: true, color: 'green'},
                        '2012-05-22': {endingDay: true, color: 'gray'},
                        '2012-05-24': {startingDay: true, color: 'gray'},
                        '2012-05-25': {color: 'gray'},
                        '2012-05-26': {endingDay: true, color: 'gray'}
                    }}
                />
            </Fragment>
        );
    };

    const renderCalendarWithPeriodMarkingAndDotMarking = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with period marking and dot marking</Text>
                <Calendar
                    current={'2012-05-16'}
                    minDate={'2012-05-01'}
                    disabledDaysIndexes={[0, 6]}
                    markingType={'period'}
                    markedDates={{
                        '2012-05-15': {marked: true, dotColor: '#50cebb'},
                        '2012-05-16': {marked: true, dotColor: '#50cebb'},
                        '2012-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                        '2012-05-22': {
                            color: '#70d7c7',
                            customTextStyle: {
                                color: '#FFFAAA',
                                fontWeight: '700'
                            }},
                        '2012-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                        '2012-05-24': {color: '#70d7c7', textColor: 'white'},
                        '2012-05-25': {endingDay: true, color: '#50cebb', textColor: 'white',
                            customContainerStyle: {
                                borderTopRightRadius: 5,
                                borderBottomRightRadius: 5
                            }},
                        ...getDisabledDates('2012-05-01', '2012-05-30', [0, 6])
                    }}
                />
            </Fragment>
        );
    };

    const renderCalendarWithMultiDotMarking = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with multi-dot marking</Text>
                <Calendar
                    style={styles.calendar}
                    current={'2012-05-16'}
                    markingType={'multi-dot'}
                    markedDates={{
                        '2012-05-08': {
                            selected: true,
                            dots: [
                                {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
                                {key: 'massage', color: 'red', selectedDotColor: 'white'}
                            ]
                        },
                        '2012-05-09': {
                            disabled: true,
                            dots: [
                                {key: 'vacation', color: 'green', selectedDotColor: 'red'},
                                {key: 'massage', color: 'red', selectedDotColor: 'green'}
                            ]
                        }
                    }}
                />
            </Fragment>
        );
    };

    const renderCalendarWithMultiPeriodMarking = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with multi-period marking</Text>
                <Calendar
                    style={styles.calendar}
                    current={'2012-05-16'}
                    markingType={'multi-period'}
                    markedDates={{
                        '2012-05-16': {
                            periods: [
                                {startingDay: true, endingDay: false, color: 'green'},
                                {startingDay: true, endingDay: false, color: 'orange'}
                            ]
                        },
                        '2012-05-17': {
                            periods: [
                                {startingDay: false, endingDay: true, color: 'green'},
                                {startingDay: false, endingDay: true, color: 'orange'},
                                {startingDay: true, endingDay: false, color: 'pink'}
                            ]
                        },
                        '2012-05-18': {
                            periods: [
                                {startingDay: true, endingDay: true, color: 'orange'},
                                {color: 'transparent'},
                                {startingDay: false, endingDay: false, color: 'pink'}
                            ]
                        }
                    }}
                />
            </Fragment>
        );
    };

    const renderCalendarWithCustomMarkingType = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Custom calendar with custom marking type</Text>
                <Calendar
                    style={styles.calendar}
                    onDayLongPress={this.onDayLongPress}
                    hideExtraDays
                    current={'2018-03-01'}
                    minDate={'2018-03-01'}
                    markingType={'custom'}
                    markedDates={{
                        '2018-03-01': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'white',
                                    elevation: 2
                                },
                                text: {
                                    color: 'red'
                                }
                            }
                        },
                        '2018-03-08': {
                            selected: true
                        },
                        '2018-03-09': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'red',
                                    elevation: 4
                                },
                                text: {
                                    color: 'white'
                                }
                            }
                        },
                        '2018-03-14': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'green'
                                },
                                text: {
                                    color: 'white'
                                }
                            }
                        },
                        '2018-03-15': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'black',
                                    elevation: 2
                                },
                                text: {
                                    color: 'yellow'
                                }
                            }
                        },
                        '2018-03-21': {
                            disabled: true
                        },
                        '2018-03-28': {
                            customStyles: {
                                text: {
                                    color: 'black',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        '2018-03-30': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'pink',
                                    elevation: 4,
                                    borderColor: 'purple',
                                    borderWidth: 5
                                },
                                text: {
                                    marginTop: 3,
                                    fontSize: 11,
                                    color: 'black'
                                }
                            }
                        },
                        '2018-03-31': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'orange',
                                    borderRadius: 0
                                }
                            }
                        }
                    }}
                />
            </Fragment>
        );
    };

    const renderCalendarWithCustomDay = () => {
        return (
            <Fragment>
                <Text style={styles.text}>Calendar with custom day component</Text>
                <Calendar
                    testID={testIDs.calendars.LAST}
                    style={[
                        styles.calendar,
                        {
                            height: 250,
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgrey'
                        }
                    ]}
                    dayComponent={({date, state}) => {
                        return (
                            <View>
                                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                                    {date.day}
                                </Text>
                            </View>
                        );
                    }}
                />
            </Fragment>
        );
    };


    const getItemLayout = (data, index) => {
        return {
            length: props.calendarWidth,
            offset: (props.calendarWidth) * index, index
        };
    };

    const renderCalendarSlider = () => {
        if (isYearSelectionVisible) {
            return;
        }

        return (
            <FlatList
                horizontal
                data={rows}
                renderItem={renderCalendarWithSelectableDate}
                pageSize={1}
                initialScrollIndex={getInitialScrollIndex()}
                pagingEnabled={true}
                ref={flatListRef}
                onScrollToIndexFailed={()=>{}}
                onMomentumScrollEnd={onMomentumScrollEnd}
                initialListSize={props.pastScrollRange + props.futureScrollRange}
                keyExtractor={(item, index) => String(item)}
                removeClippedSubviews={props.removeClippedSubviews}
                getItemLayout={getItemLayout}
            />
        );
    };

    return (
        <View style={{flex:1 , justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => handlePickerVisibility(true)}>
                <StyledText> Show Picker </StyledText>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isPickerVisible}
                onRequestClose={() => {
                    handlePickerVisibility(false)
                }}
            >
                <PickerModal>
                    <ModalView>
                        <PickerHeader>
                            <PickerTitle>
                                <PickerTitleWrapper>
                                    <PickerTitleText>Select Date</PickerTitleText>
                                </PickerTitleWrapper>
                                <SelectedDateWrapper>
                                    <SelectedDateText>
                                        {moment(selected.dateString).format('ddd')}, {moment(selected.dateString).format('MMM')} {moment(selected.dateString).format('DD')}
                                    </SelectedDateText>
                                </SelectedDateWrapper>
                            </PickerTitle>
                        </PickerHeader>
                        <PickerTopMenu>
                            <PickerTopMenuWrapper>
                                <YearSelector>
                                    <YearChangeButton onPress={()=> toggleYearSelection()}>
                                        <FlexViewYellow/>
                                    </YearChangeButton>
                                </YearSelector>
                                <MonthPagination>
                                    <MonthPaginationButtonBack onPress={()=> onMonthChangeBackward()}>
                                        <FlexViewRed/>
                                    </MonthPaginationButtonBack>

                                    <MonthPaginationButtonForward onPress={()=> onMonthChangeForward()}>
                                        <FlexViewYellow/>
                                    </MonthPaginationButtonForward>
                                </MonthPagination>
                            </PickerTopMenuWrapper>
                        </PickerTopMenu>
                        <PickerContent>
                            {renderCalendarSlider()}
                        </PickerContent>
                        <PickerBottomMenu>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    // onMonthChange();
                                    handlePickerVisibility(false);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    onMonthChangeBackward()
                                }}
                            >
                                <Text style={styles.textStyle}>Back</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    onMonthChangeForward()
                                }}
                            >
                                <Text style={styles.textStyle}>Forward</Text>
                            </TouchableHighlight>
                        </PickerBottomMenu>
                    </ModalView>
                </PickerModal>
            </Modal>
        </View>
    );

};

PickerScreen.defaultProps = {
    pastScrollRange: 24,
    futureScrollRange: 24,
    calendarWidth: 328,
    removeClippedSubviews: Platform.OS === 'android',
};

export default PickerScreen;

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10
    },
    text: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'lightgrey',
        fontSize: 16
    }
});
