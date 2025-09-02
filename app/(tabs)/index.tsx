import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-12 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search"
            />
            {trendingMovies && trendingMovies.length > 0 && (
              <View>
                <Text className="text-white font-bold text-base mt-5 mb-2">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  className="mb-2 mt-3"
                  keyExtractor={(item) => `trending-${item.movieId}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-3" />}
                  contentContainerStyle={{ paddingRight: 16 }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                />
              </View>
            )}
            <>
              <Text className="text-white font-bold text-base mt-4 mb-2">
                Popular Movies
              </Text>
              <FlatList
                data={movies}
                keyExtractor={(item) => `popular-${item.id}`}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 15,
                  marginBottom: 16,
                }}
                className="mt-3 pb-32"
                scrollEnabled={false}
                renderItem={({ item }) => <MovieCard {...item} />}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
