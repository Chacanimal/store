import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Bem-vindo à Loja!</Text>
      <Button title="Ver Produtos" onPress={() => router.push('./screens/ProductsScreen')} />
      <Button title="Ver Carrinho" onPress={() => router.push('./screens/CartScreen')} />
      <Button title="Sair" color="red" onPress={() => {
        logout();
        router.replace('./screens/LoginScreen');
      }} />
    </View>
  );
}
