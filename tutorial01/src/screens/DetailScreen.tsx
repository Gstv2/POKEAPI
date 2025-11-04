import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { globalStyles, pokemonTypeColors } from '../styles/globalStyles';
import {
  capitalizeFirst,
  convertHeight,
  convertWeight,
  formatPokemonId,
} from '../utils/helpers';

const DetailScreen = ({ route }) => {
  const { pokemon } = route.params;
  const {
    name,
    id,
    sprites,
    height,
    weight,
    types,
    abilities,
    stats,
  } = pokemon;

  return (
    <ScrollView style={globalStyles.container}>
      <View style={[globalStyles.card, { alignItems: 'center' }]}>
        <Text style={globalStyles.title}>
          {capitalizeFirst(name)}
        </Text>
        <Text style={[globalStyles.subtitle, { marginBottom: 16 }]}>
          {formatPokemonId(id)}
        </Text>

        <Image
          source={{ uri: sprites.front_default }}
          style={[globalStyles.pokemonImage, { width: 200, height: 200 }]}
          accessibilityLabel={`Imagem do Pokémon ${name}`}
        />

        {/* Tipos */}
        <View style={{ marginVertical: 16 }}>
          <Text style={[globalStyles.subtitle, { textAlign: 'center' }]}>
            Tipos
          </Text>
          <View style={[globalStyles.typeContainer, { justifyContent: 'center' }]}>
            {types.map((typeInfo, index) => (
              <View
                key={index}
                style={[
                  globalStyles.typeBadge,
                  {
                    backgroundColor: pokemonTypeColors[typeInfo.type.name] || '#3498db',
                    marginHorizontal: 4,
                  },
                ]}
              >
                <Text style={globalStyles.typeText}>
                  {capitalizeFirst(typeInfo.type.name)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Características Físicas */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginVertical: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={globalStyles.subtitle}>Altura</Text>
            <Text style={globalStyles.text}>{convertHeight(height)} m</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={globalStyles.subtitle}>Peso</Text>
            <Text style={globalStyles.text}>{convertWeight(weight)} kg</Text>
          </View>
        </View>

        {/* Habilidades */}
        <View style={{ width: '100%', marginVertical: 16 }}>
          <Text style={[globalStyles.subtitle, { textAlign: 'center' }]}>
            Habilidades
          </Text>
          <View style={[globalStyles.typeContainer, { justifyContent: 'center' }]}>
            {abilities.map((abilityInfo, index) => (
              <View
                key={index}
                style={[
                  globalStyles.typeBadge,
                  {
                    backgroundColor: '#27ae60',
                    marginHorizontal: 4,
                  },
                ]}
              >
                <Text style={globalStyles.typeText}>
                  {capitalizeFirst(abilityInfo.ability.name)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Estatísticas */}
        <View style={{ width: '100%', marginVertical: 16 }}>
          <Text style={[globalStyles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
            Estatísticas
          </Text>
          {stats.map((statInfo, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
                paddingHorizontal: 16,
              }}
            >
              <Text style={[globalStyles.text, { flex: 1 }]}>
                {capitalizeFirst(statInfo.stat.name.replace('-', ' '))}
              </Text>
              <View
                style={{
                  flex: 2,
                  height: 20,
                  backgroundColor: '#ecf0f1',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${(statInfo.base_stat / 255) * 100}%`,
                    backgroundColor: statInfo.base_stat > 80 ? '#2ecc71' : 
                                     statInfo.base_stat > 50 ? '#f39c12' : '#e74c3c',
                    borderRadius: 10,
                  }}
                />
              </View>
              <Text style={[globalStyles.text, { width: 30, textAlign: 'right', marginLeft: 8 }]}>
                {statInfo.base_stat}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;