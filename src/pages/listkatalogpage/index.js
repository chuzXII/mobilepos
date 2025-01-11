import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ItemKatalog from '../../component/itemkatalog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { emptyproduct } from '../../assets/image';
import { FlashList } from '@shopify/flash-list';
import { TextInput } from 'react-native-gesture-handler';
import { Ifilter } from '../../assets/icon';

const ListKatalog = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [DumyData, setDumyData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisibleCategory, setModalVisibleCategory] = useState(false);

  const datacategory = [
    { id: 1, category: 'All' },
    { id: 2, category: 'Mod' },
    { id: 3, category: 'Pod' },
    { id: 4, category: 'Accecories' },
    { id: 5, category: 'Authomizer' },
    { id: 6, category: 'Freebase' },
    { id: 7, category: 'Saltnic' },
  ];
  const renderitem = (item) => {
    return (
      <View style={{ marginTop: 18, paddingBottom: 2 }}>
        <ItemKatalog
          item={item.item}
          onPress={() =>
            navigation.navigate('formedit', { id: item.item[0], data: item.item })
          }
        />
      </View>
    );
  };

  const get = async () => {
    try {
      const sheetid = await AsyncStorage.getItem('TokenSheet');
      const token = await AsyncStorage.getItem('tokenAccess');
      await axios
        .get(
          'https://sheets.googleapis.com/v4/spreadsheets/' +
          sheetid +
          '/values/Produk',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(res => {
          if (res.data.values == undefined) {
            setData([]);
            setRefreshing(false);

          }
          else {
            setData(res.data.values);
            setDumyData(res.data.values)
            setRefreshing(false);
          }

        });
    } catch (error) {
      console.log(error);
    }
  };
  const Filter = (textinput, category) => {
    if (textinput == null) {
      if (category.toLowerCase() == 'all') {
        setData(DumyData)
        setModalVisibleCategory(!modalVisibleCategory)
      }
      else {
        const a = DumyData.filter(fill => fill[3] != null ? fill[3].toLowerCase() == category.toLowerCase() : null)
        setData(a)
        // console.log(a)
        setModalVisibleCategory(!modalVisibleCategory)
      }
    }
    else {
      const input = textinput.toLowerCase()
      if (input == ' ' || input == null) {
        setData(DumyData)
      }
      else {
        const results = DumyData.filter(product => {
          const productName = product[1].toLowerCase();
          return productName.includes(input);
        });
        setData(results)
      }
    }


  };
  const onRefresh = async () => {
    setRefreshing(true);
    get();
  };

  useEffect(() => {
    get();
  }, [1]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.wrapheader}>
        <View style={styles.kontenheader}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Search"
            style={styles.search}
            editable={true}
            onChangeText={(value) => Filter(value, null)}
          />
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              setModalVisibleCategory(true);
            }}>
            <Ifilter />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 8 }}>
        {Data == 0 ? (
          <View style={styles.imgContainerStyle}>
            <View style={styles.imgwarpStyle}>
              <Image style={styles.imageStyle} source={emptyproduct} />
            </View>
          </View>
        ) : (
          <FlashList
            data={Data}
            renderItem={(item) => renderitem(item)}
            estimatedItemSize={100}
            refreshing={refreshing}
            onRefresh={onRefresh} />
        )}
      </View>


      <TouchableOpacity
        style={{ backgroundColor: '#151B25', padding: 18, alignItems: 'center' }}
        onPress={() => navigation.navigate('formkasir', { barcodes: null })}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>
          Tambah Katalog
        </Text>
      </TouchableOpacity>
      <Modal transparent={true} visible={modalVisibleCategory}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
          onPress={() => setModalVisibleCategory(!modalVisibleCategory)}>
          <View
            style={{
              backgroundColor: '#fff',
              width: Dwidth / 1.2,
              height: Dheight / 2.5,
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
                      onPress={() => Filter(null, item.category)}>
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

export default ListKatalog;
const Dwidth = Dimensions.get('window').width;
const Dheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  wrapheader: {
    backgroundColor: '#fff',
    width: '100%',
    height: 70,
  },
  kontenheader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  search: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 14,
    marginRight: 12,
    color: '#000',
  },
  filter: {
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgwarpStyle: {
    marginHorizontal: Dwidth * 0.06,
    marginTop: Dheight / 4.5,
    height: Dheight / 2.5,
    width: Dwidth / 1.2,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  btnitemcategory: {
    padding: 18,
    backgroundColor: '#ededed',
  },
});
