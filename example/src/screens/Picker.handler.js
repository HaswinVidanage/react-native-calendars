import React, { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import {parseDate} from "../../../src/interface";
import dateutils from "../../../src/dateutils";

const PickerHandler = props => {

	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const flatListRef = useRef();
	const [currentPage, setCurrentPage] = useState(0);
	const [selected, setSelected] = useState('');
	const [currentDate,  setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
	const [rows, setRows] = useState([]);
	const [yearList, setYearList] = useState([]);
	const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
	useEffect(() => {
		getInitialRows();
		populateYears();
	}, [currentDate]);

	useEffect(() => {
		console.log('HDV currentPage changed: ', currentPage);
	}, [currentPage]);

	useEffect(() => {
		// set current current page based on the current date.
		// todo make it faster
		//  use obj instead of array https://stackoverflow.com/a/54143895/3418572
		setCurrentPage(getInitialScrollIndex())
	}, [rows]);

	const handlePickerVisibility = (isVisible) => {
		setIsPickerVisible(isVisible)
	};


	const onDayPress = (day) => {
		setSelected(day);
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
		const initYear = moment(currentDate).subtract(Math.floor(yearRange/2) , 'years');
		for(let i=0; i < yearRange; i++) {
			const year = initYear.clone().add(i, 'years').format('YYYY');
			yearArr.push(year)
		}
		setYearList(yearArr);
	};

	const handleYearPress = (index) => {
		setSelectedYear(yearList[index]);
		setIsYearSelectionVisible(false);
		updateCurrentMonthDate(yearList[index]);
	};

	const updateCurrentMonthDate = (year) => {
		const date = moment(rows[currentPage]).year(year).format('YYYY-MM-DD');
		setCurrentDate(date);
		scrollToDate(date);
		console.log('HDV getMonthDateOnView: ', date);
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
		let contentOffset = e.nativeEvent.contentOffset;
		let viewSize = e.nativeEvent.layoutMeasurement;

		// Divide the horizontal offset by the width of the view to see which page is visible
		let pageNum = Math.floor(contentOffset.x / viewSize.width);
		console.log('HDV currentPage changed (onMomentumScrollEnd): ', pageNum);
		setCurrentPage(pageNum);
	};

	const getInitialScrollIndex = () => {
		const currentDateKey = moment(currentDate).format('YYYY-MM-01');
		const indexForCurrentMonth = rows.findIndex(item => item === currentDateKey);
		if (indexForCurrentMonth === -1) {
			return -1;
		}
		console.log('HDV currentPage changed (getInitialScrollIndex): ', indexForCurrentMonth);
		return indexForCurrentMonth;
	};

	return {
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
		getInitialScrollIndex,
		yearList,
		selectedYear,
		handleYearPress
	};
};

export default PickerHandler;
