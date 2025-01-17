import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const DetailOpname = () => {
    const [data, setData] = useState([
        {
          id_detail: 1,
          id_opname: 'OP123',
          kode_produk: 'P001',
          stok_fisik: 50,
          stok_sistem: 45,
          selisih: 5,
          keterangan: '',
        },
        // Add more records here
      ]);
    
      const handleSave = () => {
        // Add save functionality here
        alert('Data saved');
      };
    
      const renderItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.text}>{item.kode_produk}</Text>
          <Text style={styles.text}>{item.stok_fisik}</Text>
          <Text style={styles.text}>{item.stok_sistem}</Text>
          <Text style={styles.text}>{item.selisih}</Text>
          <TextInput
            style={styles.input}
            placeholder="Keterangan"
            value={item.keterangan}
            onChangeText={(text) => {
              const newData = [...data];
              newData[item.id_detail - 1].keterangan = text;
              setData(newData);
            }}
          />
        </View>
      );
    
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Stok Opname</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_detail.toString()}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      row: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      text: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
      },
      input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        marginLeft: 10,
      },
      saveButton: {
        marginTop: 20,
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
export default DetailOpname

