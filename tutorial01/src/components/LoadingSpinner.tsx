import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const LoadingSpinner = ({ message = 'Carregando...' }) => {
  return (
    <View style={globalStyles.loadingContainer}>
      <ActivityIndicator size="large" color="#e74c3c" />
      <Text style={[globalStyles.text, { marginTop: 16 }]}>{message}</Text>
    </View>
  );
};

export default LoadingSpinner;