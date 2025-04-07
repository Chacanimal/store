import React from 'react';
import { Platform, View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function HomeScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🖼️ Banner */}
      <TouchableOpacity onPress={() => router.push('/products')}>
      <Image
        source={require('../assets/images/banner.png')}
        style={styles.banner}
        resizeMode="cover"
      />
      </TouchableOpacity>

      {/* Saudação */}
      <Text style={styles.title}>Bem-vindo à Loja!</Text>
      {user && <Text style={styles.subtitle}>Sessão: {user.email}</Text>}

      {/* ⭐ Produtos em Destaque */}
      <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
      <View style={styles.productRow}>
        {featuredProducts.map((product) => (
          <TouchableOpacity
          key={product.id}
          style={styles.productCard}
          onPress={() => router.push('/products')}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <Text>{product.name}</Text>
          <Text style={{ fontWeight: 'bold' }}>€{product.price.toFixed(2)}</Text>
        </TouchableOpacity>
        
        ))}
      </View>

      {/* ℹ️ Sobre Nós */}
      
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sobre Nós</Text>
          <Text style={styles.paragraph}>
            Somos uma loja dedicada a oferecer produtos de qualidade a preços acessíveis.
            A nossa missão é garantir a satisfação dos nossos clientes em todas as compras.
          </Text>
        </View>

        {/* 📍 Localização & Contactos (com card e mapa fake) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Localização & Contactos</Text>
          <Text style={styles.paragraph}>
            📍 Alameda da linha das torres, nº 123, Lisboa{'\n'}
            📞 912 345 678{'\n'}
            ✉️ loja@email.com
          </Text>
          {/* 🗺️ Imagem do mapa (simulação) */}
          <Image
            source={ require('../assets/images/localizaçao.png') }
            style={styles.mapImage}
            resizeMode="cover"
          />
          </View>  
    </ScrollView>
  );
}

const featuredProducts = [
  { id: '1', name: 'LSD', price: 29.99, image: 'https://via.placeholder.com/120' },
  { id: '2', name: 'WEED', price: 49.99, image: 'https://via.placeholder.com/120' },
  { id: '3', name: 'KETAMINE', price: 89.99, image: 'https://via.placeholder.com/120' },
];

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    flexGrow: 1,
    
    alignSelf: 'center',
  },
  banner: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 12,
  },
  section: {
    width: '100%',
    marginTop: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
  },
  productCard: {
    width: '30%',
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 6,
  },
  buttonGroup: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  
  
});
