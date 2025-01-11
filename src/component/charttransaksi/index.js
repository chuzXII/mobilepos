import { Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChartTransaksi = () => {
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [selectedBulan, setSelectedBulan] = useState(null);
    const [selectedTahun, setSelectedTahun] = useState(new Date().getFullYear());
    const [modalVisible, setModalVisible] = useState(false);
    const [Bulana, setBulan] = useState(0);
    const [totalHarga, settotalHarga] = useState([0]);

    const currentYear = new Date().getFullYear();
    const currency = new Intl.NumberFormat('id-ID');
    // Menghasilkan daftar tahun mulai dari 1950 hingga tahun saat ini
    const yearOptions = Array.from({ length: currentYear - 1950 + 1 }, (_, index) =>
        (currentYear - index).toString()
    );
    useEffect(() => {
        get()
    }, [])
    const get = async () => {
        const sheetid = await AsyncStorage.getItem('TokenSheet');
        const token = await AsyncStorage.getItem('tokenAccess');
        const headers = {
            Authorization: 'Bearer ' + token,
        }
        const Transaksi = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/' +
            sheetid +
            '/values/Transaksi', { headers });
        const datastrx = Transaksi.data.values
        const uniqueIdtrx = new Set(datastrx.map((transaksi) => transaksi[0]));
        const dataTransaksiUnik = [...uniqueIdtrx].map((idtrx) => {
            return datastrx.find((transaksi) => transaksi[0] === idtrx);
        });
        const filteredData = dataTransaksiUnik.filter((fill) => {
            const timestamp = fill[6];
            const timestampYear = new Date(parseInt(timestamp)).getFullYear();
            return timestampYear === parseInt(selectedTahun);
        });

        const totalHargaPerBulan = {};
        filteredData.forEach((transaksi) => {
            const harga_total = parseInt(transaksi[4]);
            const tglPembelian = new Date(parseInt(transaksi[6]));
            const namaBulan = tglPembelian.toLocaleString('default', { month: 'long' }); // Menggunakan nama bulan

            if (totalHargaPerBulan[namaBulan]) {
                // Jika sudah ada, tambahkan harga_total pada bulan tersebut
                totalHargaPerBulan[namaBulan] += harga_total;
            } else {
                // Jika belum ada, inisialisasi dengan harga_total pada transaksi tersebut
                totalHargaPerBulan[namaBulan] = harga_total;
            }
        });

        setBulan(Object.keys(totalHargaPerBulan))
        settotalHarga(Object.values(totalHargaPerBulan))
        // console.log(Object.values(totalHargaPerBulan))
    }


    const handleDataPointClick = (data) => {
        setSelectedDataset(data.value);
        setSelectedBulan(Bulana[data.index])

    }
    // Konfigurasi chart
    const chartConfig = {
        backgroundColor: "#5700e2",
        backgroundGradientFrom: "#4D5AFF",
        backgroundGradientTo: "#9B5EFF",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "3",
            stroke: "#4096f7"
        },
        propsForBackgroundLines: {
            strokeDasharray: 5, // Gaya garis (misalnya '5, 10' untuk garis putus-putus)
            strokeWidth: 0.5, // Lebar garis
            stroke: '#ddd', // Warna garis
        },

    };


    const OpenModal =(item)=>{
        setSelectedTahun(item)
        setModalVisible(!modalVisible)
    }
    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>Statistik Pemasukan</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <View>
                    <Text style={styles.bulan}>Bulan : {selectedDataset !== null ? selectedBulan : '-'}</Text>
                    <Text style={styles.total}>Total   : {selectedDataset !== null ? 'Rp.' + currency.format(selectedDataset) : '-'}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{ borderWidth: 1, borderRadius: 4, padding: 8 }} onPress={() => {
                        setModalVisible(true);
                    }}>
                        <Text style={{ color: '#000', fontSize: 16, fontFamily: 'TitilliumWeb-Regular', alignItems: 'center' }}>{selectedTahun}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {Bulana.length > 0 ?
                <View style={styles.chart}>
                    <LineChart
                        data={{
                            labels: Bulana,
                            datasets: [
                                {
                                    data: totalHarga
                                }
                            ]
                        }}
                        withVerticalLines={false}
                        width={screenWidth * 0.94}
                        height={400}
                        chartConfig={chartConfig}
                        onDataPointClick={handleDataPointClick}
                        yAxisLabel={'Rp'}
                        horizontalLabelRotation={-50}
                        // verticalLabelRotation={5}
                        yLabelsOffset={5}
                        xLabelsOffset={24}
                        fromZero={true}
                        segments={3}
                        formatYLabel={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} // Memformat label sumbu Y dengan tanda titik sebagai pemisah ribuan
                        style={{
                            borderRadius: 12,
                        }}
                        bezier
                    />
                </View>
                : <Text
                    style={{
                        color: '#000',
                        fontSize: 20,
                        fontWeight: '500',
                        textAlign: 'center',
                        marginVertical: 12,
                    }}>
                    Tidak Menemukan Data
                </Text>}
            <Modal transparent={true} visible={modalVisible}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                    }}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            width: screenWidth / 1.2,
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
                                {yearOptions.map((item, i) => {
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            style={styles.btnitemcategory}
                                            onPress={() => OpenModal(item)}>
                                            <Text style={{ color: '#000', textAlign: 'center' }}>
                                                {item}
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
    )
}

export default ChartTransaksi
const screenWidth = Dimensions.get("window").width;
const Dheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    wrap: {
        marginTop: 12,

        marginHorizontal: 12
    },
    title: {
        textAlign: 'center',
        fontSize: 21,
        color: '#000',
        fontFamily: 'TitilliumWeb-Bold'
    },
    bulan: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'TitilliumWeb-Regular'
    },
    total: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'TitilliumWeb-Regular',
        marginBottom: 12
    },
    btnitemcategory: {
        padding: 18,
        backgroundColor: '#ededed',
    },
    chart: {
        marginTop: 12
    }
})