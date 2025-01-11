import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React,{useState, useEffect } from 'react';
import {Logo,} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import { Iprinter } from '../../assets/icon';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { chillLogo } from '../../assets/image/logo';


const FinalPage = ({navigation}) => {
  const currency = new Intl.NumberFormat('id-ID');
  const CartReducer = useSelector(state => state.CartReducer);
  const TRXReducer = useSelector(state => state.TRXReducer);
  const Date = moment().format("DD MMM yyyyTHH:mm").split("T")
  const TunaiReducer = useSelector(state => state.TunaiReducer);
  const DiskonReducer = useSelector(state => state.DiskonReducer);
  const [currencystate,setCurrencystate] = useState({
    subtotal:0,
    diskon:0,
    total:0,
    tunai:0,
    kembalian:0,
  })
  const [user,setUser] = useState({})

  const dispatch = useDispatch()
  const setup=async()=>{
    try {
      await BluetoothEscposPrinter.printText('\r\n\r\n', {});
      await BluetoothEscposPrinter.printPic64(chillLogo, {width: 200, height:150});
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.setBlob(3);
      // await BluetoothEscposPrinter.printText('\r\n', {});
      await BluetoothEscposPrinter.printColumn(
        [32],
        [BluetoothEscposPrinter.ALIGN.CENTER],
        ['\x1B\x61\x01Jl. KIS Mangunsarkoro, Kali Nangkaan,Dabasah,Kec.Bondowoso, Kabupaten Bondowoso,Jawa Timur 68216'],
        {},
      );
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText(
        '================================',
        {},
      );
  
      await BluetoothEscposPrinter.printColumn(
        [10, 22],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Transaksi',  TRXReducer.id_produk],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        [Date[0], Date[1]],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Kasir', user.name],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Whatsapp', '085604745727'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Instagram', 'wijayavape22'],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [11, 11, 11],
        [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
        ['==========', 'PESANAN','=========='],
        {},
      );
      // CartReducer.cartitem.map(async(items,index)=>{
        for (const element of CartReducer.cartitem) {
          const itemName = element.item[1];
          const itemCount = element.count;
          const itemPrice = element.item[2];
          const itemSubTotal = element.subTotal;
        
          const formattedItemSubTotal = 'Rp.' + currency.format(itemSubTotal);
          const formattedTotalPrice = 'Rp.' + currency.format(itemCount * itemPrice);
        
          await BluetoothEscposPrinter.printColumn(
            [32],
            [BluetoothEscposPrinter.ALIGN.LEFT],
            [itemName],
            {}
          );
        
          await BluetoothEscposPrinter.printColumn(
            [16, 16],
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [`${itemCount}x ${formattedItemSubTotal}`, formattedTotalPrice],
            {}
          );
        }
      await BluetoothEscposPrinter.printText(
        '================================',
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Subtotal','Rp.'+currency.format(currencystate.subtotal).toString()],
        {},
      );
      if(DiskonReducer.diskon==0){
        await BluetoothEscposPrinter.printColumn(
          [16, 16],
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
          ['Diskon','Rp.'+currencystate.diskon],
          {},
        );
      }
      else if( DiskonReducer.diskon.split('-').length<=1){
        await BluetoothEscposPrinter.printColumn(
          [16, 16],
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
          ['Diskon','-Rp.'+currencystate.diskon],
          {},
        );
      }else{
        await BluetoothEscposPrinter.printColumn(
          [16, 16],
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
          ['Diskon',currencystate.diskon+'%'],
          {},
        );
      }
     
      await BluetoothEscposPrinter.printText(
        '================================',
        {},
      );
      await BluetoothEscposPrinter.setBlob(3)
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Total', 'Rp.'+currency.format(currencystate.total).toString()],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Tunai','Rp.'+currency.format(currencystate.tunai).toString()],
        {},
      );
      await BluetoothEscposPrinter.printColumn(
        [16, 16],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ['Kembalian','Rp.'+currency.format(currencystate.kembalian).toString()],
        {},
      );
      await BluetoothEscposPrinter.setBlob(0);
      await BluetoothEscposPrinter.printText('\r\n\r\n', {});
      await BluetoothEscposPrinter.printColumn(
          [32],
          [BluetoothEscposPrinter.ALIGN.CENTER],
          ['"'+'Terimakasih Atas Pembeliannya'+'"'],
          {},
        );
      await BluetoothEscposPrinter.printText('\r\n\r\n', {});
      await BluetoothEscposPrinter.printText('\r\n\r\n', {});
  
    } catch (e) {
      alert(e.message || 'ERROR');
    }
  
  }
  const Submit=async()=>{
    dispatch({type:'REMOVEALL'})
    dispatch({type:'NOMINAL',value:null})
    dispatch({type:'RMIDPRODUK',value:null})
    dispatch({type:'DISKON',valuenama:'',valuediskon:0})
    navigation.navigate('Routestack')
  }
  const renderitem = items => {
    return (
      <View style={{flexDirection: 'row',alignItems:'center'}}>
        <View style={{flex: 4}}>
          <Text style={{color: '#000'}}>{items.item[1]}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#000'}}>{items.count}x </Text>
              <Text style={{color: '#000'}}>Rp.{currency.format(items.subTotal)}</Text>
            </View>
        </View>
        <View style={{flex: 2}}>
          <Text style={{color: '#000'}}>Rp.{currency.format(items.subTotal*items.count)}</Text>
        </View>
        
      </View>
    );
  };
  const get=async()=>{
    navigation.addListener('beforeRemove', (e) => {
      dispatch({type:'REMOVEALL'})
      dispatch({type:'NOMINAL',value:null})
      dispatch({type:'RMIDPRODUK',value:null})
      dispatch({type:'DISKON',valuenama:'',valuediskon:0})
    })
    const subtotal =CartReducer.cartitem.reduce((result, item) => item.count * item.subTotal + result,0, )
    const diskon = DiskonReducer.diskon
    let total
    if(diskon==0){
      total = subtotal - (diskon)
    }
    else{
      if(diskon.split('-').length<=1){
        total = subtotal - (diskon.split('-')[0])
      }
      else{
        total = subtotal - (subtotal * diskon.split('-')[0]/100)
      }
    }
   
    
    const tunai = TunaiReducer.nominal
    const kembalian  =tunai-total
    setCurrencystate({
      subtotal:subtotal,
      diskon:diskon,
      total:total,
      tunai:tunai,
      kembalian:kembalian,
    })
    const user= JSON.parse(await AsyncStorage.getItem('usergooglesignin'))
    setUser(user)
  }
  useEffect(()=>{
    get()
  },[])
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: '#000',fontSize:28,marginVertical:2,fontFamily:'InknutAntiqua-Regular'}}>BERHASIL</Text>
          <Image source={Logo} />
        </View>

        <View style={{backgroundColor: '#fff', marginHorizontal: 25,marginTop:12,borderRadius:8,elevation:6}}>
          <View style={{marginHorizontal: 12, marginVertical: 12}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#000', flex: 4,fontFamily:'TitilliumWeb-Bold'}}>Items</Text>
             
              <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Bold'}}>Harga</Text>
            </View>
            {CartReducer.cartitem.map((items, index) => {
              return <View style={{paddingVertical:12}}  key={index}>
                {renderitem(items)}
                <View style={{ borderBottomWidth: StyleSheet.hairlineWidth,marginTop:6}}></View>
              </View>;
            })}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#000', flex: 4,fontFamily:'TitilliumWeb-Regular'}}>SubTotal</Text>

              <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Regular'}}>
                Rp.
                {currency.format(currencystate.subtotal)}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#000', flex: 4,fontFamily:'TitilliumWeb-Regular'}}>Diskon</Text>
              {DiskonReducer.diskon==0?
                <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Regular'}}>
                Rp.{currency.format(currencystate.diskon)}
                </Text>: DiskonReducer.diskon.split('-').length<=1?  
                <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Regular'}}>
                -Rp.{currency.format(currencystate.diskon)}
                </Text>:<Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Regular'}}>
                {DiskonReducer.diskon.split('-')}
              </Text>
              }
             
            </View>
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth,marginVertical:6}}></View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#000', flex: 4,fontFamily:'TitilliumWeb-Bold'}}>Total</Text>

              <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Bold'}}>
                Rp.{currency.format(currencystate.total)}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#000', flex: 4,fontFamily:'TitilliumWeb-Bold'}}>Tunai</Text>

              <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Bold'}}>
                Rp.{currency.format(currencystate.tunai)}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: '#000', flex: 4,fontFamily:'TitilliumWeb-Bold'}}>Kembalian</Text>

              <Text style={{color: '#000', flex: 2,fontFamily:'TitilliumWeb-Bold'}}>
                Rp.
                {currency.format(currencystate.kembalian)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center',marginVertical:12}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#034687',
            width: 50,
            height: 50,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={()=>setup()}>
         <Iprinter/>
        </TouchableOpacity>
      </View>
      </ScrollView>
      
      

      <TouchableOpacity style={{backgroundColor: '#034687',padding:16, alignItems: 'center',
            justifyContent: 'center',borderTopEndRadius:24,borderTopLeftRadius:24}} onPress={()=>Submit()}>
        <Text style={{color: '#fff',fontSize:18,fontFamily:'TitilliumWeb-Bold'}}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalPage;

const styles = StyleSheet.create({});
