import { FlatList, View } from "@gluestack-ui/themed";
import MovieCard from "../items/MovieCard";
import Loading from "../Loading";

const MoviesList = ({ navigation, items, type = "movie", loadMore }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => `${item.id}-${Math.floor(Math.random() * 1000)}`}
      renderItem={({ item }) => (
        <MovieCard navigation={navigation} item={item} type={type} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      ListFooterComponent={() => <Loading />}
    />
  );
};

export default MoviesList;
