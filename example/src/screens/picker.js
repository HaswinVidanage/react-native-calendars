import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Picker from "../../../src/picker";


export default class PickerScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: false,
			isMultiSelect: false,
		};
	}

	handlePickerVisibility = (isVisible) => {
		this.setState({
			isVisible
		})
	};

	handleSingleDatePickerVisibility = () => {
		this.setState({
			isMultiSelect: false
		}, () => this.handlePickerVisibility(true))
	};

	handleMultiDatePickerVisibility = () => {
		this.setState({
			isMultiSelect: true
		}, () => this.handlePickerVisibility(true))
	};

	handleDateSelection = ({selectedDay, selectedDateRange}) => {
		this.handlePickerVisibility(false);
	};

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.menu}
					onPress={() => this.handleSingleDatePickerVisibility()}>
					<Text style={styles.menuText}>Single Date Picker</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.menu}
					onPress={() => this.handleMultiDatePickerVisibility()}>
					<Text style={styles.menuText}>Date Range Picker</Text>
				</TouchableOpacity>
				<Picker
					isPickerVisible={this.state.isVisible}
					isMultiSelect={this.state.isMultiSelect}
					onPickerClosed={() => this.handlePickerVisibility(false)}
					onOkBtnPress={({selectedDay, selectedDateRange}) => this.handleDateSelection({selectedDay, selectedDateRange})}
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	menu: {
		width: 300,
		padding: 10,
		margin: 10,
		alignItems: 'center',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#7a92a5'
	},
	menuText: {
		fontSize: 18,
		color: '#2d4150'
	}
});
