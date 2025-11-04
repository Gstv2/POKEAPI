import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { globalStyles, pokemonTypeColors } from '../styles/globalStyles';
import { capitalizeFirst, formatPokemonId } from '../utils/helpers';

const PokemonCard = ({ pokemon, onPress }) => {
  const { name, id, sprites, types } = pokemon;

  return (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={onPress}
      accessibilityLabel={`Pokémon ${name}. Pressione para ver detalhes`}
      accessibilityRole="button"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: sprites.front_default }}
          style={[globalStyles.pokemonImage, { width: 80, height: 80 }]}
          accessibilityLabel={`Imagem do Pokémon ${name}`}
        />
        
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[globalStyles.subtitle, { fontSize: 16 }]}>
            {capitalizeFirst(name)}
          </Text>
          <Text style={[globalStyles.text, { fontSize: 14, marginBottom: 8 }]}>
            {formatPokemonId(id)}
          </Text>
          
          <View style={globalStyles.typeContainer}>
            {types.map((typeInfo, index) => (
              <View
                key={index}
                style={[
                  globalStyles.typeBadge,
                  { backgroundColor: pokemonTypeColors[typeInfo.type.name] || '#3498db' }
                ]}
              >
                <Text style={globalStyles.typeText}>
                  {capitalizeFirst(typeInfo.type.name)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;