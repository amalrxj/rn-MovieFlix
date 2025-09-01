import { View, Image, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="w-full flex absolute z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        renderItem={({ item }) => <MovieCard {...item} />}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-12 mb-5" />
            </View>
            <View className="my-5 ">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white font-bold text-base mb-5">
                {" "}
                Search result for{" "}
                <Text className="text-accentText">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-5 px-5">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim()
                  ? `No results found for "${searchQuery}"`
                  : "Please enter a search term."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
