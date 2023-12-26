import React , {useState, useEffect}from 'react'
import { View, Text , FlatList, ScrollView} from 'react-native'
import { TextInput } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'
import OrderCard from './OrderCard'
import firestore from '@react-native-firebase/firestore';

export default function OrderScreen() {

    const [qurreyName , setQurreyName] = useState('')
    const [querryDate , setQuerryDate] = useState('')
    const [data, setData] = useState([]);

    useEffect(() => {
        // Reference to your Firestore collection
        const collectionRef = firestore().collection('orders');
    
        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            const items = snapshot.docs.map((doc) => ({
            
            orderId: doc.data().orderID,
            customerName: doc.data().orderUserName,
            customerEmail: doc.data().orderUserEmail,
            orderDate: doc.data().orderDate,
            orderStatus: doc.data().orderStatus,
            customerPhone: doc.data().orderUserPhone,
            orderTotal: doc.data().orderAmount,
            orderItems: doc.data().orderAllItem,
            orderOTP: doc.data().orderOTP,
            orderUserAddress: doc.data().orderUserAddress,
            forBill: doc.data().forBill,
            TotalCost: doc.data().orderCost,
            TotalDiscount: doc.data().orderDiscount,
            orderDeleviryCharge: doc.data().orderDeleviryCharge,
            orderRefferal: doc.data().orderRefferal,  
    
            })).filter((item) => {  
                if(qurreyName == ''){
                    return item
                }else if(item.customerName.toLowerCase().includes(qurreyName.toLowerCase())){
                    return item
                }
            }).filter((item) => {
                if(querryDate == ''){
                    return item
                }else if(item.orderDate.includes(querryDate)){
                    return item
                }
            });
            setData(items);
        });
    
        return () => {
            unsubscribe();
        };
        }, []);


        async function searchOrderByName(query) {
          const collectionRef = firestore().collection('orders');
          const snapshot = await collectionRef
            .where('orderUserName', '>=', query)
            .where('orderUserName', '<=', query + '\uf8ff')
            .get();
          const items = snapshot.docs.map(doc => ({
            orderId: doc.data().orderID,
            customerName: doc.data().orderUserName,
            customerEmail: doc.data().orderUserEmail,
            orderDate: doc.data().orderDate,
            orderStatus: doc.data().orderStatus,
            customerPhone: doc.data().orderUserPhone,
            orderTotal: doc.data().orderAmount,
            orderItems: doc.data().orderAllItem,
            orderOTP: doc.data().orderOTP,
            orderUserAddress: doc.data().orderUserAddress,
            forBill: doc.data().forBill,
            TotalCost: doc.data().orderCost,
            TotalDiscount: doc.data().orderDiscount,
            orderDeleviryCharge: doc.data().orderDeleviryCharge,
            orderRefferal: doc.data().orderRefferal,

    
          }));
          setData(items); 
        }
      
        async function searchOrderByDate(query) {
          const collectionRef = firestore().collection('orders');
          const snapshot = await collectionRef
            .where('orderDate', '>=', query)
            .where('orderDate', '<=', query + '\uf8ff')
            .get();
          const items = snapshot.docs.map(doc => ({
            orderId: doc.data().orderID,
            customerName: doc.data().orderUserName,
            customerEmail: doc.data().orderUserEmail,
            orderDate: doc.data().orderDate,
            orderStatus: doc.data().orderStatus,
            customerPhone: doc.data().orderUserPhone,
            orderTotal: doc.data().orderAmount,
            orderItems: doc.data().orderAllItem,
            orderOTP: doc.data().orderOTP,
            orderUserAddress: doc.data().orderUserAddress,
            forBill : doc.data().forBill,
            TotalCost: doc.data().orderCost,
            TotalDiscount: doc.data().orderDiscount,
            orderDeleviryCharge: doc.data().orderDeleviryCharge,
            orderRefferal: doc.data().orderRefferal,
    
          }));
          setData(items); 
        }


    
    




  return (
    <ScrollView>
    <View>
      <Text style={{color:'black', fontSize:40, margin:10, fontWeight:'800', letterSpacing:3}}>Orders</Text>

      <View>
        <Text style={{color:'black', fontSize:20, margin:10, fontWeight:'400'}}>Search By Name:</Text>
        <TextInput  onChangeText={(text) => searchOrderByName(text)} style={{color:'black', fontSize:16, margin:10, fontWeight:'400'}} placeholder="Enter Name Here"></TextInput>
      </View>
      <View>
        <Text style={{color:'black', fontSize:20, margin:10, fontWeight:'400'}}>Search By Date:{querryDate}</Text>
        <TextInput style={{margin:10}} keyboardType='numbers-and-punctuation' placeholder='DD/MM/YY' onChangeText={(text) => searchOrderByDate(text)} ></TextInput>
        
      </View>

      <FlatList style={{ width:"90%", height:'100%', alignSelf:'center'}}
      
        data={data}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => <OrderCard orderId={item.orderId} 
        
                                            customerName={item.customerName}
                                            customerEmail={item.customerEmail}
                                            orderDate={item.orderDate}
                                            orderStatus={item.orderStatus}
                                            customerPhone={item.customerPhone}
                                            orderTotal={item.orderTotal}
                                            orderItems={item.orderItems}
                                            orderOTP={item.orderOTP}
                                            orderUserAddress={item.orderUserAddress}
                                            forBill={item.forBill}
                                            TotalCost={item.TotalCost}
                                            TotalDiscount={item.TotalDiscount}
                                            orderDeleviryCharge={item.orderDeleviryCharge}
                                            orderRefferal={item.orderRefferal}
                                           />}

      >
      </FlatList>
      
    </View>
    </ScrollView>
  )
}
