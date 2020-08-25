import React, { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import {parseDate} from "../../../src/interface";
import dateutils from "../../../src/dateutils";

const PickerHandler = props => {

	const [isPickerVisible, setIsPickerVisible] = useState(false);
	const flatListRef = useRef();
	const [currentPage, setCurrentPage] = useState(0);
	const [selected, setSelected] = useState('');
	const [currentDate] = useState(moment().format('YYYY-MM-DD'));
	const [rows, setRows] = useState([]);

	useEffect(() => {
		getInitialRows();
	}, []);

	useEffect(() => {
		// set current current page based on the current date.
		// todo make it faster\
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

	const getInitialRows = () => {
		const rows = [];
		const texts = [];
		const date = parseDate(currentDate);
		const currentDateKey = moment(currentDate).format('YYYY-MM-01');
		let pastScrollRange = props.pastScrollRange;
		let forwardPointer=0;
		for(let i= 0; i <= (props.pastScrollRange + props.futureScrollRange); i ++) {
			if (pastScrollRange !== 0) {
				rows.push(moment(currentDateKey).subtract(pastScrollRange, 'months').format('YYYY-MM-DD'));
				pastScrollRange--;
				continue;
			}

			rows.push(moment(currentDateKey).add(forwardPointer, 'months').format('YYYY-MM-DD'));
			forwardPointer++;
		}

		// console.log('HDV rows: ', rows);
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
		console.log('hdv scrolled to page ', pageNum);
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
		getInitialScrollIndex
	};
};

export default PickerHandler;
