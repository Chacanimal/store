import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const products = [
  { id: '1', name: 'Camisola', price: 29.99, image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Calças', price: 49.99, image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Tênis', price: 89.99, image: 'https://via.placeholder.com/100' },
];

export default function ProductsScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ pathname: './screens/ProductDetail', params: { id: item.id } })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{ padding: 16 }}>
        <Button title="Ver Carrinho" onPress={() => router.push('./screens/CartScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#555',
  },
});
