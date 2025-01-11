import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import {useSelector} from 'react-redux';
const setup=()=>{
  const CartReducer = useSelector(state => state.CartReducer);

}
const printer= async() => {
  setup()
 
}

export default printer

