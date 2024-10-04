import { Box, Text } from "@gluestack-ui/themed";
import SearchForm from "../forms/SearchForm";
import { useState } from "react";
import { search } from "../../services/apiClient";
import MoviesList from "../lists/MoviesList";
import Loading from "../Loading";
import { Keyboard } from "react-native";

const SearchContainer = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState();
  const [results, setResults] = useState();
  const [type, setType] = useState("movie");

  const performSearch = async (query) => {
    Keyboard.dismiss();
    setIsLoading(true);
    search(type, query)
      .then((data) => {
        setResults(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error performing search:", error);
        setIsLoading(false);
      });
  };

  return (
    <Box>
      <SearchForm onSubmit={performSearch} type={type} setType={setType} />

      {isLoading ? (
        <Loading />
      ) : results ? (
        <MoviesList items={results} navigation={navigation} type={type} />
      ) : (
        <Box p="$8" alignItems="center">
          <Text size="2xl" bold>
            Please initiate a search
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SearchContainer;
