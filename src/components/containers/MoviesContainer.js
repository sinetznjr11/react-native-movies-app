import { getMovies } from "../../services/apiClient";
import {
  Box,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  Icon,
  ChevronDownIcon,
  CheckIcon,
} from "@gluestack-ui/themed";
import MoviesList from "../lists/MoviesList";
import { useState, useEffect } from "react";
import Loading from "../Loading";

const MoviesContainer = ({ navigation }) => {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState();
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      console.log("Fetch movies ", selectedCategory);

      try {
        setIsLoading(true);
        const data = await getMovies(selectedCategory, page);
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory, page]);

  const loadMore = () => {
    console.log("load More, page: ", page);

    if (page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Select
        selectedValue={selectedCategory}
        onValueChange={(value) => {
          setPage(1);
          setSelectedCategory(value);
        }}
        my="$4"
        px="$4"
        _selectedItem={{
          backgroundColor: "$primary500",
          _text: { color: "$textLight0" },
          endIcon: <CheckIcon size="5" color="$textLight0" />,
        }}
      >
        <SelectTrigger>
          <SelectInput placeholder="Select category" />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                _pressed={{ bg: "black" }}
                key={category.value}
                label={category.label}
                value={category.value}
                sx={{
                  backgroundColor:
                    selectedCategory == category.value
                      ? "$cyan100"
                      : "transparent",
                }}
              />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
      {isLoading && page === 1 ? (
        <Loading />
      ) : (
        <MoviesList
          navigation={navigation}
          items={movies}
          type="movie"
          loadMore={loadMore}
        />
      )}
    </Box>
  );
};

export default MoviesContainer;
