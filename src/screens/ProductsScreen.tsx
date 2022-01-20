import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {ProductsContext} from '../context/ProductsContext';
import {ProductsStackParams} from '../navigator/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const {signOut} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    //this is the setoptions from the stackscreen root
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginRight: 20}}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: undefined,
                name: undefined,
              })
            }>
            <Text style={{color: 'black'}}>Agregar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginRight: 20}}
            onPress={() => signOut()}>
            <Text style={{color: 'black', backgroundColor: 'blue'}}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  //TODO: pull to refresh
  const loadProductsFromBackend = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 15,
    color: 'black',
  },
  itemSeparator: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    marginVertical: 5,
  },
});

export default ProductsScreen;
