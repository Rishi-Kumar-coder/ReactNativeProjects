import React,{useState} from 'react'
import { ImageBackground, Pressable,TextInput, ScrollView, Text, View, ToastAndroid, Button, TouchableOpacity } from 'react-native'
import ItemCard from './itemCard'
import Product from '../ItemData';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import storage from '@react-native-firebase/storage';
import { Modal } from 'react-native';

export default function ProductView({route, navigation}) {


  const [spinner, setSpinner] = useState(false);

  const productCollection = firestore().collection('products');

  const {productID,daily,forDelivery, productName,productHindiName,productCategory,productSubCategory, productDescription, productPrice, productDiscount, productUrl, productGST, productCode, productSelling} = route.params;
  const productMRP = parseInt(productPrice) -parseInt(productDiscount);

  const [updateProducName, setUpdateProductName] = useState(productName);
  const [updateProductHindiName , setUpdateProductHindiName] = useState(productHindiName);
  const [updateProductCategory, setUpdateProductCategory] = useState(productCategory);
  const [updateProductSubCategory, setUpdateProductSubCategory] = useState(productSubCategory);
  const [updateProductDescription, setUpdateProductDescription] = useState(productDescription);
  const [updateProductPrice, setUpdateProductPrice] = useState(productPrice);
  const [updateProductDiscount, setUpdateProductDiscount] = useState(productDiscount);
  const [updateProductGST, setUpdateProductGST] = useState(productGST);
  const [updateProductCode, setUpdateProductCode] = useState(productCode);
  const [updateProductSelling, setUpdateProductSelling] = useState(productSelling);
  const [updateDaily  , setUpdateDaily] = useState(daily);
  const [updateForDelivery, setUpdateForDelivery] = useState('');

  const [inputPass, setInputPass] = useState("");
  const [passWordModal , setPassWordModal] = useState(false);


  const deleteProduct = async (productID) => {

    setSpinner(true)

    try {

      await storage().refFromURL(productUrl).delete();
      await firestore().collection('products').doc(productID).delete();
      ToastAndroid.show('Product deleted successfully!', ToastAndroid.SHORT);
      setSpinner(false)
      navigation.goBack();

    } catch (error) {
      console.error(error);
      setSpinner(false)
      ToastAndroid.show('Error deleting product!', ToastAndroid.SHORT);
    }
  }

 

  const onUpdate = async () => {
    
    setSpinner(true)
    ToastAndroid.show('Updating product...', ToastAndroid.SHORT);

    setUpdateProductSelling( parseInt(updateProductPrice) + (parseInt(updateProductPrice)*parseInt(updateProductGST)/100) - parseInt(updateProductDiscount));

    const collectionRef = firestore().collection('products').doc(productID);
    await collectionRef.update({
      productName: updateProducName,
      productDescription: updateProductDescription,
      productPrice: updateProductPrice,
      productDiscount: updateProductDiscount,
      productGST: updateProductGST,
      productCode: updateProductCode,
      productSelling: updateProductSelling,
      productNameHindi: updateProductHindiName,
      productCatagory: updateProductCategory,
      productSubCatagory: updateProductSubCategory,
      daily: updateDaily,
      forDelivery: updateForDelivery
    }).then(() => { 

      setSpinner(false)
      ToastAndroid.show('Product updated successfully!', ToastAndroid.SHORT);



      
    });


  }
  
  const checkPassword = async () => {
    try {
      // Fetch password from Firestore
      const passwordDoc = await firestore().collection('password').doc('password').get();
      const password = passwordDoc.data().password;
  
      // Verify password
      if (password === inputPass) {
        setPassWordModal(true);
        // Perform actions if password is correct
      } else {
        // Perform actions if password is incorrect
        alert('Incorrect password!');
      }
    } catch (error) {
      console.log('Error fetching password:', error);
    }
  };


  
  return (

    
    <>

<Modal
        animationType="slide"
        transparent={true}
        visible={!passWordModal}
        onRequestClose={()=>setPassWordModal(false)}
      >
        <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',marginBottom:20}}>

          <View style={{backgroundColor:'white', borderRadius:10, padding:20, margin:20}}>

          <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Enter Password</Text>
          <TextInput onChangeText={(text) => setInputPass(text)} style={{borderWidth:1, borderColor:'gray', borderRadius:10, padding:10,color:'black', marginTop:10}} placeholder="Enter Password" secureTextEntry={true} ></TextInput>
          <TouchableOpacity onPress={checkPassword} style={{backgroundColor:'purple',justifyContent:'center',alignItems:'center', padding:10, borderRadius:10, marginTop:10}}>
            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Submit</Text>
          </TouchableOpacity>

          </View>

          

          
        </View>
      </Modal>
    <ScrollView>
    <Spinner
          visible={spinner}
          textContent={'Uploading...'}
          textStyle={{color:'white'}}
        />

      <ImageBackground style={{flex: 1,
                    
                    height: 300,
                    resizeMode: 'contain'}} source={{uri:productUrl}}></ImageBackground>

      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Daily(put 1 for Daily Deal) :</Text>
      <TextInput style={{margin:10, fontSize:30, fontWeight:'800',  color:'black', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={daily} onChangeText={(text) => setUpdateDaily(text)}></TextInput>


      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>For delivery :</Text>
      <TextInput style={{margin:10, fontSize:30, fontWeight:'800',  color:'black', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={forDelivery} onChangeText={(text) => setUpdateForDelivery(text)}></TextInput>


      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Name :</Text>
      <TextInput style={{margin:10, fontSize:30, fontWeight:'800',  color:'black', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={updateProducName} onChangeText={(text) => setUpdateProductName(text)}></TextInput>


      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Hindi Name :</Text>
      <TextInput style={{margin:10, fontSize:30, fontWeight:'800',  color:'black', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={updateProductHindiName} onChangeText={(text) => setUpdateProductHindiName(text)}></TextInput>
      
      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Category :</Text>
      <TextInput style={{margin:10, fontSize:30, fontWeight:'800',  color:'black', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={updateProductCategory} onChangeText={(text) => setUpdateProductCategory(text)}></TextInput>
      
      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Sub Category :</Text>
      <TextInput style={{margin:10, fontSize:30, fontWeight:'800',  color:'black', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={updateProductSubCategory} onChangeText={(text) => setUpdateProductSubCategory(text)}></TextInput>

      <TextInput style={{marginLeft:10, fontSize:20, color:'grey', borderWidth:0.5, borderColor:'black', borderRadius:10}} value={updateProductDescription} onChangeText={(text) => setUpdateProductDescription(text)}></TextInput>
      
      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Product Code :</Text>
      <TextInput style={{marginLeft:10, fontSize:15, color:'black',borderWidth:0.5, borderColor:'black', borderRadius:10 }} 
      onChangeText={(text) => setUpdateProductCode(text)}
      value={updateProductCode}></TextInput>

      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Price :</Text>
      <TextInput 
      value={updateProductPrice}
      onChangeText={(text) => setUpdateProductPrice(text)}
      style={{marginLeft:10, fontSize:15, color:'black',borderWidth:0.5, borderColor:'black', borderRadius:10 }}></TextInput>

      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>GST :</Text>
      <TextInput 
      value={updateProductGST}
      onChangeText={(text) => setUpdateProductGST(text)}
      style={{marginLeft:10, fontSize:15, color:'black',borderWidth:0.5, borderColor:'black', borderRadius:10 }}></TextInput>

      <Text style={{marginLeft:10, fontSize:15, color:'black'}}>Discount :</Text>
      <TextInput 
      value={updateProductDiscount}
      onChangeText={(text) => setUpdateProductDiscount(text)}

      style={{marginLeft:10, fontSize:15, color:'black',borderWidth:0.5, borderColor:'black', borderRadius:10 }}></TextInput>

      <Text style={{marginLeft:10, fontSize:20, color:'black', textAlign:'center'}}>{updateProductSelling}</Text>

      


    </ScrollView>
    <View style={{height:70, 
      alignContent:'center', 
      justifyContent:'center', flexDirection:'row'}}  >
        <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>

        <TouchableOpacity onPress={onUpdate} style={{margin:5, flex:1, justifyContent:'center', alignContent:'center', borderRadius:5, backgroundColor:'red' }}>

          <Text style={{ alignSelf:'center',fontSize:20, textAlign:'center' ,fontWeight:'600', color:'white'}}>Update</Text>
        </TouchableOpacity>

        
        </View>
        <TouchableOpacity onPress={() => deleteProduct(productID)}
        style={{margin:5, flex:1, justifyContent:'center', alignContent:'center', borderRadius:5, backgroundColor:'red'}}>
          <Text style={{ alignSelf:'center',fontSize:20, textAlign:'center' ,fontWeight:'600', color:'white'}}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
