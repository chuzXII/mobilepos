import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE_URL from '../../../config'
import axios from 'axios'
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'

const Cardkartu = ({ route }) => {
    const { item, type } = route.params;
    const [Data, setData] = useState([]);

    const get = async () => {
        const token = await AsyncStorage.getItem('tokenAccess');
        await axios.get(`${BASE_URL}/kartustok/${item.kode_produk}/${type}`,
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        ).then(res => {

            setData(res.data.data)
        })
    }
    useEffect(() => {
        get();
    }, []);
    return (

        <FlashList
            data={Data}
            keyExtractor={(item) => item.id_kartu}
            estimatedItemSize={100}
            renderItem={({ item }) => (
                // console.log(item.produk.nama_produk)
                <View style={[styles.card, { borderLeftColor: getCardColor(item.jenis_transaksi) }]}>
                    <View style={styles.cardContent}>
                        <View style={styles.leftColumn}>
                            <Text style={[styles.cardTextLeft,{ fontWeight: 'bold',fontSize:18}]}>{item.jenis_transaksi}</Text>
                            <Text style={styles.cardTextLeft}>Stok Awal :{item.stok_awal}</Text>
                            <Text style={styles.cardTextLeft}>Stok Akhir : {item.stok_akhir}</Text>
                            <Text style={styles.cardTextLeft}>Keterangan : {item.referensi}</Text>
                        </View>
                        <View style={[styles.rightColumn,{  backgroundColor: getCardColor(item.jenis_transaksi) }]}>
                            <Text style={styles.cardTextRight}>{getTransactionSymbol(item.jenis_transaksi)}{item.jumlah}</Text>
                        </View>

                    </View>
                </View>

            )}
        />
    )
}

export default Cardkartu
const getCardColor = (type) => {
    switch (type) {
        case 'masuk':
            return 'green';
        case 'keluar':
            return 'red';
        case 'penyesuaian':
            return 'yellow';
        default:
            return 'white';
    }
}
const getTransactionSymbol = (jenisTransaksi) => {
    switch (jenisTransaksi) {
        case 'masuk':
            return '+';  // Untuk jenis transaksi penambahan
        case 'keluar':
            return '-';  // Untuk jenis transaksi pengurangan
        case 'penyesuaian':
            return '~';  // Untuk jenis transaksi status (misalnya, sedang diproses)
        default:
            return '';   // Jika tidak ada tipe yang cocok
    }
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderLeftWidth: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, // Untuk Android
    },
    rightColumn: {
        width:32,
        height:32,
        borderRadius:4,
        alignItems: 'center',
        justifyContent:'center'
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTextLeft: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
    cardTextRight: {
        fontSize: 14,
        color: 'white',
        marginBottom: 5,
    },
})