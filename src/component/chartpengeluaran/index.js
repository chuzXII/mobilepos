import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,Dimensions  } from 'react-native'
import React,{ useState ,useEffect} from 'react'
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const ChartPengeluaran = () => {
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [selectedBulan, setSelectedBulan] = useState(null);
    const [selectedTahun, setSelectedTahun] = useState(new Date().getFullYear());
    const [modalVisible, setModalVisible] = useState(false);
    const [Bulana, setBulan] = useState(0);
    const [totalHarga, settotalHarga] = useState([0]);
    const currency = new Intl.NumberFormat('id-ID');
    const currentYear = new Date().getFullYear();

    // Menghasilkan daftar tahun mulai dari 1950 hingga tahun saat ini
    const yearOptions = Array.from({ length: currentYear - 1950 + 1 }, (_, index) =>
        (currentYear - index).toString()
    );
    const get=async()=>{
        const sheetid = await AsyncStorage.getItem('TokenSheet');
        const token = await AsyncStorage.getItem('tokenAccess');
        const headers = {
            Authorization: 'Bearer ' + token,
        }
        const Pengeluaran = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/' +
            sheetid +
            '/values/Pengeluaran', { headers });
            const dataPengeluaran =Pengeluaran.data.values
            const filteredData = dataPengeluaran.filter((fill) => {
                const timestamp = fill[0];
                const [day, month, year] = timestamp.split("-");
                const timestampObj = new Date(`${year}-${month}-${day}`);
                const timestampYear = timestampObj.getFullYear();
                return timestampYear === parseInt(selectedTahun);
            });
        
            const totalHargaPerBulan = {};
            filteredData.forEach((row) => {
                const harga_total = parseInt(row[4]);
                const tglPembelian = moment(row[0], 'DD-MM-YYYY');
                const namaBulan = tglPembelian.format('MMMM');
        
        
                if (totalHargaPerBulan[namaBulan]) {
                    totalHargaPerBulan[namaBulan] += harga_total;
                } else {
                    totalHargaPerBulan[namaBulan] = harga_total;
                }
            });
        
        
            setBulan(Object.keys(totalHargaPerBulan))
            settotalHarga(Object.values(totalHargaPerBulan))
    }
    useEffect(()=>{
        get()
    },[])
   

    const chartConfig2 = {
        backgroundColor: "##0064d6",
        backgroundGradientFrom: "#008efb",
        backgroundGradientTo: "#26d0ff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#9B5EFF"
        },
        propsForBackgroundLines: {
            strokeDasharray: 5, // Gaya garis (misalnya '5, 10' untuk garis putus-putus)
            strokeWidth: 0.5, // Lebar garis
            stroke: '#ddd', // Warna garis
        },
        labelCount: 2,
        strokeWidth: 2,
    };
    const handleDataPointClick = (data) => {
        setSelectedDataset(data.value);
        setSelectedBulan(Bulana[data.index])
    }

    return (

        <View style={styles.wrap}>
            <Text style={styles.title}>Statistik Pengeluaran</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,marginTop:12}}>
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
                    fromZero={true}

                    chartConfig={chartConfig2}
                    onDataPointClick={handleDataPointClick}
                    yAxisLabel={'Rp'}
                    horizontalLabelRotation={-50}
                    // verticalLabelRotation={5}
                    yLabelsOffset={5}
                    xLabelsOffset={24 }
                    formatYLabel={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    segments={3}
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
                                            onPress={() => { setSelectedTahun(item), setModalVisible(!modalVisible) }}>
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

export default ChartPengeluaran
const screenWidth = Dimensions.get("window").width;
const Dheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    wrap: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    chart:{
        marginTop:12
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
})