import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({route, navigation}: Props) => {
  const {id = '', name = ''} = route.params;
  const {
    loadProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
  } = useContext(ProductsContext);

  const {categories} = useCategories();
  const {_id, categoriaId, nombre, img, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  const [tempUri, setTempUri] = useState<string>();

  useEffect(() => {
    //this is the setoptions from the stackscreen root
    navigation.setOptions({
      title: nombre ? nombre : 'New Product',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      // if (categoriaId.length === 0) {
      //   onChange(categories[0]._id, 'categoriaId');
      // }
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const loadProduct = async () => {
    if (id.length === 0) {
      return;
    } else {
      const product = await loadProductById(id);
      setFormValue({
        _id: id,
        categoriaId: product.categoria._id,
        img: product.img || '',
        nombre: nombre,
      });
      console.log(product);
    }
  };

  const deleteSelectedProd = async () => {
    console.log(_id);

    const deletedProduct = await deleteProduct(_id);
    console.log(deletedProduct);
    navigation.replace('ProductsScreen');
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) {
          return;
        }
        if (!resp.assets) {
          return;
        } else {
          setTempUri(resp.assets[0].uri);
          uploadImage(resp, _id);
        }
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) {
          return;
        }
        if (!resp.assets) {
          return;
        } else {
          setTempUri(resp.assets[0].uri);
          uploadImage(resp, _id);
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Product name"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Category:</Text>
        {/* Picker / Selector */}
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}
          style={styles.container}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
          <Picker.Item label="Java" value="java" />
        </Picker>
        <Button title="Guardar" onPress={saveOrUpdate} color="#5856d6" />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <Button title="Camera" onPress={takePhoto} color="#5856d6" />
            <Button
              title="Gallery"
              onPress={takePhotoFromGallery}
              color="#5856d6"
            />
            <Button title="Delete" onPress={deleteSelectedProd} color="red" />
          </View>
        )}
        {/* Save and gallery buttons */}

        {img.length > 0 && !tempUri && (
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
        {/* TODO: PLACE TEMPORAL IMAGE */}
        {tempUri && (
          <Image
            source={{uri: tempUri}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    marginVertical: 15,
    height: 45,
  },
});

export default ProductScreen;
