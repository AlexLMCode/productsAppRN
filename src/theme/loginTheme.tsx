import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  label: {
    marginTop: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  inputField: {
    color: 'white',
    fontSize: 20,
  },
  inputFieldIos: {
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  newAccountContainer: {
    alignItems: 'flex-end',
    marginTop: 50,
  },
  loginButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 1000,
  },
});
export {loginStyles};
