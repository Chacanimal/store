import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>O carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>€{item.price.toFixed(2)} x {item.quantity}</Text>
                </View>
                <Button title="Remover" onPress={() => removeFromCart(item.id)} />
              </View>
            )}
          />
          <Text style={styles.total}>Total: €{total.toFixed(2)}</Text>
          <Button title="Limpar Carrinho" onPress={clearCart} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 16,
  },
});
