import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Button,
    Modal,
    ToastAndroid
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Input from '../../component/input';
  import Label from '../../component/label';
  import {useNavigation} from '@react-navigation/native';
  import {useDispatch, useSelector} from 'react-redux';
  import RNFS from 'react-native-fs';
  import DatePicker from 'react-native-modern-datepicker';
  import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

  
  const PengeluaranPage = () => {
    const navigation = useNavigation();
    const [Form, setForm] = useState({
      tgl:selectDate,
      namabarang:'',
      hargabarang:0,
      jumlahbarang:0,
      keterangan:'',
    })

    const [selectDate, setSelectDate] = useState(moment(new Date()).format('DD-MM-yyyy'))
    const [modalVisible, setModalVisible] = useState(false)
  
    const onPress = async () => {
      
        const sheetid = await AsyncStorage.getItem('TokenSheet');
        const token = await AsyncStorage.getItem('tokenAccess');
        const data=[[selectDate,Form.namabarang,Form.jumlahbarang,Form.hargabarang,Form.hargabarang*Form.jumlahbarang,Form.keterangan]]
        axios.post('https://sheets.googleapis.com/v4/spreadsheets/' +
        sheetid +
        '/values/Pengeluaran!A1:append?valueInputOption=USER_ENTERED', JSON.stringify({
          values: data,
        }),
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },).then(()=>{
          setForm({
            namabarang:'',
            hargabarang:'',
            jumlahbarang:'',
            keterangan:''
        })
    }).catch((e)=>{console.log(e) 
          ToastAndroid.show('Gagal', ToastAndroid.SHORT)})
    
    };
    const onInputChange = (value, input) => {
      setForm({
          ...Form,
          [input]:value
      })
      
    };
 
    return (
      <View style={styles.conatiner}>
        <View>
          
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.card}>
        
          <View style={styles.warpcard}>
          <Label label={'Tanggal'} />
          <View style={styles.formgroup}>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={{  alignItems: 'center',justifyContent: 'center',   backgroundColor: '#fff',padding:12,borderRadius:12}}>
                <Text style={{color:'#000',fontSize:18}} >{selectDate}</Text>
            </TouchableOpacity>
            </View>
           
     
            <Label label={'Nama Barang'} />
            <View style={styles.formgroup}>
            <Input
              input={'Nama Barang'}
              numberOfLines={1}
              value={Form.namabarang}
              onChangeText={value => onInputChange(value, 'namabarang')}
            />
              </View>
            
            <Label label={'Harga Produk'} />
            <View style={styles.formgroup}>
            <Input
              input={'Harga Barang'}
              numberOfLines={1}
              value={Form.hargabarang}
              onChangeText={value => onInputChange(value, 'hargabarang')}
              keyboardType={'number-pad'}
            />
              </View>
            
            <Label label={'Jumlah Barang'} />
            <View style={styles.formgroup}>
            <Input
              input={'Jumlah Brang'}
              numberOfLines={1}
              value={Form.jumlahbarang}
              onChangeText={value => onInputChange(value, 'jumlahbarang')}
              keyboardType={'number-pad'}
            />
              </View>
           
            <Label label={'Keterangan'} />
            <View style={styles.formgroup}>
            <Input
              input={'Keterangan'}
              numberOfLines={4}
              value={Form.keterangan}
              onChangeText={value => onInputChange(value, 'keterangan')}
            />
            </View>
            
            <View style={styles.wrapbutton}>
              {Form.namabarang == null ||
              Form.namabarang
                .replace(/^\s+/, '')
                .replace(/\s+$/, '') == '' ||
                Form.hargabarang == 0 ||
                Form.jumlahbarang == 0 
                ? (
                <View style={styles.wrapbuttonsub}>
                  <View
                    style={[styles.button,{backgroundColor: 'rgba(21, 27, 37, 0.5)'}]}>
                    <Text style={styles.buttontxt}>Simpan</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.wrapbuttonsub}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => onPress()}>
                    <Text style={styles.buttontxt}>Simpan</Text>
                  </TouchableOpacity>
                </View>
              )}
  
            </View>
          </View>
  
        </View>
        </ScrollView>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
          <View style={styles.modalView}>
            <View style={{marginTop:12}}>
            <DatePicker
           
           options={{
             borderColor: 'rgba(255, 255, 255, 1)',
           }}
           onSelectedChange={(date)=>setSelectDate(date.split('/')[2]+'-'+date.split('/')[1]+'-'+date.split('/')[0])}
           current={moment(new Date()).format('yyyy-MM-DD')}
           selected={moment(new Date()).format('yyyy-MM-DD')}
           mode="calendar"
           minuteInterval={30}
           style={{ borderRadius: 10 }}
         />
         <TouchableOpacity style={{marginLeft:24,marginBottom:12,}} onPress={()=>setModalVisible(!modalVisible)}>
         <Text style={{color:'#000',fontSize:18}}>
      OK
    </Text>
         </TouchableOpacity>
         
            </View>
          
    
           </View>
          </View>
           
          </Modal>
       
      </View>
    );
  };
  
  export default PengeluaranPage;
  const DWidth = Dimensions.get('window').width;
  const DHeight = Dimensions.get('window').height;
  
  const styles = StyleSheet.create({
    formgroup: {
      borderWidth: 1,
      borderColor: '#151B25',
      borderRadius: 12,
      backgroundColor: '#fff',
  
    },
    conatiner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
  
      elevation: 24,
    },
    card: {
      borderRadius: 15,
      backgroundColor: '#fff',
      width: DWidth * 0.9,
      
    },
    warpcard: {
  
      marginHorizontal: DWidth * 0.05,
      justifyContent: 'center',
    },
    wrapbutton: {
      marginTop: 14,
    },
    wrapbuttonsub: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapimg: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    button: {
      marginBottom:14,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      width: DWidth * 0.7,
      height: DHeight / 15,
      backgroundColor: '#151B25',
    },
    buttontxt: {
      color: '#fff',
      fontSize: 20,
    },
    modalView: {
      marginTop: 200,
      marginHorizontal: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      elevation: 6,
    },
  });
  