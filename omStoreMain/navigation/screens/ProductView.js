import React , {useState} from 'react'
import {View, Text, ToastAndroid,ScrollView, TouchableOpacity ,ImageBackground, StyleSheet, Image} from 'react-native'
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';


export default function ProductView({route, navigation}) {

    const {productID,images,productNameHindi, productForDelivery,productCatagory, productSubCatagory,productName,productSeller ,productCode, productSelling,productDescription, productPrice, productDiscount, productUrl, ListImageURL,productGST} = route.params;

    const productSP = parseInt(productPrice) - parseInt(productDiscount);
const [userEmail , setUserEmail] = useState('');

    const [productCount, setproductCount] = useState(1);
    const [isSpinnerVisible, setisSpinnerVisible] = useState(false);
    const [isModalVisible, setisModalVisible] = useState(false);
    const [index, setindex] = useState(0);

    const [Images, setimages] = useState([
        productUrl, ListImageURL
      ]);

      

      

      

   



    var path = RNFS.DocumentDirectoryPath + '/test.txt';
    RNFS.readFile(path, 'utf8').then((contents) => {
      // console.log(contents);


  
     setUserEmail(contents);
    //   ToastAndroid.show(userEmail, ToastAndroid.SHORT);
  
      return contents;
    }).catch((err) => {
      console.log(err.message);
    });
    

    console.log(images);

    const onIncrease = ()=>{
        setproductCount(productCount + 1)
    }

    const onDecrease = ()=>{
        if(productCount > 1){
        setproductCount(productCount - 1)
        }
    }
    const onAddCart = async ()=>{

        setisSpinnerVisible(true);

        firestore().collection('cart').doc(userEmail).collection('products').doc(productID).set({
            productID: productID,
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productDiscount: productDiscount,
            productUrl: productUrl,
            productCount: productCount,
            productSelling: productSelling,
            productCode: productCode,
            productGST: productGST,

            
        }).then(() => {
    
            setisSpinnerVisible(false);
          ToastAndroid.show('Added to Cart', ToastAndroid.SHORT);
          navigation.goBack();
          
    
        }).catch((error) => {
            console.log(error.message);
            setisSpinnerVisible(false);
            ToastAndroid.show('Failed to add. Please try again.', ToastAndroid.SHORT);

        });
        

    }
  
  return (
    <>
    <ScrollView style={{height:'100%', flex:1,backgroundColor:'white'}}>

        <Modal 
        isVisible={isModalVisible}
        onBackdropPress={() => setisModalVisible(false)}
        onSwipeComplete={() => setisModalVisible(false)}
        onBackButtonPress={() => setisModalVisible(false)}
        swipeDirection="down"
        style={{justifyContent: 'flex-end', margin: 0,}}
        >
        <View style={{backgroundColor:'white', height:'100%', width:'100%', borderRadius:10, padding:10}}>
            <ImageViewer
                imageUrls={images}
                renderIndicator={() => null}

                style={{height: 300, flex:1, }}
                />
        </View>
        </Modal>

        <Spinner visible={isSpinnerVisible} textContent={'Adding to Cart...'} textStyle={{color:'white'}} />

        {/* <ImageBackground style={{flex: 1,
                    borderRadius:10,
                    overflow:'hidden',
                    height: 300,
                    resizeMode: 'contain', 
                    }} source={{uri:productUrl}}></ImageBackground> */}
        <ImageViewer
                        imageUrls={images}
                        renderIndicator={() => null}
                        backgroundColor='white'


                        style={{height: 300, flex:1, }}
                        />
        

        {/* <SliderBox
        images={Images}
        sliderBoxHeight={300}
        onCurrentImagePressed={index =>{
            if(index == 0){
                images[0].url = productUrl;
            }
            else{
                images[0].url = ListImageURL;
            }
            setindex(index);
            setisModalVisible(true);
        }
          }
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
        resizeMethod={'resize'}
        // resizeMode={'cover'}
        zoomEnabled={true}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)"
        }}
        ImageComponentStyle={{borderRadius: 0, width: '100%', marginTop: 0}}
        imageLoadingColor="#2196F3"
        /> */}



        
        <Text style={{color:'red',padding:5,alignSelf:'center', textAlign:'center'}}>{productForDelivery}</Text>

        <View style={{flexDirection:'row'}}>
        <Text style={style.productTitle}>{productName}</Text>


        <Text style={style.productDiscount}>-{productDiscount}₹ off</Text>
        </View>
        <Text style={style.productTitle}>{productNameHindi}</Text>

        <Text style={style.productTitle}>{productCode}</Text>
        <Text style={style.productDescription}>{productCatagory},{productSubCatagory}</Text>
        <Text style={style.productDescription}>by:{productSeller}</Text>
        <Text style={style.productDescription}>GST: {productGST}%</Text>

        <Text style={style.productDescription}>{productDescription}</Text>

        <Text style={{ textDecorationLine:'line-through', margin:10, color:'black', fontSize:20}} >₹{parseInt(productPrice) + (parseInt(productGST)/100*parseInt(productPrice)) }</Text>
        <Text style={{ margin:10, color:'green', fontSize:25}} >₹{productSelling} only</Text>

        


    </ScrollView>

    <Text style={{color:'grey',backgroundColor:'white', textAlign:'right', paddingEnd:15}} >{productCount}X{productSelling}={parseInt(productSelling)*parseInt(productCount) }</Text>
    <View style={{ width:'95%',backgroundColor:'white' ,alignSelf:'baseline', height:60, flexDirection:'row',margin:5 ,paddingBottom:15}}>
    
    <View style={{width:'50%',backgroundColor:'white' ,alignContent:'center',alignItems:'center' ,justifyContent:"center"}}>

        <View style={{flexDirection:'row',backgroundColor:'white', marginTop:10}}>
            <TouchableOpacity onPress={onDecrease}>
                <Text style={{color:'black', fontSize:30}}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={{color:'black', fontSize:30, marginStart:10, marginEnd:10}}>{productCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onIncrease}>
                <Text style={{color:'black', fontSize:30}}>+</Text>
            </TouchableOpacity>



        </View>

    </View>

    <View style={{width:'50%' }}>

        <TouchableOpacity onPress={onAddCart} style={{backgroundColor:'red',borderRadius:15 ,width:'100%', height:'100%', margin:5, padding:5, alignItems:'center',alignContent:'center' ,justifyContent:'center'}}>
            <Text style={{fontSize:15,padding:10 ,flex:1,color:'white',width:'100%',fontWeight:'600',textAlign:'center',justifyContent:'center', alignSelf:'center',height:'100%'}}>+Add</Text>
        </TouchableOpacity>


    </View>
    
</View>
</>
  )
}

const style = StyleSheet.create({

    productTitle:{
        flex:1,

        fontSize:30,
        flex:1,
        margin:10,
        fontWeight:'900',
        color:'black',



    },

    productDiscount:{
        color:'red',
        fontWeight:'600',
        margin:10,
        fontSize:30

    },

    productDescription:{

        margin:10,
        fontSize:18,
        
        color:'grey',


    }


}

    

)
