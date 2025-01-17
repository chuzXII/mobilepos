import { TextInput, TouchableOpacity, StyleSheet, Text, View, Image, Modal, Switch, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import BASE_URL from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { emptyproduct } from '../../assets';
import { FlashList } from '@shopify/flash-list';
import ItemList2 from '../../component/itemlist2';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const KategoriPage = () => {
    const navigation = useNavigation();
    const [Data, setData] = useState([]);
    const [SelectData, setSelectData] = useState({});
    const [id, setId] = useState([]);
    const [EditNama, setEditNama] = useState('');
    const [EditDiskon, setEditDiskon] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleadd, setModalVisibleadd] = useState(false);
    const [Cek, setCek] = useState(true);
    const [isEnabled, setIsEnabled] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const get = async () => {
        const token = await AsyncStorage.getItem('tokenAccess');
        await axios.get(`${BASE_URL}` + '/kategori',
            {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        ).then(res => {
            setData(res.data.data)
        })

    };
    const onPressadd = async () => {
        const token = await AsyncStorage.getItem('tokenAccess');

        const response = await axios.post(`${BASE_URL}` + '/kategori', {
            nama_kategori: EditNama
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then(() => {
            closeModaladd()
        });
    };
    const onPress = ({ item, i }) => {
        setModalVisible(true);
        setEditNama(item.nama_kategori);
        setId(item.kode_kategori)
    };
    const closeModaladd = () => {
        setModalVisibleadd(false);
        setEditNama('');
        setId('')
    };
    const closeModaledt = () => {
        setEditNama('');
        setId('')
        setModalVisible(false);
    };
    const onPressedit = async () => {
        try {
            const token = await AsyncStorage.getItem('tokenAccess');
            const response = await axios.put(`${BASE_URL}/kategori/${id}`, {
                nama_kategori: EditNama
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }).then(() => {
                closeModaledt()
            });
        } catch (error) {
            console.log(error.response)
        }
       
    }
    const onPressdelete = (item) => {
        setEditNama('');
        setId('')
        Dialog.show({
            type: ALERT_TYPE.CONFIRM,
            title: 'Konfirmasi',
            textBody: 'Apakah Anda yakin ingin melanjutkan?',
            autoClose: false,
            onPressYes: async() => {
                try {

                    const token = await AsyncStorage.getItem('tokenAccess');
                    await axios.delete(`${BASE_URL}/kategori/${item.item.kode_kategori}`,
                        {
                            headers: {
                                Authorization: 'Bearer ' + token,
                            },
                        },
                    )
                } catch (error) {
                    console.log(error.response)
                }
            },
            // Aksi saat tombol "Tidak" ditekan
            onPressNo: () => {
                console.log('Pengguna membatalkan penghapusan!');
            },
        })
        // return(AlertComfirm())
    }
    const onRefresh = () => {
        setRefreshing(true);
        get();
    };
    const renderItem = item => {
        return (
            <View style={{ marginVertical: 12 }} >
                <ItemList2
                    data={item}
                    onPress={() => onPress({ item })}
                    onLongPress={() => onPressdelete({ item })}
                    delayLongPress={100}
                />
            </View>
        )
    }
    useEffect(() => {
        get();
    }, [isFocused, Cek]);
    return (
        <View
            style={{
                justifyContent: 'space-between',
                flex: 1,
                backgroundColor: '#fff',
            }}>
            <View style={{ flex: 1, marginHorizontal: 16 }}>
              
                {Data.length > 1 ?
                    <FlashList
                        data={Data}
                        renderItem={item => renderItem(item.item)}
                        estimatedItemSize={30}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    : <View style={styles.imgContainerStyle}>
                        <View style={styles.imgwarpStyle}>
                            <Image style={styles.imageStyle} source={emptyproduct} />
                        </View>
                    </View>}

            </View>

            <TouchableOpacity
                style={{ backgroundColor: '#151B25', padding: 18, alignItems: 'center' }}
                onPress={() => setModalVisibleadd(true)}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>
                    Tambah Kategori
                </Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
                key={SelectData[0]}>
                <TouchableOpacity
                    onPress={() =>closeModaledt()}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    <View style={styles.modalView}>
                        <View style={styles.wrapcard}>
                            <Text
                                style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    fontSize: 24,
                                    fontWeight: '500',
                                }}>
                                EDIT
                            </Text>

                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 19,
                                    fontWeight: '500',
                                    marginVertical: 12,
                                }}>
                                Nama Diskon
                            </Text>
                            <TextInput
                                placeholderTextColor={'#000'}
                                placeholder={'Nama Diskon'}
                                value={EditNama}
                                onChangeText={value => setEditNama(value)}
                                style={{
                                    color: '#000',
                                    fontSize: 16,
                                    borderWidth: 1,
                                    borderColor: '#18AECF',
                                    borderRadius: 12,
                                    paddingHorizontal: 12,
                                }}
                            />



                            <TouchableOpacity
                                style={{
                                    padding: 12,
                                    backgroundColor: '#151B25',
                                    marginTop: 12,
                                    borderRadius: 12,
                                    alignItems: 'center',
                                }}
                                onPress={() => onPressedit()}>
                                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '500' }}>
                                    Simpan
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal
                transparent={true}
                visible={modalVisibleadd}
                onRequestClose={() => setModalVisibleadd(!modalVisibleadd)}
                key={SelectData[0]}>
                <TouchableOpacity
                    onPress={() => closeModaladd()}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                    <View style={styles.modalView}>
                        <View style={styles.wrapcard}>
                            <Text
                                style={{
                                    color: '#000',
                                    textAlign: 'center',
                                    fontSize: 24,
                                    fontWeight: '500',
                                }}>
                                TAMBAH
                            </Text>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 19,
                                    fontWeight: '500',
                                    marginVertical: 12,
                                }}>
                                Nama Kategori
                            </Text>
                            <TextInput
                                placeholderTextColor={'#000'}
                                placeholder={'Nama Kategori'}
                                value={EditNama}
                                onChangeText={value => setEditNama(value)}
                                style={{
                                    color: '#000',
                                    fontSize: 16,
                                    borderWidth: 1,
                                    borderColor: '#18AECF',
                                    borderRadius: 12,
                                    paddingHorizontal: 12,
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    padding: 12,
                                    backgroundColor: '#151B25',
                                    marginTop: 12,
                                    borderRadius: 12,
                                    alignItems: 'center',
                                }}
                                onPress={() => onPressadd()}>
                                <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '500' }}>
                                    Simpan
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const Dwidth = Dimensions.get('window').width;
const Dheight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    modalView: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 2,
    },
    wrapcard: {
        margin: 14,
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
});

export default KategoriPage
