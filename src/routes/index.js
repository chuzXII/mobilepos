import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Formkasir from '../pages/formkasir';
import Dashboard from '../pages/dashboard';
import { useNavigation } from '@react-navigation/native';
import Cartpage from '../pages/cartpage';
import Setupage from '../pages/setup';
import GuidePage from '../pages/guide';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Iabout, Idiskon, Idrawer, Ihistory, Ihome, Ilist, Isexcel, Isprint, Ichart, Iscan } from '../assets/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SetupPrinter from '../pages/setupprinter';
import CustomDrawer from '../component/customdrawer';
import AboutPage from '../pages/aboutpage';
import FinalPage from '../pages/finalpage';
import Splashscreen from '../pages/splashscreen';
import HistoryPage from '../pages/historypage';
import HistoryItemPage from '../pages/historyitempage';
import LoginPage from '../pages/loginpage';
import DiskonPage from '../pages/diskonpage';
import FormDiskon from '../pages/formdiskon';
import ListKatalog from '../pages/listkatalogpage';
import FormEdit from '../pages/formeditkatalog';
import PengeluaranPage from '../pages/pengeluaranpage';
import Camscan from '../component/Camscan';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChartTransaksi from '../component/charttransaksi';
import ChartPengeluaran from '../component/chartpengeluaran';
import KategoriPage from '../pages/kategoripage';
import PekerjaPage from '../pages/tokopage';
import TokoPage from '../pages/tokopage';
import Home from '../pages/home';
import ListToko from '../pages/llisttoko';
import Formtoko from '../pages/formtoko';
import { color } from 'react-native-reanimated';
import Formedittoko from '../pages/formedittoko';
import axios from 'axios';
import BASE_URL from '../../config';
import ListPekerjaPage from '../pages/listpekerjapage';
import KartuStokPage from '../pages/kartustokpage';
import DetailKartuStok from '../pages/detailkartustok';
import DetailOpname from '../detailopname';
import OpnamePage from '../pages/opnamepage';




const Routes = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const navigations = useNavigation();
  const Drawer = createDrawerNavigator()
  const Tab = createMaterialTopTabNavigator();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cek, setCek] = useState(false)
  const get = async () => {
    const cek = await AsyncStorage.getItem('TokenSheet')
    if (cek) {
      setCek(true)
    }
  }

  useEffect(() => {
    get()
  }, [])
  const Routestack = () => {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ drawerLabelStyle: { fontFamily: 'TitilliumWeb-Bold' } }}>
        <Drawer.Screen name='home' component={Home} options={({ navigation }) => ({
          drawerIcon: ({ focused, size }) => (<Ihome />),
          title: 'Dashboard', headerStyle: {
            backgroundColor: '#000080',
          }, headerTitleStyle: { color: '#fff' }, headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 12 }}>
              <Idrawer />
            </TouchableOpacity>
          ),
        })} />
        <Drawer.Screen name='listtoko' component={ListToko} options={({ navigation }) => ({
          drawerIcon: ({ focused, size }) => (<Ihome />),
          title: 'Daftar Toko', headerStyle: {
            backgroundColor: '#000080',

          }, headerTitleStyle: { color: '#fff' }, headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 12 }}>
              <Idrawer />
            </TouchableOpacity>
          ),
        })} />
        {/* <Drawer.Screen name='dashboard' component={Dashboard} options={({ navigation }) => ({
          drawerIcon: ({ focused, size }) => (<Ihome />),
          title: 'Transaksi', headerStyle: {
            backgroundColor: '#000080',
           
          },headerTitleStyle:{ color:'#fff'}, headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 12 }}>
              <Idrawer />
            </TouchableOpacity>
          ), 
        })} /> */}
        {/* <Drawer.Screen name='listkatalog' component={ListKatalog} options={{ title: 'Produk', drawerIcon: ({ focused, size }) => (<Ilist />) }} /> */}
        <Drawer.Screen name='kategori' component={KategoriPage} options={{ title: 'Kategori', drawerIcon: ({ focused, size }) => (<Ilist />) }} />
        {/* <Drawer.Screen name='toko' component={TokoPage} options={{ title: 'Toko', drawerIcon: ({ focused, size }) => (<Ilist />) }} /> */}

        <Drawer.Screen name='historypage' component={HistoryPage}
          options={({ navigation }) => ({
            title: 'Riwayat Transaksi', drawerIcon: ({ focused, size }) => (<Ihistory />), headerRight: () => (
              <TouchableOpacity onPress={() => navigations.navigate('SetupPrinter')} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderRadius: 20, padding: 4 }}>
                <Isprint />
              </TouchableOpacity>)
          })} />
        {/* <Drawer.Screen name='diskonpage' component={DiskonPage} options={{ title: 'Diskon', drawerIcon: ({ focused, size }) => (<Idiskon />) }} /> */}
        {/* <Drawer.Screen name='pengeluaranpage' component={PengeluaranPage} options={{ title: 'Pengeluaran', drawerIcon: ({ focused, size }) => (<Ilist />) }} /> */}
        {/* <Drawer.Screen name='toptab' component={Toptab} options={{ headerShown: false, title: 'Statistik', drawerIcon: ({ focused, size }) => (<Ichart />) }} /> */}
        {/* <Drawer.Screen name='setupage' component={Setupage} options={{ title: 'Setup Spreedsheet', headerShown: false, drawerIcon: ({ focused, size }) => (<Isexcel />) }} /> */}
        <Drawer.Screen name='SetupPrinter' component={SetupPrinter} options={{ title: 'Setup Printer', headerShown: false, drawerIcon: ({ focused, size }) => (<Isprint />) }} />

        {/* <Drawer.Screen name='aboutpage' component={AboutPage} options={{ title: 'About', headerShown: false, drawerIcon: ({ focused, size }) => (<Iabout />) }} /> */}
      </Drawer.Navigator>
    )
  }
  const Toptab = () => {
    return (
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#034687',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}>
        <Tab.Screen name="charttransaksi" component={ChartTransaksi} options={{ tabBarLabel: 'Statistik Pemasukan' }} />
        <Tab.Screen name="chartpengeluaran" component={ChartPengeluaran} options={{ tabBarLabel: 'Statistik Pengeluaran' }} />
      </Tab.Navigator>
    )
  }
  return (
    <Stack.Navigator >
      <Stack.Screen name='splashscreen' component={Splashscreen} options={{ headerShown: false }} />
      <Stack.Screen name='loginpage' component={LoginPage} options={{ headerShown: false }} />
      {/* {!cek ? <Stack.Screen name='GuidePage' component={GuidePage} options={{ headerShown: false }} /> : null} */}
      <Stack.Screen name='Routestack' component={Routestack} options={{ headerShown: false }} />
      <Stack.Screen name='formkasir' component={Formkasir} options={{ title: 'Tambah Katalog', headerShown: false }} />
      <Stack.Screen name='formaddtoko' component={Formtoko} options={{ title: 'Tambah Toko', headerShown: false }} />
      <Stack.Screen name='formedittoko' component={Formedittoko} options={{ title: 'Tambah Toko', headerShown: false }} />
      <Stack.Screen name='tokopage' component={TokoPage} options={({ navigation, route }) => ({
        title: 'Detail Toko',
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('formedittoko', { data: route.params?.data }) // pass tokoId from route
            }
          >
            <Text style={{ fontSize: 24, paddingRight: 10, color: "#000" }}>☰</Text>
          </TouchableOpacity>
        ),
      })} />
      {/* <Stack.Screen name='camscan' component={Camscan} options={{}} /> */}
      {/* <Stack.Screen name='setupage' component={Setupage} /> */}
      <Stack.Screen name='cartpage' component={Cartpage} options={{ title: 'Keranjang' }} />
      <Stack.Screen name='historyitempage' component={HistoryItemPage} options={{ title: 'Detail History' }} />
      {/* <Stack.Screen name='formdiskon' component={FormDiskon} options={{ title: 'Tambah Diskon' }} /> */}
      <Stack.Screen name='formedit' component={FormEdit} options={{ title: 'Edit Menu' }} />
      <Stack.Screen name='finalpage' component={FinalPage} options={{ headerShown: false }} />
      <Stack.Screen name='listkatalog' component={ListKatalog} options={{ headerShown: true }} />
      <Stack.Screen name='listpekerja' component={ListPekerjaPage} options={{ headerShown: true }} />
      <Stack.Screen name='dashboard' component={Dashboard} options={{ headerShown: true }} />
      <Stack.Screen name='kartustok' component={KartuStokPage} options={{ headerShown: true }} />
      <Stack.Screen name='detailkartustok' component={DetailKartuStok} options={{ headerShown: true }} />
      <Stack.Screen name='detailopname' component={DetailOpname} options={{ headerShown: true }} />
      <Stack.Screen name='opnamepage' component={OpnamePage} options={{ headerShown: true }} />
    </Stack.Navigator>

  )
}

export default Routes

const styles = StyleSheet.create({})