import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface Movie {
    id: number;
    title: string;
    releaseYear: string;
  }

const DataSampleFetch = () => {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reactnative.dev/movies.json');
        const jsonData = await response.json();
        setData(jsonData.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  if (!data) {
    return <ThemedText>Loading...</ThemedText>;
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <ThemedView>
      <ThemedText>Movie Title: {item.title}</ThemedText>
      <ThemedText>Release Year: {item.releaseYear}</ThemedText>
    </ThemedView>
  );

  return (
    <FlatList 
        data={data} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
    /> 
  );
};

export default DataSampleFetch;
