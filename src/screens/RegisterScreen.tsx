import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {WhiteLogo} from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {loginStyles} from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {email, password, form, onChange} = useForm({
    email: '',
    password: '',
  });

  const onRegister = () => {
    console.log(form);
    Keyboard.dismiss();
  };
  return (
    <>
      {/*  Background  */}
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856D6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Keyboard avoid view */}
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Register</Text>
          <Text style={loginStyles.label}>Name</Text>
          <TextInput
            placeholder="Type your name"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor="white"
            //TODO: onchange, value
            autoCapitalize="words"
            autoCorrect={false}
            value={email}
            onSubmitEditing={onRegister}
          />
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Type your email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor="white"
            //TODO: onchange, value
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
          />
          {/* PASSWORD */}

          <Text style={loginStyles.label}>Password:</Text>
          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry={true}
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'password')}
            value={password}
          />

          {/* Boton Loin */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}>
              <Text style={loginStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
          {/* Create new account */}
          <View style={loginStyles.newAccountContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={() => navigation.replace('LoginScreen')}>
              <Text style={loginStyles.buttonText}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
