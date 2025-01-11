import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { hsdLogo } from '../../assets/image/dummy-logo';
import { chiilLogo } from '../../assets/image/logo';

const SamplePrint = () => {
  return (
    <View>
      <Text>Sample Print Instruction</Text>

      <View style={styles.btn}>
        <Button
          title="Print Struk Belanja"
          onPress={async () => {
            let columnWidths = [8, 20, 20];
            try {
              await BluetoothEscposPrinter.printText('\r\n\r\n', {});
              // await BluetoothEscposPrinter.printPic(chiilLogo, { width: 100, left:250 });
              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              await BluetoothEscposPrinter.setBlob(3);
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.CENTER],
                ['Perum Tegal Asri Blok D22, RT.007/RW.002, Ds.karanganyar, Kec.Tegalampel, Kab.Bondowoso'],
                {},
              );
              await BluetoothEscposPrinter.setBlob(0);
              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );

              await BluetoothEscposPrinter.printColumn(
                [16,16],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["082140083902",'IG:Chill_idn.co'],
                {},
              );

              await BluetoothEscposPrinter.printColumn(
                [10, 22],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Transaksi', 'TRX-12331244124124'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [16, 16],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['17 Des 2022', '11:50'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.LEFT],
                ['WA : 082140083902'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.LEFT],
                ['IG : Chill_idn.co'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [11, 11, 11],
                [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.CENTER,BluetoothEscposPrinter.ALIGN.RIGHT],
                ['==========', 'Products','=========='],
                {},
              );

              // await BluetoothEscposPrinter.printText(
              //   '============',
              //   {},
              // );
              // await BluetoothEscposPrinter.printText('Products',{});
              // await BluetoothEscposPrinter.printText(
              //   '=============',
              //   {},
              // );
              // await BluetoothEscposPrinter.printText(
              //   'Ice',
              //   {},
              // );
              // await BluetoothEscposPrinter.printColumn(
              //   columnWidths,
              //   [
              //     BluetoothEscposPrinter.ALIGN.LEFT,
              //     BluetoothEscposPrinter.ALIGN.LEFT,
              //     BluetoothEscposPrinter.ALIGN.RIGHT,
              //   ],
              //   ['1xRp.2000', 'Rp.200.000'],
              //   {},
              // );

              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.LEFT],
                ['Ice'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [16, 16],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['1xRp.2000', 'Rp.200.000'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [32],
                [BluetoothEscposPrinter.ALIGN.LEFT],
                ['Ice'],
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [16, 16],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['1xRp.2000', 'Rp.200.000'],
                {},
              );
              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );
              await BluetoothEscposPrinter.printColumn(
                [16, 16],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Subtotal', 'Rp.900.000'],
                {},
              );

              // await BluetoothEscposPrinter.printColumn(
              //   [16,16],
              //   [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //   ['Packaging', 'Rp.6.000'],
              //   {},
              // );
              // await BluetoothEscposPrinter.printColumn(
              //   [16, 16],
              //   [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
              //   ['Delivery', 'Rp.0'],
              //   {},
              // );

              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );
              await BluetoothEscposPrinter.setBlob(3)
              await BluetoothEscposPrinter.printColumn(
                [16, 16],
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ['Total', 'Rp.906.000'],
                {},
              );
              await BluetoothEscposPrinter.printText('\r\n\r\n', {});
              // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);

              // await BluetoothEscposPrinter.printText(
              //   '================================',
              //   {},
              // );
              // await BluetoothEscposPrinter.printColumn(
              //   [32],
              //   [BluetoothEscposPrinter.ALIGN.CENTER],
              //   ['Sabtu, 18 Juni 2022 - 06:00 WIB'],
              //   {},
              // );
              // await BluetoothEscposPrinter.printText(
              //   '================================',
              //   {},
              // );
              // await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              // await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            } catch (e) {
              alert(e.message || 'ERROR');
            }
          }}
        />
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
