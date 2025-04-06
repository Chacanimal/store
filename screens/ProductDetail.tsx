import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext'; // importa o contexto do carrinho

const products = [
  {
    id: '1',
    name: 'Camisola',
    price: 29.99,
    image: 'https://via.placeholder.com/300',
    description: 'Camisola confortável de algodão.',
  },
  {
    id: '2',
    name: 'Calças',
    price: 49.99,
    image: 'https://via.placeholder.com/300',
    description: 'Calças jeans modernas e resistentes.',
  },
  {
    id: '3',
    name: 'Tênis',
    price: 89.99,
    image: 'https://via.placeholder.com/300',
    description: 'Tênis desportivo ideal para corrida.',
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart(); // usa o hook do carrinho

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>€{product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Adicionar ao Carrinho" onPress={() => addToCart(product)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    marginVertical: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
