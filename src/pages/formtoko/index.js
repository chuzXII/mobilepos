import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Modal, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from '../../component/label';
import Input from '../../component/input';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../../../config';
import { setForm } from '../../redux/action';

const Formtoko = () => {
    const navigation = useNavigation();
    // const { barcodes } = route.params;
    const FormReducer = useSelector(state => state.FormTokoReducer);
    const dispatch = useDispatch();
    const [ID, setid] = useState(0);
    const [Check, setCheck] = useState(false);
    const [modalVisibleCategory, setModalVisibleCategory] = useState(false);
    const [Datakateogri, setDatakateogri] = useState([]);
    const [errors, setErrors] = useState({});
    const onPress = async () => {
        const datasession = await AsyncStorage.getItem('datasession');
        const token = await AsyncStorage.getItem('tokenAccess');
        const response = await axios.post(`${BASE_URL}` + '/toko', {
            nama_toko:  FormReducer.form.namatoko,
            alamat_toko:  FormReducer.form.alamattoko
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).then(() => {
            navigation.goBack();
        });
       
    };
    const onInputChange = (value, input) => {
        dispatch(setForm(input, value));
    };

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
                                value={FormReducer.form.namatoko}
                                onChangeText={value => onInputChange(value, 'namatoko')}
                            />
                        </View>
                        <Label label={'Alamat Toko'} />
                        <View style={styles.formgroup}>
                            <Input
                                input={'Alamat Produk'}
                                numberOfLines={1}
                                value={FormReducer.form.alamattoko}
                                onChangeText={value => onInputChange(value, 'alamattoko')}
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
    )
}
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
        elevation: 2
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
export default Formtoko