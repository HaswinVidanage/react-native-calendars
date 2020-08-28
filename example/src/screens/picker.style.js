import styled from "styled-components/native/dist/styled-components.native.esm";

const PickerModal = styled.View`
	flex: 1;
	justifyContent: center;
	alignItems: center;
	marginTop: 22px;
	backgroundColor: white
`;

const ModalView = styled.View`
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
	height:366px;
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
`;

const MonthPagination = styled.View`
	flex: 1;
	flexDirection: row;
`;

const YearChangeButton = styled.TouchableOpacity`
    flex:1
`;

const MonthPaginationButtonBack = styled.TouchableOpacity`
    flex:1;
    alignItems: center;
	justifyContent: center;
`;

const MonthPaginationButtonForward = styled.TouchableOpacity`
    flex:1;
    alignItems: center;
	justifyContent: center;
`;

const DropDownArrow = styled.TouchableOpacity`
    padding: 10px;
`;

const YearGrid = styled.View`
	flex: 1;
`;

const YearRow = styled.View`
	flex: 1;
	flexDirection: row;
`;

const YearButton = styled.TouchableOpacity`
	flex: 1;
	alignItems: center;
	justifyContent: center;
	backgroundColor: white;
	paddingRight: 4px;
	paddingLeft: 4px; 
`;

const YearLabelWrapper = styled.View`
	flex: 1;
	alignItems: center;
	flexDirection: row;
`;

const FooterBottom = styled.View`
	flex: 1;
	flexDirection: row;
`;

const FooterEmptyFlex = styled.View`
	flex: 1;
`;

const FooterButtonGrid = styled.View`
    flex: 1;
    flexDirection: row;
    justify-content: flex-end;
`;

const FooterButton = styled.TouchableOpacity`
    alignItems: center;
	justifyContent: center;
	width: 80;
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
	backgroundColor: white;
	width: ${props => props.calendarWidth ? props.calendarWidth : '328px'};
`;
