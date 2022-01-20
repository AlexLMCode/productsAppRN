import React, {createContext, useEffect, useState} from 'react';
import cafeApi from '../api/cafeApi';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    producutId: string,
  ) => {};
  deleteProduct: (id: String) => Promise<Producto>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; //TODO cambiar ANY
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('productos?limite=50');
    // setProducts([...products, ...resp.data.productos]);
    setProducts([...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, resp.data]);
    return resp.data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    producutId: string,
  ) => {
    const resp = await cafeApi.put<Producto>(`/productos/${producutId}`, {
      nombre: productName,
      categoria: categoryId,
    });

    //Si el productoId es igual al de la respuesta, agregara ese, sino ahi lo dejara
    setProducts(products.map(p => (p._id === producutId ? resp.data : p)));
  };

  const deleteProduct = async (id: String): Promise<Producto> => {
    //TODO: MAKE THIS FEATURE
    const resp = await cafeApi.delete<Producto>(`/productos/${id}`);
    return resp.data;
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };

  const uploadImage = async (data: any, id: string) => {};

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
