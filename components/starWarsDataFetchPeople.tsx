import React, { useEffect, useState, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface People {
    name: string;
    height: string;
    mass: string;
  }

const BASE_URL = 'https://swapi.dev/api/';

const StarWarsDataSampleFetch = () => {
  const [data, setData] = useState<People[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}people`, { signal: abortControllerRef.current.signal });
        const jsonData = await response.json();
        setData(jsonData.results);
      } catch (e: any) {
        if(e.name === 'AbortError') {
          console.log('fetch aborted');
          return;
        }
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  if (!data) {
    return <ThemedText>Loading...</ThemedText>;
  }

  const renderItem = ({ item }: { item: People }) => (
    <ThemedView>
      <ThemedText>Name: {item.name}</ThemedText>
      <ThemedText>Height: {item.height}</ThemedText>
      <ThemedText>Mass: {item.mass}</ThemedText>
    </ThemedView>
  );

  return (
    <FlatList 
        data={data} 
        renderItem={renderItem}
        keyExtractor={(item) => item.name.toString()}
    /> 
  );
};

export default StarWarsDataSampleFetch;
