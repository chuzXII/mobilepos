import {Image, StyleSheet, Text, View} from 'react-native';
import React,{ useEffect,useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomDrawer = props => {
  const [user,setUser] = useState({})
  const get=async()=>{
    const user= JSON.parse(await AsyncStorage.getItem('usergooglesignin'))
setUser(user)
  }
  useEffect(()=>{
    get()
  },[])
  return (
    <View style={{flex:1}}>
   
        <View style={{height:150,justifyContent:'center',backgroundColor:'#000080'}}>
          <View style={{alignItems:'center',flexDirection:'row'}}>
          <Image source={{uri:user.photo}} style={{height:65,width:65,borderRadius:50,marginLeft:12}}/>
          <View style={{marginLeft:12}}>
          <Text style={{color:'#fff',fontSize:18,fontFamily:'TitilliumWeb-Bold'}}>{user.name}</Text>
          <Text style={{color:'#fff',fontSize:14,fontFamily:'TitilliumWeb-Regular'}}>{user.email}</Text>
          
          </View>
          
          </View>
         

        </View>
        

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{alignItems:'center',backgroundColor:'#151B25'}}>
        <Text style={{color:'#fff',marginTop:8,fontWeight:'500',fontFamily:'TitilliumWeb-Bold'}}>Create By Me</Text>
        <Text style={{color:'#fff',marginBottom:8,fontWeight:'500',fontFamily:'TitilliumWeb-Bold'}}>Copyright@2022</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
