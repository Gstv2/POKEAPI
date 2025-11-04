// Capitalizar primeira letra
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Converter altura (decímetros para metros)
export const convertHeight = (height) => {
  return (height / 10).toFixed(1);
};

// Converter peso (hectogramas para quilogramas)
export const convertWeight = (weight) => {
  return (weight / 10).toFixed(1);
};

// Formatar ID do Pokémon
export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(3, '0')}`;
};