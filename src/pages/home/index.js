import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { React, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../../../config';
import { color } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const currency = new Intl.NumberFormat('id-ID');

  const navigation = useNavigation();
  const [dashboardData, setDashboardData] = useState(null);
  const [tokoList, setTokoList] = useState([]);
  const [UserData, setUserData] = useState([]);

  const onPressadd = async () => {
    navigation.navigate('formaddtoko')
  };
  const onPresstoko = (item) => {

    navigation.navigate('tokopage',{data:item});
  };
  
  const get = async () => {
    const datasession = await AsyncStorage.getItem('datasession');
    setUserData(JSON.parse(datasession).user)
    try {
      // setModalVisibleLoading(true);
      const token = await AsyncStorage.getItem('tokenAccess');
      const res = await axios.get(`${BASE_URL}/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setDashboardData(res.data.data);
      setTokoList(res.data.data.toko);
      // setModalVisibleLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(error.message);
        setRefreshing(false);
      } else if (error.request) {
        console.log(error.request);
        alert(error.message);
        setRefreshing(false);
      } else {
        console.log('Error', error.message);
        alert(error.message);
        setRefreshing(false);
      }
    };
  };
  useEffect(() => {
    get();

  }, []);
  return (
    <ScrollView style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{UserData.role}</Text>
      <Text style={styles.cardValue}>Email: {UserData.email}</Text>
    </View>
      {dashboardData && (
        <>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total Produk</Text>
              <Text style={styles.cardValue}>{dashboardData.produk_count}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Total Transaksi</Text>
              <Text style={styles.cardValue}>{dashboardData.transaksi_count}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Pendapatan</Text>
            <Text style={styles.cardValue}>Rp {currency.format(dashboardData.total_pendapatan)}</Text>
          </View>
        </>
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Daftar Toko</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onPressadd()} >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {tokoList.map((toko) => (
        <TouchableOpacity key={toko.id_toko} style={styles.tokoItem} onPress={() => onPresstoko(toko)}>
          <Text style={styles.tokoName}>{toko.nama_toko}</Text>
          <Text style={styles.tokoAlamat}>{toko.alamat_toko}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#000"
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000"
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: "#000"
  },
  tokoItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  tokoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000"
  },
  tokoAlamat: {
    fontSize: 18,
    color: "#000"
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

});
export default Home;