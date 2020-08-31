import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

const PickerHandler = props => {

	const flatListRef = useRef();
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedDay, setSelectedDay] = useState({});
	const [currentDate,  setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
	const [rows, setRows] = useState([]);
	const [yearList, setYearList] = useState([]);
	const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
	const [yearChangePerformed, setYearChangePerformed] = useState(false);

	useEffect(() => {
		getInitialRows();
	}, [currentDate]);

	useEffect(() => {
		populateYears();
	}, []);

	useEffect(() => {
		if(props.onSelectedYearChanged) {
			props.onSelectedYearChanged(selectedYear);
		}
	}, [selectedYear]);

	useEffect(() => {
		if(props.onPageChange) {
			props.onPageChange(currentPage);
		}
	}, [currentPage]);

	useEffect(() => {
		// set current current page based on the current date.
		// todo make it faster
		//  use obj instead of array https://stackoverflow.com/a/54143895/3418572
		setCurrentPage(getInitialScrollIndex())
	}, [rows]);

	const handlePickerVisibility = (isVisible) => {
		if (props.handlePickerVisibility) {
			props.handlePickerVisibility(isVisible)
		}
	};

	const [selectedDateRange, setSelectedDateRange] =  useState([]);

	const onDayPress = (day) => {
		const isMultiSelect = props.isMultiSelect;
		if (isMultiSelect) {
			let dates = [];
			if (selectedDateRange.length < 2) {
				dates = selectedDateRange;
			}
			dates.push(day);

			if (dates.length === 2) {
				// check if from date is before to date, else do the switch
				const date1 = dates[0];
				const date2 = dates[1];
				const swappedDateRange = [];


				if (moment(date1.dateString).isAfter(date2.dateString)) {
					swappedDateRange[0] = date2;
					swappedDateRange[1] = date1;
					setSelectedDateRange(swappedDateRange);
					return;
				}
			}

			setSelectedDateRange(dates);
		}
		setSelectedDay(day);
	};

	const onMonthChangeForward = () => {
		scrollToIndex(currentPage + 1);
	};

	const onMonthChangeBackward = () => {
		if (currentPage === 0) {
			return;
		}
		scrollToIndex(currentPage - 1);
	};

	const [isYearSelectionVisible, setIsYearSelectionVisible] = useState(false);
	const toggleYearSelection = () => {
		setIsYearSelectionVisible(!isYearSelectionVisible)
	};

	const populateYears = () => {
		const yearRange = 15;

		const yearArr = [];
		const initYear = moment().subtract(Math.floor(yearRange/2) , 'years');
		for(let i=0; i < yearRange; i++) {
			const year = initYear.clone().add(i, 'years').format('YYYY');
			yearArr.push(year)
		}
		setYearList(yearArr);
	};

	const handleYearPress = (index) => {
		if (yearList[index] === selectedYear) {
			setIsYearSelectionVisible(false);
			return;
		}
		setYearChangePerformed(true);
		setRows([]); // reset flatlist to avoid flatlist from breaking
		setSelectedYear(yearList[index]);
		setIsYearSelectionVisible(false);
		updateCurrentMonthDate(yearList[index]);
	};

	const updateCurrentMonthDate = (year) => {
		const date = moment(rows[currentPage]).year(year).format('YYYY-MM-DD');
		setCurrentDate(date);
		scrollToDate(date);
	};

	const getInitialRows = () => {
		const rows = [];
		const initDate = moment(currentDate).subtract(props.pastScrollRange , 'months');
		for(let i=0; i < (props.pastScrollRange + props.futureScrollRange + 1 ); i++) {
			const date = moment(initDate.clone()).add(i, "month").format('YYYY-MM-01');
			rows.push(date);
		}
		setRows(rows);
		scrollToDate(moment().format('YYYY-MM-01'));
	};

	const scrollToDate = (date) =>  {
		const dateKey = moment(date).format('YYYY-MM-01');
		if (!flatListRef.current) {
			return;
		}
		flatListRef.current.scrollToItem({ animated: true, item: dateKey })
	};

	const scrollToIndex = (index) => {
		if (!flatListRef.current || index >= rows.length) {
			return;
		}
		flatListRef.current.scrollToIndex({ animated: true, index })
	};



	const onMomentumScrollEnd = (e) => {
		// Idea is to stop onMomentumScrollEnd from triggering on year change. Since it will always return 0 as current page number
		if (yearChangePerformed) {
			setYearChangePerformed(false);
			return;
		}

		let contentOffset = e.nativeEvent.contentOffset;
		let viewSize = e.nativeEvent.layoutMeasurement;

		// Divide the horizontal offset by the width of the view to see which page is visible
		let pageNum = Math.floor(contentOffset.x / viewSize.width);
		setCurrentPage(pageNum);
	};

	const getInitialScrollIndex = () => {
		const currentDateKey = moment(currentDate).format('YYYY-MM-01');
		const indexForCurrentMonth = rows.findIndex(item => item === currentDateKey);
		if (indexForCurrentMonth === -1) {
			return -1;
		}
		return indexForCurrentMonth;
	};

	const handleOkBtnPress = () => {
		if (props.isMultiSelect) {
			console.log('HDV multi selectedDateRange: ', selectedDateRange);
		}

		console.log('HDV single selectedDay: ', selectedDay)
	};

	const [isOkButtonDisabled, setOkButtonDisabled] = useState(false);

	useEffect(() => {
		// conditions for ok button to be disabled.
		// if isMultiSelect, selectedDateRange needs to be of length = 2
		// selectedDay should not be null
		const checkForMultiSelect = (props.isMultiSelect && selectedDateRange.length === 2);
		const checkForSingleSelect = (!props.isMultiSelect && selectedDay);

		let isDisabled = !(checkForMultiSelect || checkForSingleSelect);

		if (props.isMultiSelect) {
			isDisabled = !(props.isMultiSelect && selectedDateRange.length === 2);
		}

		setOkButtonDisabled(isDisabled);
	}, [props.isMultiSelect, selectedDateRange, selectedDay]);

	return {
		handlePickerVisibility,
		onDayPress,
		selectedDay,
		selectedDateRange,
		onMonthChangeForward,
		onMonthChangeBackward,
		currentDate,
		isYearSelectionVisible,
		toggleYearSelection,
		rows,
		flatListRef,
		scrollToDate,
		onMomentumScrollEnd,
		getInitialScrollIndex,
		yearList,
		selectedYear,
		handleYearPress,
		currentPage,
		handleOkBtnPress,
		isOkButtonDisabled
	};
};

export default PickerHandler;
