import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ServiceProviderCard = ({
  name,
  services,
  languages,
  experience,
  rating,
  price,
  imageUrl,
  onPressChat,
  onPressCall
}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: imageUrl || 'https://via.placeholder.com/80' }} 
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.services}>{services}</Text>
          <Text style={styles.languages}>{languages.join(', ')}</Text>
          <Text style={styles.experience}>Exp: {experience}</Text>
        </View>
      </View>
      
      <View style={styles.ratingContainer}>
        <MaterialIcons name="star" size={20} color="#FFD700" />
        <Text style={styles.rating}>{rating}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.chatButton} onPress={onPressChat}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton} onPress={onPressCall}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  services: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  languages: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  experience: {
    fontSize: 13,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  priceContainer: {
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ServiceProviderCard;