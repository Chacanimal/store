import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🖼️ Banner */}
      <Image
        source={{ uri: 'https://via.placeholder.com/400x200.png?text=Promoções+Especiais' }}
        style={styles.banner}
        resizeMode="cover"
      />

      {/* Saudação */}
      <Text style={styles.title}>Bem-vindo à Loja!</Text>
      {user && <Text style={styles.subtitle}>Sessão iniciada como: {user.email}</Text>}

      {/* ⭐ Produtos em Destaque */}
      <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featuredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text>{product.name}</Text>
            <Text style={{ fontWeight: 'bold' }}>€{product.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      {/* ℹ️ Sobre Nós */}
      <Text style={styles.sectionTitle}>Sobre Nós</Text>
      <Text style={styles.paragraph}>
        Somos uma loja dedicada a oferecer produtos de qualidade a preços acessíveis.
        A nossa missão é garantir a satisfação dos nossos clientes em todas as compras.
      </Text>

      {/* 📍 Contactos */}
      <Text style={styles.sectionTitle}>Localização & Contactos</Text>
      <Text style={styles.paragraph}>
        📍 Rua das Compras, nº 123, Lisboa{'\n'}
        📞 912 345 678{'\n'}
        ✉️ loja@email.com
      </Text>

      {/* Botões */}
      <View style={{ marginTop: 20 }}>
        <Button title="Ver Produtos" onPress={() => router.push('./screens/ProductsScreen')} />
        <Button title="Ver Carrinho" onPress={() => router.push('./screens/CartScreen')} />
        <Button
          title="Sair"
          color="red"
          onPress={() => {
            logout();
            router.replace('./screens/LoginScreen');
          }}
        />
      </View>
    </ScrollView>
  );
}

const featuredProducts = [
  { id: '1', name: 'Camisola', price: 29.99, image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Calças', price: 49.99, image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Tênis', price: 89.99, image: 'https://via.placeholder.com/100' },
];

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    textAlign: 'justify',
  },
  productCard: {
    alignItems: 'center',
    marginRight: 16,
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 6,
  },
});
