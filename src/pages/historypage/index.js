import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emptyproduct } from '../../assets';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DateRangePicker from 'rn-select-date-range';
import { Icash } from '../../assets/icon';
import { FlashList } from '@shopify/flash-list';
import BASE_URL from '../../../config';

const HistoryPage = () => {
  const [Data, setData] = useState([]);
  const [StartDate, setStartDate] = useState(moment().format('yyyy-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().format('yyyy-MM-DD'));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const currency = new Intl.NumberFormat('id-ID');
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = (Item) => {
    if (Item.item.type === 'header') {
      return (
        <View style={{marginHorizontal:12}}>
         <View
          style={{
            marginTop: 16,
            borderBottomWidth: 1,
            borderColor: '#C3C3C3',
            borderStyle: 'dashed',
          }}></View>
         <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'TitilliumWeb-Bold',
              }}>
              {moment(Item.item.date).format('dddd') + ', '}
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'TitilliumWeb-Bold',
              }}>
              {moment(Item.item.date).format('DD MMM yyyy')}
            </Text>
          </View>

          <Text style={{ color: '#000', fontFamily: 'TitilliumWeb-Bold' }}>
            Rp.
            {currency.format(Item.item.total)}
          </Text>
          
        </View>
         
        </View>
       
        
      );
    }
    const time = moment(Item.item.created_at).format('HH:mm:ss')
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginVertical: 8,
          marginHorizontal:12,
          padding: 12,
          elevation: 1.5,
          borderRadius: 12,
        }}
        onPress={() =>
          navigation.navigate('historyitempage',{item:Item})
        }>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icash />
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'TitilliumWeb-Bold',
                }}>
               {Item.item.id_transaksi}

              </Text>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'TitilliumWeb-Light',
                }}>
                {time}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {/* <Text style={{ color: '#000' }}>a</Text> */}
            <View
              style={{
                paddingVertical: 6,
                marginTop: 4,
                borderRadius: 4,
              }}>
              <Text style={{ color: '#000' }}>Rp.{currency.format(Item.item.totalharga)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

  };
  const get = async () => {
    // const sheetid = await AsyncStorage.getItem('TokenSheet');
    const token = await AsyncStorage.getItem('tokenAccess');
    const res = await axios.get(`${BASE_URL}/riwayattransaksi/1`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    // console.log(res.data.data)
    const result = [];
    for (const [date, transactions] of Object.entries(res.data.data)) {
      const total = transactions.total;
      result.push({ type: 'header', date,total});
      transactions.data.forEach((transaction) =>
        result.push({ type: 'item', ...transaction })
      );
    }
    setData(result)



    // setModalVisibleLoading(true);
    // await axios
    //   .get(
    //     'https://sheets.googleapis.com/v4/spreadsheets/' +
    //     sheetid +
    //     '/values/Transaksi',
    //     {
    //       headers: {
    //         Authorization: 'Bearer ' + token,
    //       },
    //     },
    //   )
    //   .then(res => {
    //     const StartTimeStamp = Date.parse(StartDate);
    //     const EndTimeStamp = Date.parse(EndDate);
    //     // console.log(Date.parse(StartDate.startOf()))
    //     if (res.data.values == undefined) {
    //       Alert.alert(
    //         '',
    //         'Belum Ada Data Silahkan Input Terlebih Dahulu',
    //         [
    //           { text: 'Cancel', onPress: () => console.log('cancel') },
    //           { text: 'OK', onPress: () => navigation.navigate('dashboard') },
    //         ],
    //         { cancelable: false },
    //       );
    //     } else {
    //       const filteredData = res.data.values.filter((fill) => {
    //         const timestamp = fill[6];
    //         return timestamp >= StartTimeStamp && timestamp <= EndTimeStamp;
    //       });

    //       const uniqueFilteredData = [...new Set(filteredData.map(item => item[0]))];
    //       const groupedData = uniqueFilteredData.map(groupId => {
    //         const matchingItem = filteredData.find(item => item[0] === groupId);
    //         const jobValue = parseInt(matchingItem[4]);

    //         return {
    //           groupId,
    //           job: [jobValue],
    //         };
    //       });
    //       const totalPerGroup = groupedData.map(group => group.job[0]);


    //       const uniqueData = filteredData.filter((value, index, self) =>
    //         index === self.findIndex(t => t[0] === value[0])
    //       );


    //       uniqueData.sort((a, b) => a[6] > b[6] ? 1 : -1);
    //       totalPerGroup.sort((a, b) => a[6] > b[6] ? 1 : -1);

    //       let a = 0;
    //       const groups = uniqueData.reduce((groups, data) => {
    //         const timestamp = data[6];
    //         if (!groups[timestamp]) {
    //           groups[timestamp] = [];
    //         }
    //         groups[timestamp].push([data, totalPerGroup[a++]]);
    //         return groups;
    //       }, {});


    //       const groupedArrays = Object.keys(groups).map(timestamp => ({
    //         timestamp,
    //         date: moment(timestamp / 1000, 'X').toISOString(),
    //         data: groups[timestamp],
    //       }));

    //       const sortedData = groupedArrays.sort((a, b) => b.timestamp - a.timestamp);

    //       setData(sortedData);
    //       setModalVisibleLoading(false);
    //       setModalVisible(false);
    //       setRefreshing(false);

    //     }
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log(error.response.data);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //       alert(error.message);
    //       setRefreshing(false);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //       // http.ClientRequest in node.js
    //       console.log(error.request);
    //       alert(error.message);
    //       setRefreshing(false);
    //     } else {
    //       console.log('Error', error.message);
    //       alert(error.message);
    //       setRefreshing(false);
    //     }
    //   });
  };
  const onRefresh = () => {
    setRefreshing(true);
    get();
  };

  useEffect(() => {
    get();
  }, [isFocused, StartDate]);
  return (
    <View style={{  flex: 1 }}>
      <View style={{ elevation: 6, backgroundColor: '#fff' }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderWidth: 1,
            margin: 12,
            borderRadius: 12,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#000', fontFamily: 'TitilliumWeb-Regular' }}>
              {moment(StartDate).format('DD-MM-yyyy')}
            </Text>
            <Text style={{ color: '#000', fontFamily: 'TitilliumWeb-Regular' }}>
              {' '}
              ---{' '}
            </Text>
            <Text style={{ color: '#000', fontFamily: 'TitilliumWeb-Regular' }}>
              {moment(EndDate).format('DD-MM-yyyy')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlashList
   
        data={Data}
        renderItem={renderItem}
        estimatedItemSize={50}
        keyExtractor={(item, index) =>
          item.type === 'header' ? `${item.date}` : `${item.id_transaksi}`
        }
      />
      {/* {Data == undefined || Data.length == 0 ? (
        <View style={styles.imgContainerStyle}>
          <View style={styles.imgwarpStyle}>
            <Image style={styles.imageStyle} source={emptyproduct} />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
         
        </View>


      )} */}
      <Modal transparent={true} visible={modalVisibleLoading}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}>
          <ActivityIndicator size={100} color={'#9B5EFF'} />
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('close');
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={1}>
          <View style={styles.modalView}>
            <View style={{ marginHorizontal: 20, marginVertical: 18 }}>
              <DateRangePicker
                DateRangePicker
                onSelectDateRange={range => {
                  setStartDate(range.firstDate);
                  setEndDate(range.secondDate);
                }}
                onConfirm={() => setModalVisible(!modalVisible)}
                onClear={() => setModalVisible(!modalVisible)}
                responseFormat="YYYY-MM-DD"
                selectedDateContainerStyle={styles.selectedDateContainerStyle}
                selectedDateStyle={styles.selectedDateStyle}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HistoryPage;
const Dwidth = Dimensions.get('screen').width;
const Dheight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    marginTop: 200,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
  },
  imgContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgwarpStyle: {
    marginHorizontal: Dwidth * 0.06,
    marginTop: Dheight * 0.15,
    height: Dheight / 2.5,
    width: Dwidth / 1.2,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  selectedDateContainerStyle: {
    color: '#000',
    height: 38,
    borderRadius: 50,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#44dfff',
  },
  header: {
    backgroundColor: '#eee',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 14,
  },
});
