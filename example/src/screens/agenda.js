import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';

const testIDs = require('../testIDs');


export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        // '2021-02-08' : [],
        // '2021-02-09' : [],
        // '2021-02-20' : [],
        // '2021-02-21' : [],
        // '2021-02-22' : [],
        // '2021-02-23' : [
        //   {
        //     name: 'Item for 2021-02-23',
        //     height: 50
        //   },
        //   // {
        //   //   name: 'Item for 2021-02-23',
        //   //   height: 50
        //   // }
        // ],
        // '2021-02-24' : [
        //   {
        //     name: 'Item for 2021-01-24',
        //     height: 50
        //   }
        // ],
        // '2021-02-25' : [],
        // '2021-02-26' : [],
        // '2021-02-27' : [],
        // '2021-02-28' : [],
        // '2021-03-01' : [],
        // '2021-03-02' : [],
        // '2021-03-03' : [],
        // '2021-03-04' : [],
        // '2021-03-05' : [],
        // '2021-03-06' : [],
        // '2021-03-07' : [],
        // '2021-03-08' : [],
        // '2021-03-09' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-10' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-11' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-12' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-13' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-14' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-15' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-16' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-17' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-18' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-18' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-20' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-21' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-23' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-24' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-25' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-26' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-27' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-28' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
        // '2021-03-29' : [
        //   {
        //     name: 'Item for 2021-03-10',
        //     height: 50
        //   }
        // ],
        // '2021-03-30' : [
        //   {
        //     name: 'Item for 2021-03-09',
        //     height: 50
        //   }
        // ],
      }
    };
  }


  getMarkedDates = () => {
    const {items} = this.state;
    const marked = {};

    for (const key of Object.keys(items)) {
      if (items[key].length > 0) {
        marked[key] = {marked: true};
      } else {
        marked[key] = {disabled: true};
      }
    }
    return marked;
  }

  render() {
    return (
        <Agenda
            testID={testIDs.agenda.CONTAINER}
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            // selected={'2017-05-16'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
            renderDay={(day, item) => {
              if (!item) {
                return (<View></View>);
              }
            }}
            hideExtraDays={true}
            // markingType={'period'}
            // markedDates = {{
            //   '2021-02-22': {
            //     disabled: true
            //   }
            // }}
            markedDates={this.getMarkedDates()}

            // markedDates = {() => {
            //   return {};
            //
            // }}
            // markedDates={{
            //    '2017-05-08': {textColor: '#43515c'},
            //    '2017-05-09': {textColor: '#43515c'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            // hideExtraDays={false}
            disableAllTouchEventsForDisabledDays
        />
    );
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      // remove few days
      delete newItems['2020-12-25'];
      delete newItems['2020-12-30'];
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    // return (
    //   <View style={styles.emptyDate}>
    //     <Text>This is empty date!</Text>
    //   </View>
    // );
    return (<View style={{height:0}}></View>);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
