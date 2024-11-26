import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface Planet {
    name: string;
    terrain: string;
    gravity: string;
    url: string;
  }

const StarWarsFetchPlanetData = () => {
  const [data, setData] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const jsonData = await response.json();
        const sortedData = jsonData.results.sort((a, b) => a.name.localeCompare(b.name));
        setData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  if (!data) {
    return <ThemedText>Loading...</ThemedText>;
  }

  const renderItem = ({ item }: { item: Planet }) => (
    <View style={{ borderBlockColor: 'white', padding: 10 }}>
      <ThemedText>Name: {item.name}</ThemedText>
      <ThemedText>Terrain: {item.terrain}</ThemedText>
      <ThemedText>Gravity: {item.gravity}</ThemedText>
      <ThemedText>URL: {item.url}</ThemedText>
    </View>
  );

  return (
    <FlatList 
        data={data} 
        renderItem={renderItem}
        keyExtractor={(item) => item.name.toString()}
    /> 
  );
};

export default StarWarsFetchPlanetData;
