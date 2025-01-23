import { TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const TokoPage = ({ route }) => {
  const data = route.params
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const onPressPrdouk = () => {
    navigation.navigate('listkatalog', data )
  }
  const onPressPekerja = () => {
    navigation.navigate('listpekerja', data )
  }
  const onPressTransaksi = () => {
    navigation.navigate('transaksi',  data )
  }
  const onPressOpname = () => {
    navigation.navigate('opnamepage',  data )
  }
  const onPressKartustok = () => {
    navigation.navigate('kartustok', data )
  }
  const onPressRiwayatTransaksi = () => {
    navigation.navigate('historypage', data )
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}> */}
      {/* <Text style={styles.headerTitle}>Toko Saya</Text> */}
      {/* <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity> */}
      {/* </View> */}

      <TouchableOpacity style={styles.card} onPress={() => { onPressPrdouk() }}>
        <Text style={styles.cardTitle}>Produk</Text>
        <Text style={{ color: "#000" }}>Kelola produk Anda di sini.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => { onPressPekerja() }}>
        <Text style={styles.cardTitle}>Pekerja</Text>
        <Text style={{ color: "#000" }}>Kelola pekerja Anda di sini.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => { onPressTransaksi() }}>
        <Text style={styles.cardTitle}>Transaksi</Text>
        <Text style={{ color: "#000" }}>Proses transaksi di sini.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => { onPressRiwayatTransaksi() }}>
        <Text style={styles.cardTitle}>Riwayat Transaksi</Text>
        <Text style={{ color: "#000" }}>Riwayat transaksi di sini.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => { onPressOpname() }}>
        <Text style={styles.cardTitle}>Stok Opname</Text>
        <Text style={{ color: "#000" }}>Lakukan pengecekan stok di sini.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => { onPressKartustok() }}>
        <Text style={styles.cardTitle}>Kartu Stok</Text>
        <Text style={{ color: "#000" }}>Cek status kartu stok di sini.</Text>
      </TouchableOpacity>

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4, // Untuk efek bayangan
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#000"
  },
});


export default TokoPage
