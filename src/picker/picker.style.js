import styled from "styled-components/native/dist/styled-components.native.esm";

export const PickerModal = styled.View`
	flex: 1;
	justifyContent: center;
	alignItems: center;
	marginTop: 22px;
	backgroundColor: white
`;

export const ModalView = styled.View`
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
	backgroundColor: white;
`;

export const PickerHeader = styled.View`
	backgroundColor: #F9A350; 
	height: 120px;
`;

export const PickerTitle = styled.View`
	flex: 1; 
	marginLeft: 24px;
	marginRight: 24px;
	marginTop: 16px;
	marginBottom: 16px;
`;

export const PickerTitleWrapper= styled.View`
	height: 20px;
`;

export const PickerTitleText= styled.Text`
	fontSize: 14;
	color: #FFF;
`;

export const SelectedDateWrapper = styled.View`
	flex:1;
	flexDirection: row;
	alignItems: flex-end;
`;

export const SelectedDateText = styled.Text`
	fontSize: 32;
	color: #FFF;
`;

export const PickerTopMenu = styled.View`
	backgroundColor: white; 
	height: 56px;
`;

export const PickerContent = styled.View`
	height:366px;
`;

export const PickerBottomMenu = styled.View`
	backgroundColor: white; 
	height: 56px;
`;

export const PickerTopMenuWrapper = styled.View`
    flex:1;
	flexDirection: row;
	paddingLeft: 24px;
	paddingRight: 24px;
`;

export const YearSelector = styled.View`
	flex: 1;
`;

export const MonthPagination = styled.View`
	flex: 1;
	flexDirection: row;
`;

export const YearChangeButton = styled.TouchableOpacity`
    flex:1
`;

export const MonthPaginationButton = styled.TouchableOpacity`
    flex:1;
    alignItems: center;
	justifyContent: center;
`;

export const DropDownArrow = styled.View`
    padding: 10px;
`;

export const YearGrid = styled.View`
	flex: 1;
`;

export const YearRow = styled.View`
	flex: 1;
	flexDirection: row;
`;

export const YearButton = styled.TouchableOpacity`
	flex: 1;
	alignItems: center;
	justifyContent: center;
	backgroundColor: white;
	paddingRight: 4px;
	paddingLeft: 4px; 
`;

export const YearLabelWrapper = styled.View`
	flex: 1;
	alignItems: center;
	flexDirection: row;
`;

export const FooterBottom = styled.View`
	flex: 1;
	flexDirection: row;
`;

export const FooterButtonGrid = styled.View`
    flex: 1;
    flexDirection: row;
    justify-content: flex-end;
`;

export const FooterButton = styled.TouchableOpacity`
    alignItems: center;
	justifyContent: center;
	width: 80;
`;

export const YearTextWrapper = styled.View`
	backgroundColor: ${props => props.isSelected ? props.primaryColor : 'white'};
	padding: 20px;
	borderTopRightRadius: 20px;
	borderTopLeftRadius: 20px;
	borderBottomLeftRadius: 20px;
	borderBottomRightRadius: 20px;
	paddingTop: 10px;
	paddingBottom: 10px;
`;

export const YearText = styled.Text`
	color: ${props => props.isSelected ?'white' : 'black'};
`;

const FooterColor = ({disabled, primaryColor, disabledTextColor}) => {
	if (disabled) {
		if (disabledTextColor) {
			return disabledTextColor;
		}
		return 'grey';
	}

	return primaryColor ? primaryColor : '#000';
};


export const FooterText = styled.Text`
	color: ${props => FooterColor(props)};
`;

export const CalendarContentWrapper = styled.View`
	flex: 1;
	backgroundColor: white;
	width: ${props => props.calendarWidth ? props.calendarWidth : '328px'};
	height: ${props => props.calendarHeight ? props.calendarHeight : '310px'} 
`;
