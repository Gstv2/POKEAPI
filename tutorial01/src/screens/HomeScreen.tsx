import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { pokemonAPI } from '../services/api';
import { globalStyles } from '../styles/globalStyles';
import PokemonCard from '../components/PokemonCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomeScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const loadPokemons = async (isRefresh = false) => {
    try {
      setError(null);
      if (!isRefresh) {
        setLoading(true);
      }

      const url = isRefresh ? null : nextUrl;
      const response = url 
        ? await pokemonAPI.getPokemonDetails(url)
        : await pokemonAPI.getPokemons();

      const pokemonList = url ? response.results : response.results;
      const pokemonDetails = await pokemonAPI.getMultiplePokemonDetails(pokemonList);

      if (isRefresh) {
        setPokemons(pokemonDetails);
      } else {
        setPokemons(prev => [...prev, ...pokemonDetails]);
      }

      setNextUrl(response.next);
    } catch (err) {
      setError(err.message);
      Alert.alert('Erro', 'Não foi possível carregar os pokémons');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setNextUrl(null);
    loadPokemons(true);
  }, []);

  const loadMore = useCallback(() => {
    if (nextUrl && !loading) {
      loadPokemons();
    }
  }, [nextUrl, loading]);

  useEffect(() => {
    loadPokemons();
  }, []);

  const handlePokemonPress = (pokemon) => {
    navigation.navigate('Details', { pokemon });
  };

  const renderPokemonCard = ({ item }) => (
    <PokemonCard
      pokemon={item}
      onPress={() => handlePokemonPress(item)}
    />
  );

  if (loading && pokemons.length === 0) {
    return <LoadingSpinner message="Carregando Pokémons..." />;
  }

  if (error && pokemons.length === 0) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => loadPokemons(true)}
      />
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Pokédex</Text>
      
      <FlatList
        data={pokemons}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#e74c3c']}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && pokemons.length > 0 ? (
            <LoadingSpinner message="Carregando mais pokémons..." />
          ) : null
        }
        ListEmptyComponent={
          !loading && (
            <ErrorMessage message="Nenhum Pokémon encontrado" />
          )
        }
      />
    </View>
  );
};

export default HomeScreen;