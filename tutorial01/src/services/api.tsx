import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const pokemonAPI = {
  // Buscar lista de pokémons paginada
  getPokemons: async (offset = 0, limit = 20) => {
    try {
      const response = await api.get(`?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar lista de pokémons');
    }
  },

  // Buscar detalhes de um pokémon específico
  getPokemonDetails: async (urlOrId) => {
    try {
      const url = typeof urlOrId === 'number' 
        ? `${urlOrId}/` 
        : urlOrId.replace(BASE_URL, '');
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar detalhes do pokémon');
    }
  },

  // Buscar detalhes de múltiplos pokémons
  getMultiplePokemonDetails: async (pokemonList) => {
    try {
      const promises = pokemonList.map(pokemon => 
        pokemonAPI.getPokemonDetails(pokemon.url)
      );
      return await Promise.all(promises);
    } catch (error) {
      throw new Error('Erro ao buscar detalhes dos pokémons');
    }
  }
};

export default api;