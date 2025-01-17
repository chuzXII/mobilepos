import React, { useState } from 'react';
import { View, Text, FlatList, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';


const OpnamePage = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
  
    // Data produk (contoh)
    const products = [
      { id: '1', name: 'Produk A' },
      { id: '2', name: 'Produk B' },
      { id: '3', name: 'Produk C' },
      { id: '4', name: 'Produk D' },
      { id: '5', name: 'Produk E' },
    ];
  
    const toggleSelection = (id) => {
      setSelectedProducts((prevSelection) => {
        if (prevSelection.includes(id)) {
          return prevSelection.filter(productId => productId !== id);
        } else {
          return [...prevSelection, id];
        }
      });
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.productItem}>
        <CheckBox
          value={selectedProducts.includes(item.id)}
          onValueChange={() => toggleSelection(item.id)}
        />
        <Text style={styles.productText}>{item.name}</Text>
      </View>
    );
  
    const handleConfirm = () => {
      // Logic untuk mengonfirmasi pemilihan produk
      alert('Produk yang dipilih: ' + selectedProducts.join(', '));
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Produk</Text>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Konfirmasi Pilihan</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    productItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    productText: {
      fontSize: 18,
      marginLeft: 10,
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
    },
  });
export default OpnamePage
