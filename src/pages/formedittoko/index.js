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
import BASE_URL from '../../../config';

const FormEditToko = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params;
  const FormReducer = useSelector(state => state.FormTokoReducer);
  const dispatch = useDispatch();
  const [Check, setCheck] = useState(false);
  const [Form, setForm] = useState({
    id: '',
    namatoko: '',
    alamattoko: '',
  });

  const get = () => {
    setForm({
      id: params.data.id_toko,
      namatoko: params.data.nama_toko,
      alamattoko: params.data.alamat_toko,
    });
  }
  const handleBackButtonClick = () => {
    navigation.goBack();
    dispatch({ type: 'RM_FORM' });
    return true;
  }

  const onPress = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenAccess');
      const response = await axios.put(`${BASE_URL}/toko/${Form.id}`, {
        nama_toko: Form.namatoko,
        alamat_toko: Form.alamattoko
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.data.status === 'success') {
        dispatch({ type: 'RM_FORM' })
        navigation.navigate('home');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Display validation errors from the server
        console.error('Error:', error.response);
      } else if (error.response && error.response.status === 401) {
        console.error('Error:', error.response);
      } else {
        alert('An unexpected error occurred. Please try again.');
        console.error('Error:', error.response);
      }
    } finally {
      // setLoading(false);
    }

  };
  const onInputChange = (value, input) => {
    setForm({
      ...Form,
      [input]: value,
    });
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
            <Label label={'Nama Toko'} />
            <View style={styles.formgroup}>
              <Input
                input={'Nama Toko'}
                numberOfLines={1}
                value={Form.namatoko}
                onChangeText={value => onInputChange(value, 'namatoko')}
              />
            </View>
            <Label label={'Alamat Toko'} />
            <View style={styles.formgroup}>
              <Input
                input={'Alamat Produk'}
                numberOfLines={1}
                value={Form.alamattoko}
                onChangeText={value => onInputChange(value, 'alamattoko')}
                keyboardType={'number-pad'}
              />
            </View>
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
    </View>
  );
};

export default FormEditToko;
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
