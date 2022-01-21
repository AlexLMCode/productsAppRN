import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, ActivityIndicator} from 'react-native';

const LoadingScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={50} color="black" />
    </View>
  );
};

export default LoadingScreen;
