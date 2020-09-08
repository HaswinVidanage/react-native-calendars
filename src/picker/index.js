import React, { useCallback, memo } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    FlatList,
    Platform,
    Image,
} from 'react-native';
import Calendar from '../calendar'
import moment from 'moment';import {
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
	CalendarContentWrapper,
} from './picker.style';

import PickerHandler from "./picker.handler";
import PropTypes from "prop-types";


const Picker = (props) => {
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
	    yearChangePerformed,
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
					    source={require('./assets/previous.png')}
					    style={{
						    tintColor: '#303030'
					    }}
				    />;
			    break;
		    }
		    case 'right': {
			    onPress = onMonthAdd;
			    iconComponent = props.rightIcon
				    ? props.rightIcon
				    : <Image
					    source={require('./assets/next.png')}
					    style={{
						    tintColor: '#303030'
					    }}
				    />;
			    break;
		    }
		    case 'down': {
			    iconComponent = props.downIcon
				    ? props.downIcon
				    : <Image
					    source={require('./assets/down.png')}
					    style={{
						    tintColor: '#303030'
					    }}
				    />;

			    return (
				    <DropDownArrow
					    style={{
						    padding: 10,
					    }}
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
		    >
			    {iconComponent}
		    </MonthPaginationButton>
	    );
    };

    const renderCalendarWithSelectableDateWithCallback = useCallback(
	    (item) => renderCalendarWithSelectableDate(item),
	    [selectedDay, selectedDateRange, currentPage, yearChangePerformed, rows]
    );

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
	                        "stylesheet.day.period": {
		                        base: {
			                        alignItems: "center",
			                        height: 34,
			                        overflow: "hidden",
			                        width: 38,
		                        },
	                        },
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

    const getItemLayoutWithCallback = useCallback(
	    (data, index) => getItemLayout(data, index),
	    [currentPage, yearChangePerformed]
    );

    const getItemLayout = (data, index) => {
        return {
            length: props.calendarWidth,
            offset: (props.calendarWidth) * index, index
        };
    };

    const yearButton = (idx) => {
	    const isSelected = (yearList[idx] === selectedYear);
        return (
            <YearButton onPress={() => handleYearPress(idx)} key={idx}>
	            <YearTextWrapper isSelected={isSelected} key={idx} primaryColor={props.primaryColor}>
		            <YearText isSelected={isSelected} key={idx}>
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
          table.push(<YearRow key={i}>{children}</YearRow>)
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
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={rows}
                renderItem={renderCalendarWithSelectableDateWithCallback}
                initialScrollIndex={getInitialScrollIndex()}
                pagingEnabled={true}
                ref={flatListRef}
                onScrollToIndexFailed={()=>{}}
                onMomentumScrollEnd={onMomentumScrollEnd}
                initialListSize={props.pastScrollRange + props.futureScrollRange}
                keyExtractor={(item, index) => String(item)}
                removeClippedSubviews={props.removeClippedSubviews}
                getItemLayout={getItemLayoutWithCallback}
                extraData={{
                    selectedYear,
                    currentDate,
                }}
                pageSize={1}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={Platform.OS === 'android'? 50: 10}
                initialNumToRender={1}
                windowSize={ Platform.OS === 'android' ? props.pastScrollRange + props.futureScrollRange: 1 }
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

const DEFAULT_PAST_SCROLL_RANGE = 24;
const DEFAULT_FUTURE_SCROLL_RANGE = 24;

Picker.defaultProps = {
	isPickerVisible: true,
	handlePickerVisibility: (isVisible) => {},
	onSelectedYearChanged: (selectedYear) => {},
	onOkBtnPress: ({selectedDay, selectedDateRange}) => {},
	onPageChange: () => {},
	onPickerClosed: () => {},
	onMonthChange: () => {},
	onYearSelectedToggled: () => {},
    pastScrollRange: DEFAULT_PAST_SCROLL_RANGE,
    futureScrollRange: DEFAULT_FUTURE_SCROLL_RANGE,
    calendarWidth: 328,
	calendarHeight: 310,
    removeClippedSubviews: Platform.OS === 'android',
    isMultiSelect: true,
	primaryColor: '#F9A350',
	disabledTextColor: '#808080',
	cancelText: 'CANCEL',
	okText: 'OK',

	pageSize: 1,
	maxToRenderPerBatch: 1,
	updateCellsBatchingPeriod: Platform.OS === 'android'? 50: 10,
	initialNumToRender: 1,
	windowSize: Platform.OS === 'android' ? (DEFAULT_PAST_SCROLL_RANGE + DEFAULT_PAST_SCROLL_RANGE): 1
};

Picker.propTypes = {
	/** Boolean flag to open and close the picker **/
	isPickerVisible: PropTypes.bool,
	/** Boolean flag to toggle single date selection and multi date selection **/
	isMultiSelect: PropTypes.bool,
	/**  Callback to handle picker visibility **/
	handlePickerVisibility: PropTypes.func,
	/** Callback when year selection is changed **/
	onSelectedYearChanged: PropTypes.func,
	/** Callback when ok button is pressed **/
	onOkBtnPress: PropTypes.func,
	/** Callback when page is changed**/
	onPageChange: PropTypes.func,
	/** Callback on cancel button is clicked**/
	onPickerClosed: PropTypes.func,
	/** Callback on month changes**/
	onMonthChange: PropTypes.func,
	/** Callback on year selection is toggled **/
	onYearSelectedToggled: PropTypes.func,
	/** Max amount of months allowed to scroll to the past. Default = 24 */
	pastScrollRange: PropTypes.number,
	/** Max amount of months allowed to scroll to the future. Default = 24 */
	futureScrollRange: PropTypes.number,
	/** Used when calendar scroll is horizontal, default is device width, pagination should be disabled */
	calendarWidth: PropTypes.number,
	/** Dynamic calendar height */
	calendarHeight: PropTypes.number,
	/**  Primary color used for theme **/
	primaryColor: PropTypes.string,
	/**  Disabled text color **/
	disabledTextColor: PropTypes.string,
	/** Cancel button text **/
	cancelText: PropTypes.string,
	/** Ok button text **/
	okText: PropTypes.string,
};

const arePropsEqual = (prevProps, nextProps) => {
	return prevProps === nextProps;
};

export default memo(Picker, arePropsEqual);

// export default Picker;

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
