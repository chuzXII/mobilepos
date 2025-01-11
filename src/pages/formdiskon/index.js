import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect } from 'react';

const FormDiskon = ({ navigation }) => {
  const [namadiskon, setnamadiskon] = useState('');
  const [diskon, setdiskon] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [ID, setID] = useState(0);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setdiskon('');
  };

  const [form, setForm] = useState({
    id: 0,
    namadiskon: '',
    diskon: '',
  });
  const onInputChange = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };
  const urladd = async(ispersen) => {
    try {
      const sheetid = await AsyncStorage.getItem('TokenSheet');
      const token = await AsyncStorage.getItem('tokenAccess');
      const data = [[ID,namadiskon, ispersen==true?diskon+"-%":diskon]]

      axios.post('https://sheets.googleapis.com/v4/spreadsheets/' +
        sheetid +
        '/values/Diskon!A1:append?valueInputOption=USER_ENTERED', JSON.stringify({
          values: data,
        }),
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },).then(() => {
          navigation.navigate('diskonpage');

          // dispatch({ type: 'RM_FORM' })
          // navigation.navigate('dashboard');
          // setCheck(!Check)
        })
    } catch (e) {
      console.log('EE' + e);
    }
  }

  const get = async () => {
    const sheetid = await AsyncStorage.getItem('TokenSheet');
    const token = await AsyncStorage.getItem('tokenAccess');
    axios.get('https://sheets.googleapis.com/v4/spreadsheets/' +
      sheetid + '/values/Diskon',
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },).then((res) => {
        if (res.data.values == undefined) {
          setID(0)
        }
        else {
          setID(res.data.values.splice(res.data.values.length - 1)[0][0])
 
        }
      })
  }

  const onPressSubmit = async () => {
    if (
      namadiskon == '' ||
      namadiskon == null ||
      diskon == '' ||
      diskon == null
    ) {
      alert('Tidak Boleh Kosong');
    } else {
      if (!isEnabled) {
        if (diskon.replace(/\s/g, '') <= 0 || diskon.replace(/\s/g, '') > 100) {
          alert('Nominal Diskon 1-100');
        } else {
          urladd(true)
        }

      }
      else {
        if (diskon.replace(/\s/g, '') <= 0) {
          alert('Nominal Diskon Tidak Bisa Nol Atau Negatif');
        } else {
          urladd(false)
        }
      }
      // if(!isEnabled){
      //   if (diskon.replace(/\s/g, '') <= 0 || diskon.replace(/\s/g, '') > 100) {
      //     alert('Nominal Diskon 1-100');
      //   } else {
      // await AsyncStorage.getItem('iddiskon').then(async value => {
      //   const id = 0;
      //   if (value == null) {
      //     const u = id + 1;
      //     AsyncStorage.setItem('iddiskon', JSON.stringify(u));
      //   } else {
      //     AsyncStorage.setItem(
      //       'iddiskon',
      //       JSON.stringify(parseInt(value) + 1),
      //     );
      //   }
      //   await AsyncStorage.getItem('formdiskon').then(async value => {
      //     const id = await AsyncStorage.getItem('iddiskon');
      //     const c = value ? JSON.parse(value) : [];
      //     c.push({iddiskon: id, nama: namadiskon, diskon: diskon.replace(/\s/g, '')+'-%'});
      //     AsyncStorage.setItem('formdiskon', JSON.stringify(c));
      //   });
      //   alert('berhasil');
      //   navigation.navigate('diskonpage');
      // });
      //   }
      // }
      // else{
      //   if (diskon.replace(/\s/g, '') <= 0) {
      //     alert('Nominal Diskon Tidak Bisa Nol Atau Negatif');
      //   }else{
      // await AsyncStorage.getItem('iddiskon').then(async value => {
      //   const id = 0;
      //   if (value == null) {
      //     const u = id + 1;
      //     AsyncStorage.setItem('iddiskon', JSON.stringify(u));
      //   } else {
      //     AsyncStorage.setItem(
      //       'iddiskon',
      //       JSON.stringify(parseInt(value) + 1),
      //     );
      //   }
      //   await AsyncStorage.getItem('formdiskon').then(async value => {
      //     const id = await AsyncStorage.getItem('iddiskon');
      //     const c = value ? JSON.parse(value) : [];
      //     c.push({iddiskon: id, nama: namadiskon, diskon: diskon.replace(/\s/g, '')});
      //     AsyncStorage.setItem('formdiskon', JSON.stringify(c));
      //   });
      //   alert('berhasil');
      //   navigation.navigate('diskonpage');
      // });
      //   }
      // }

    }
  };

  useEffect(()=>{
    get()
  },[])
  return (
    <View style={{ justifyContent: 'space-between', flex: 1 }}>
      <View style={{ marginHorizontal: 18, marginTop: 12 }}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
            fontWeight: '400',
            marginVertical: 12,
          }}>
          Nama Diskon
        </Text>
        <TextInput
          placeholder="Masukan Nama Diskon"
          style={{
            color: '#000',
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingLeft: 12,
            elevation: 4,
          }}
          placeholderTextColor={'#000'}
          value={namadiskon}
          onChangeText={value => setnamadiskon(value)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: '400',
              marginVertical: 12,
            }}>
            Diskon
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                marginVertical: 12,
              }}>
              Ganti Format
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#9B5EFF' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        {isEnabled ? (
          <View
            style={{
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: 12,
              paddingLeft: 12,
              elevation: 4,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{ color: '#000' }}>Rp.</Text>
            <TextInput
              placeholder="Masukan Diskon"
              keyboardType="number-pad"
              style={{
                flex: 1,
                color: '#000',
                maxWidth: '90%',
              }}
              placeholderTextColor={'#000'}
              value={diskon}
              onChangeText={value => setdiskon(value)}
            />
          </View>
        ) : (
          <View
            style={{
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: 12,
              paddingLeft: 12,
              elevation: 4,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TextInput
              placeholder="Masukan Diskon"
              keyboardType="number-pad"
              style={{
                flex: 1,
                color: '#000',
                maxWidth: '90%',
              }}
              placeholderTextColor={'#000'}
              value={diskon}
              onChangeText={value => setdiskon(value)}
            />
            <Text style={{ color: '#000', marginRight: 12 }}>%</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#151B25',
          padding: 18,
        }}
        onPress={() => {
          onPressSubmit();
        }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>
          Simpan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormDiskon;

const styles = StyleSheet.create({});
