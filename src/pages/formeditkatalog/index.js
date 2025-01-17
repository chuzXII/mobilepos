import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Label from '../../component/label';
import Input from '../../component/input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Iscan, Iscand } from '../../assets/icon';
import BASE_URL from '../../../config';

const FormEdit = ({ route, navigation }) => {

  const params = route.params;
  const isFocused = useIsFocused();
  const [modalVisibleCategory, setModalVisibleCategory] = useState(false);
  const [Datakateogri, setDatakateogri] = useState([]);
  const [Form, setForm] = useState({
    id: '',
    namaproduk: '',
    hargaproduk: 0,
    stokproduk: '',
  });

  const openModalkategori = (item) => {
    onInputChange(item.category, 'kategoriproduk')
    setModalVisibleCategory(!modalVisibleCategory)
  }
  const closeModal = () => {
    setModalVisibleCategory(!modalVisibleCategory)
    // onInputChange(null, 'kategoriproduk')
  }
  const onPress = async () => {
    try {
      const sheetid = await AsyncStorage.getItem('TokenSheet');
      const token = await AsyncStorage.getItem('tokenAccess');
      const response = await axios.put(`${BASE_URL}/produk/${params.id}`, {
        id_toko:params.id_toko,
        nama_produk: Form.namaproduk,
        harga: Form.hargaproduk,
        stok: Form.stokproduk,
        kode_kategori: Form.idkategori,
        is_stock_managed :Form.stokproduk > 0||Form.stokproduk ==null ? 1 : 0,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      navigation.goBack();


    } catch (e) {
      console.log(e.response);
    }
  };

  const onInputChange = (value, input) => {
    setForm({
      ...Form,
      [input]: value,
    });
  };
  // const onPressimg = async () => {
  //   await launchImageLibrary({mediaType: 'photo', saveToPhotos: true}, res => {
  //     if (res.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (res.errorCode) {
  //       console.log('ImagePicker Error: ', res.errorMessage);
  //     } else {
  //       const a = res.assets[0].type.split('/');
  //       setFileImgOri(res.assets[0].uri);
  //       setNameImg(Form.namaproduk + '.' + a[1]);

  //     }
  //   });
  // };

  const get = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenAccess');
      await axios.get(`${BASE_URL}` + '/kategori',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      ).then(res => {
    
      })
      console.log(params.data)
      setForm({
        id: params.id,
        namaproduk: params.data.nama_produk,
        hargaproduk: params.data.harga,
        stokproduk: params.data.stok,
        kategoriproduk: params.data.kategori.nama_kategori,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get();
  }, [isFocused]);
  return (
    <View style={styles.conatiner}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.card}>
          <View style={styles.warpcard}>
            <Label label={'Nama Produk'} />
            <View style={styles.formgroup}>
              <Input
                input={'Nama Produk'}
                value={Form.namaproduk}
                onChangeText={value => onInputChange(value, 'namaproduk')}
              />
            </View>
            <Label label={'Harga Produk'} />
            <View style={styles.formgroup}>
              <Input
                input={'Harga Produk'}
                value={String(Form.hargaproduk)}
                onChangeText={value => onInputChange(value, 'hargaproduk')}
                keyboardType={'number-pad'}
              />
            </View>
            <Label label={'Stok Produk'} />
            <View style={styles.formgroup}>
              <Input
                input={'Stok Produk'}
                numberOfLines={1}
                value={Form.stokproduk === null ? '' : String(Form.stokproduk)}
                onChangeText={value => onInputChange(value, 'stokproduk')}
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
              <Text style={{ marginVertical: 12, color: '#000', paddingLeft: 8 }}>{Form.kategoriproduk}</Text>
            </TouchableOpacity>
            {/* <Label label={'Kode Barcode'} />
            <View style={styles.formgroup}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Input
                  input={'Kode Barcode'}
                  numberOfLines={1}
                  value={Form.barcodeproduk}
                  onChangeText={value => onInputChange(value, 'barcodeproduk')}
                  keyboardType={'number-pad'}
                  icon={true}
                  style={{ flex: 1, color: '#000' }}
                />
                <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigation.navigate('camscan', false)}>
                  <Iscand />
                </TouchableOpacity>
              </View>

            </View> */}
            <View style={styles.wrapbutton}>
              <View style={styles.wrapbuttonsub}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onPress()}>
                  <Text style={styles.buttontxt}>Simpan</Text>
                </TouchableOpacity>
              </View>
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
                {Datakateogri.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.btnitemcategory}
                      onPress={() => openModalkategori(item)}>
                      <Text style={{ color: '#000', textAlign: 'center' }}>
                        {item.nama_kategori}
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

export default FormEdit;
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
    backgroundColor: '#18AECF',
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
