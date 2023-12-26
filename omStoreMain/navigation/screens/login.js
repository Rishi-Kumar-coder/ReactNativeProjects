import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import RNFS from 'react-native-fs';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  var path = RNFS.DocumentDirectoryPath + '/test.txt';

  // write the file

  if (auth().currentUser) {
    navigation.navigate('Home', email);
  }

  const gotoRegister = () => {
    navigation.navigate('Register');
  };

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(String(email), String(password))
      .then(() => {
        RNFS.writeFile(path, String(email), 'utf8')
          .then(success => {
            console.log('FILE WRITTEN!');
            ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
        navigation.navigate('Home');
          })
          .catch(err => {
            console.log(err.message);
          });

        
      })
      .catch(error => {
        if (error.code === 'auth/invalid-login') {
          ToastAndroid.show('Invalid Email or Password', ToastAndroid.SHORT);
        }
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            placeholderTextColor={'grey'}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 10}}
          onPress={gotoRegister}
          textAlign="center"
          justifyContent="center"
          alignItems="center">
          <Text textAlign="center">New Here? Create Account !</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 32,
    alignSelf: 'flex-start',
    paddingStart: 32,
    color: 'white',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: 'grey',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
