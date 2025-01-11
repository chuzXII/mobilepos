import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import React from 'react';
import { backgroundabout } from '../../assets';
import { Igithub, Imail, Iweb } from '../../assets/icon';

const AboutPage = () => {
  return (
    <View style={{ height: Dimensions.get('screen').height }}>
      <ImageBackground
        source={backgroundabout}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            width: 340,
            height: 450,
            borderRadius: 24,
          }}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ alignItems: 'center', marginTop: 28 }}>
              <View
                style={{
                  backgroundColor: '#61E2FF',
                  width: 200,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold' }}>
                  Contact Me
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:kzkzaj@gmail.com')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12,
              }}>
              <Imail />
              <Text style={{ color: '#000', fontSize: 20, marginLeft: 8, fontFamily: 'Khula-Regular' }}>
                kzkzaj@gmail.com
              </Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginVertical: 12 }}>
              <View
                style={{
                  backgroundColor: '#61E2FF',
                  width: 220,
                  height: 40,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold' }}>
                  More Information
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://portfolioil.thecapz.com/')
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 12,
              }}>
              <Iweb />

              <Text style={{ color: '#000', fontSize: 20, marginLeft: 8, fontFamily: 'Khula-Regular' }}>
              https://authorportfolio.nixie.my.id/
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://github.com/chuzXII')
              }
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Igithub />
              <Text style={{ color: '#000', fontSize: 20, marginLeft: 8, fontFamily: 'Khula-Regular' }}>
                https://github.com/chuzXII
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AboutPage;

const styles = StyleSheet.create({});
