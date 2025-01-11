import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../../component/input';
import Label from '../../component/label';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setForm } from '../../redux/action';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Iscan, Iscand } from '../../assets/icon';

const Formkasir = ({ route }) => {
  const navigation = useNavigation();
  // const { barcodes } = route.params;
  const FormReducer = useSelector(state => state.FormReducer);
  const dispatch = useDispatch();
  const [ID, setid] = useState(0);
  const [Check, setCheck] = useState(false);
  const [modalVisibleCategory, setModalVisibleCategory] = useState(false);

  const datacategory = [
    { id: 1, category: 'Mod' },
    { id: 2, category: 'Pod' },
    { id: 3, category: 'Accecories' },
    { id: 4, category: 'Authomizer' },
    { id: 5, category: 'Freebase' },
    { id: 6, category: 'Saltnic' },
  ];
  const handleBackButtonClick=() =>{
    navigation.goBack();
    dispatch({ type: 'RM_FORM' });
    return true;
  }
  const get = async () => {
    const sheetid = await AsyncStorage.getItem('TokenSheet');
    const token = await AsyncStorage.getItem('tokenAccess');
    axios.get('https://sheets.googleapis.com/v4/spreadsheets/' +
      sheetid + '/values/Produk',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },).then((res) => {
        if (res.data.values == undefined) {
          setid(0)
        }
        else {
          setid(res.data.values.splice(res.data.values.length - 1)[0][0])

        }
      })
  }
  const openModalkategori=(item)=>{
    onInputChange(item.category, 'kategoriproduk')
    setModalVisibleCategory(!modalVisibleCategory) 
  }
  const closeModal=()=>{
    setModalVisibleCategory(!modalVisibleCategory)
    onInputChange(null, 'kategoriproduk')
  }
  const onPress = async () => {
    try {
      const sheetid = await AsyncStorage.getItem('TokenSheet');
      const token = await AsyncStorage.getItem('tokenAccess');
      const data = [[parseInt(ID) + 1, FormReducer.form.namaproduk, FormReducer.form.hargaproduk, FormReducer.form.kategoriproduk.toUpperCase(),FormReducer.form.barcodeproduk]]

      axios.post('https://sheets.googleapis.com/v4/spreadsheets/' +
        sheetid +
        '/values/Produk!A1:append?valueInputOption=USER_ENTERED', JSON.stringify({
          values: data,
        }),
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },).then(() => {
          dispatch({ type: 'RM_FORM' })
          navigation.navigate('dashboard');
          setCheck(!Check)
        })
    } catch (e) {
      console.log('EE' + e);
    }
  };
  const onInputChange = (value, input) => {
    // setForm({
    //     ...form,
    //     [input]:value
    // })
    dispatch(setForm(input, value));
  };
  useEffect(() => {
    get()
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    }
  }, [Check])
  return (
    <View style={styles.conatiner}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.card}>

          <View style={styles.warpcard}>
            <Label label={'Nama Produk'} />
            <View style={styles.formgroup}>
              <Input
                input={'Nama Produk'}
                numberOfLines={1}
                value={FormReducer.form.namaproduk}
                onChangeText={value => onInputChange(value, 'namaproduk')}
              />
            </View>

            <Label label={'Harga Produk'} />
            <View style={styles.formgroup}>
              <Input
                input={'Harga Produk'}
                numberOfLines={1}
                value={FormReducer.form.hargaproduk}
                onChangeText={value => onInputChange(value, 'hargaproduk')}
                keyboardType={'number-pad'}

              />
            </View>



            <Label label={'Kategori Produk'} />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 12,
                backgroundColor: '#fff',
              }}
              onPress={() => {
                setModalVisibleCategory(true);
              }}>
              <Text style={{ marginVertical: 12, color: '#000', paddingLeft: 8 }}>{FormReducer.form.kategoriproduk == null ||
                FormReducer.form.kategoriproduk
                  .replace(/^\s+/, '')
                  .replace(/\s+$/, '') == '' ? "kategori Produk" : FormReducer.form.kategoriproduk}</Text>
            </TouchableOpacity>

            <Label label={'Kode Barcode'} />
            <View style={styles.formgroup}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Input
                  input={'Kode Barcode'}
                  numberOfLines={1}
                  value={FormReducer.form.barcodeproduk}
                  onChangeText={value => onInputChange(value, 'barcodeproduk')}
                  keyboardType={'number-pad'}
                  icon={true}
                  style={{ flex: 1 ,color:'#000'}}
                />
                <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.navigate('camscan', false)}>
                  <Iscand />
                </TouchableOpacity>
              </View>

            </View>



            <View style={styles.wrapbutton}>

              {FormReducer.form.namaproduk == null ||
                FormReducer.form.namaproduk
                  .replace(/^\s+/, '')
                  .replace(/\s+$/, '') == '' ||
                FormReducer.form.hargaproduk == null ||
                FormReducer.form.hargaproduk
                  .replace(/^\s+/, '')
                  .replace(/\s+$/, '') == '' ||
                FormReducer.form.kategoriproduk == null ||
                FormReducer.form.kategoriproduk
                  .replace(/^\s+/, '')
                  .replace(/\s+$/, '') == ''
                ? (
                  <View style={styles.wrapbuttonsub}>
                    <View
                      style={[styles.button, { backgroundColor: 'rgba(21, 27, 37, 0.5)' }]}>
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

      <Modal transparent={true} visible={modalVisibleCategory}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
          onPress={() => closeModal()}>
          <View
            style={{
              backgroundColor: '#fff',
              width: DWidth / 1.2,
              height: DHeight / 2.5,
              borderRadius: 12,

            }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontWeight: '500',
                  textAlign: 'center',
                  marginVertical: 12,
                }}>
                Category
              </Text>
              <ScrollView style={{ flex: 1, marginBottom: 42 }}>
                {datacategory.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.btnitemcategory}
                      onPress={() => {openModalkategori(item)}}>
                      <Text style={{ color: '#000', textAlign: 'center' }}>
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Formkasir;
const DWidth = Dimensions.get('window').width;
const DHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  formgroup: {
    borderWidth: 1,
    borderColor: '#000',
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
  buttonimg: {
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#DBE8E1',
    width: DWidth * 0.3,
    height: DHeight / 20,
  },
  prvimg: {
    width: DWidth * 0.331,
    height: DWidth * 0.331,
    backgroundColor: '#bdbbbb',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    elevation: 3,
  },

  button: {
    marginBottom: 14,
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
  btnitemcategory: {
    padding: 18,
    backgroundColor: '#ededed',
  },
});
