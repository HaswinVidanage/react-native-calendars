import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    FlatList,
    Platform,
    Image
} from 'react-native';
// import {Calendar} from 'react-native-calendars';
import Calendar from '../../../src/calendar/index'
import moment from 'moment';
import {
	PickerModal,
	ModalView,
	PickerHeader,
	PickerTitle,
	PickerTitleWrapper,
	PickerTitleText,
	SelectedDateWrapper,
	SelectedDateText,
	PickerTopMenu,
	PickerContent,
	PickerBottomMenu,
	PickerTopMenuWrapper,
	YearSelector,
	MonthPagination,
	YearChangeButton,
	MonthPaginationButton,
	DropDownArrow,
	YearGrid,
	YearRow,
	YearButton,
	YearLabelWrapper,
	FooterBottom,
	FooterButtonGrid,
	FooterButton,
	YearTextWrapper,
	FooterText,
	YearText,
	CalendarContentWrapper
} from './picker.style';
import PickerHandler from "./Picker.handler";
const testIDs = require('../testIDs');


const PickerScreen = (props) => {
    let {
        handlePickerVisibility,
        onDayPress,
        selectedDay,
        selectedDateRange,
        onMonthAdd,
        onMonthReduce,
        currentDate,
        isYearSelectionVisible,
        toggleYearSelection,
        rows,
        flatListRef,
        scrollToDate,
        onMomentumScrollEnd,
        getInitialScrollIndex,
        yearList,
        handleYearPress,
        selectedYear,
        currentPage,
	    handleOkBtnPress,
	    isOkButtonDisabled,
	    onCancelBtnPress,
    } = PickerHandler(props);

    const renderArrowButton = (type) => {
    	let iconComponent = <View/>;
    	let onPress =  () => {};
    	switch (type) {
		    case 'left': {
			    onPress = onMonthReduce;
			    iconComponent = props.leftIcon
				    ? props.leftIcon
				    : <Image
					    source={require('../../../src/calendar/img/previous.png')}
					    style={{
						    tintColor: '#00BBF2'
					    }}
				    />;
			    break;
		    }
		    case 'right': {
			    onPress = onMonthAdd;
			    iconComponent = props.rightIcon
				    ? props.rightIcon
				    : <Image
					    source={require('../../../src/calendar/img/next.png')}
					    style={{
						    tintColor: '#00BBF2'
					    }}
				    />;
			    break;
		    }
		    case 'down': {
			    iconComponent = props.downIcon
				    ? props.downIcon
				    : <Image
					    source={require('../../../src/img/down.png')}
					    style={{
						    tintColor: '#00BBF2'
					    }}
				    />;

			    return (
				    <DropDownArrow
					    style={{
						    padding: 10,
					    }}
					    hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
				    >
					    {iconComponent}
				    </DropDownArrow>
			    )
		    }
	    }

	    return (
		    <MonthPaginationButton
			    onPress={onPress}
			    style={{
				    padding: 10,
			    }}
			    hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
		    >
			    {iconComponent}
		    </MonthPaginationButton>
	    );
    };

    const renderCalendarWithSelectableDate = ({item}) => {
        const currentYear =  moment(item).format('YYYY');
        const currentMonth = moment(item).format('MMMM');
        let leftArrow = renderArrowButton('left');
        let rightArrow = renderArrowButton('right');
        let downArrow = renderArrowButton('down');

        return (

            <View>
                <PickerTopMenu>
                    <PickerTopMenuWrapper>
                        <YearSelector>
                            <YearChangeButton onPress={()=> toggleYearSelection()}>
                                <YearLabelWrapper>
                                    <Text>
                                        {`${currentMonth} ${currentYear}` }
                                    </Text>

                                    {downArrow}
                                </YearLabelWrapper>
                            </YearChangeButton>
                        </YearSelector>
                        <MonthPagination>
                            {leftArrow}
                            {rightArrow}
                        </MonthPagination>
                    </PickerTopMenuWrapper>
                </PickerTopMenu>
                <CalendarContentWrapper>
                    <Calendar
                        renderTopHeader={false}
                        testID={testIDs.calendars.FIRST}
                        current={item}
                        disableMonthChange
                        style={styles.calendar}
                        hideExtraDays
                        onDayPress={onDayPress}
                        markingType={props.isMultiSelect ? 'period': 'custom'}
                        markedDates={getMarkedDates()}
                        theme={{
	                        backgroundColor: '#ffffff',
	                        calendarBackground: '#ffffff',
	                        selectedDayTextColor: '#ffffff',
	                        selectedDotColor: '#ffffff',
	                        selectedDayBackgroundColor: props.primaryColor,
	                        todayTextColor: props.primaryColor,
	                        dotColor :props.primaryColor,
                        }}
                    />
                </CalendarContentWrapper>
            </View>
        );
    };

    const getDateRange = (date1, date2) => {
        const dates = [];
        // assign first date
        let date = moment(date1.dateString);
        dates[0] = date1.dateString;
        while (date.isBefore(date2.dateString)) {
            date = date.add(1, 'days');
            dates.push(date.clone().format('YYYY-MM-DD'));
        }

        return dates;
    };

    const getMarkedDatesFromRange = (date1, date2) => {
        const dateRange = getDateRange(date1, date2);
        let markedDates = {};
        if (dateRange.length === 0) {
            return markedDates;
        }

        for (let i=0; i < dateRange.length; i ++ ) {
            if (i === 0) {
                markedDates[dateRange[0]]={startingDay: true, color: props.primaryColor, textColor: 'white'};
                continue;
            }
            if (i === dateRange.length - 1) {
                markedDates[dateRange[i]]={endingDay: true, color: props.primaryColor, textColor: 'white'};
                continue;
            }
            markedDates[dateRange[i]]={color: `${props.primaryColor}33`, textColor: '#000'};
        }

        return markedDates;
    };

    const getMarkedDates = () => {

    	const containerStyle = {
		    customStyles: {
			    container: {
				    backgroundColor: props.primaryColor,
				    borderRadius: 20
			    },
			    text: {
				    color: 'white',
				    fontWeight: 'bold'
			    }
		    }
	    };

    	const getContainerStyle = () => {
    		if  (props.isMultiSelect) {
    			return {}
		    }
    		return containerStyle;
	    };
        if (props.isMultiSelect) {
            if (selectedDateRange.length === 0) {
                return {
                    [selectedDay.dateString]: {color: props.primaryColor, textColor:  'white' , ...getContainerStyle()}
                }
            }

            if (selectedDateRange.length === 1) {
                return {
                    [selectedDateRange[0].dateString]: {color: props.primaryColor, textColor:  'white' , ...getContainerStyle()}
                }
            }

            if (selectedDateRange.length === 2) {
                const markedDatesForRange = getMarkedDatesFromRange(selectedDateRange[0], selectedDateRange[1]);
                return markedDatesForRange;
            }
        }

        return {
            [selectedDay.dateString]: {color: props.primaryColor, textColor:  'white', ...getContainerStyle()}
        };
    };

    const getSelectedDateTitle = () => {
        if (props.isMultiSelect) {
            if (selectedDateRange.length === 0){
                return `${moment(selectedDay.dateString).format('MMM')} ${moment(selectedDay.dateString).format('DD')}`;
            }

            if (selectedDateRange.length === 1){
                const date = selectedDateRange[0].dateString;
                return `${moment(date).format('MMM')} ${moment(date).format('DD')}`;
            }

            if (selectedDateRange.length === 2){
                const date1 = selectedDateRange[0].dateString;
                const date2 = selectedDateRange[1].dateString;
                const date1Str = `${moment(date1).format('MMM')} ${moment(date1).format('DD')}`;
                const date2Str = `${moment(date2).format('MMM')} ${moment(date2).format('DD')}`;
                return `${date1Str} - ${date2Str}`;
            }
        }

        return `${moment(selectedDay.dateString).format('ddd')}, ${moment(selectedDay.dateString).format('MMM')} ${moment(selectedDay.dateString).format('DD')}`;
    };

    const getTitleHeaderText = () => {
        if (props.isMultiSelect) {
            return "Select Date Range"
        }
        return 'Select Date';
    };

    const renderStaticHeader = () => {

        return (
            <PickerHeader>
                <PickerTitle>
                    <PickerTitleWrapper>
                        <PickerTitleText>
                            {getTitleHeaderText()}
                        </PickerTitleText>
                    </PickerTitleWrapper>
                    <SelectedDateWrapper>
                        <SelectedDateText>
                            {getSelectedDateTitle()}
                        </SelectedDateText>
                    </SelectedDateWrapper>
                </PickerTitle>
            </PickerHeader>
        );
    };

    const getItemLayout = (data, index) => {
        return {
            length: props.calendarWidth,
            offset: (props.calendarWidth) * index, index
        };
    };

    const yearButton = (idx) => {
	    const isSelected = (yearList[idx] === selectedYear);
        return (
            <YearButton onPress={() => handleYearPress(idx)}>
	            <YearTextWrapper isSelected={isSelected} primaryColor={props.primaryColor}>
		            <YearText isSelected={isSelected}>
			            {yearList[idx]}
		            </YearText>
	            </YearTextWrapper>
            </YearButton>
        );
    };

    const yearSelectionContainer = () => {
      const table = [];
      let idx=0;
      for (let i=0; i< 5; i++) {
          let children = [];
          for (let j=0; j< 3; j++, idx ++) {
              const  yearBtn = yearButton(idx);
              children.push(
                  yearBtn
              );
          }
          table.push(<YearRow>{children}</YearRow>)
      }

      return (
          <YearGrid>
              {table}
          </YearGrid>
      );
    };

    const renderStaticFooter = () => {
    	return (
		    <FooterBottom>
			    <FooterButtonGrid>
				    <FooterButton onPress={() => onCancelBtnPress()}>
					    <FooterText
						    primaryColor={props.primaryColor}>
						    {props.cancelText}
					    </FooterText>
				    </FooterButton>
				    <FooterButton
					    disabled={isOkButtonDisabled}
					    onPress={() => handleOkBtnPress()}>
					    <FooterText
						    disabled={isOkButtonDisabled}
						    disabledTextColor={props.disabledTextColor}
						    primaryColor={props.primaryColor}>
						    {props.okText}
					    </FooterText>
				    </FooterButton>
			    </FooterButtonGrid>
		    </FooterBottom>
	    );
    };

    const renderCalendarSlider = () => {
        if (isYearSelectionVisible) {
            return yearSelectionContainer()
        }

        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
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
                extraData={{
                    selectedYear,
                    currentDate
                }}
                maxToRenderPerBatch={3}
                updateCellsBatchingPeriod={10}
                initialNumToRender={3}
                windowSize={1}
            />
        );
    };

    return (
	    <Modal
		    animationType="slide"
		    transparent={true}
		    visible={props.isPickerVisible}
		    onRequestClose={() => {
			    handlePickerVisibility(false)
		    }}
	    >
		    <PickerModal>
			    <ModalView>
				    {renderStaticHeader()}
				    <PickerContent>
					    {renderCalendarSlider()}
				    </PickerContent>
				    <PickerBottomMenu>
					    {renderStaticFooter()}
				    </PickerBottomMenu>
			    </ModalView>
		    </PickerModal>
	    </Modal>
    );

};

PickerScreen.defaultProps = {
	isPickerVisible: true,
	handlePickerVisibility: (isVisible) => {},
	onSelectedYearChanged: (selectedYear) => {},
	onOkBtnPress: ({selectedDay, selectedDateRange}) => {},
	onPageChange: () => {},
	onPickerClosed: () => {},
	onMonthChange: () => {},
	onYearSelectedToggled: () => {},
    pastScrollRange: 24,
    futureScrollRange: 24,
    calendarWidth: 328,
    removeClippedSubviews: Platform.OS === 'android',
    isMultiSelect: true,
	primaryColor: '#F9A350',
	disabledTextColor: '#808080',
	cancelText: 'CANCEL',
	okText: 'OK'
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
