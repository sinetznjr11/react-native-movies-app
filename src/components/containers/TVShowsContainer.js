import {
  Box,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
} from "@gluestack-ui/themed";
import { getTVShows } from "../../services/apiClient";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import MoviesList from "../lists/MoviesList";

const TVShowsContainer = ({ navigation, route }) => {
  const [tvShows, setTvShows] = useState();
  const [isLoading, setIsLoading] = useState();
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTVShows = async () => {
      console.log("Fetch TV Shows ", category);

      try {
        setIsLoading(true);
        const data = await getTVShows(category, page);
        if (page === 1) {
          setTvShows(data.results);
        } else {
          setTvShows((prevTvShows) => [...prevTvShows, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch TV Shows:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShows();
  }, [category, page]);

  const loadMore = () => {
    console.log("load More, page: ", page);

    if (page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Select
        selectedValue={category}
        p="$4"
        onValueChange={(value) => {
          setPage(1);
          setCategory(value);
        }}
      >
        <SelectTrigger>
          <SelectInput placeholder="Select Category" />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem
              label="Airing Today"
              value="airing_today"
              sx={{
                backgroundColor:
                  category == "airing_today" ? "$cyan100" : "transparent",
              }}
            />
            <SelectItem
              label="On The Air"
              value="on_the_air"
              sx={{
                backgroundColor:
                  category == "on_the_air" ? "$cyan100" : "transparent",
              }}
            />
            <SelectItem
              label="Popular"
              value="popular"
              sx={{
                backgroundColor:
                  category == "popular" ? "$cyan100" : "transparent",
              }}
            />
            <SelectItem
              label="Top Rated"
              value="top_rated"
              sx={{
                backgroundColor:
                  category == "top_rated" ? "$cyan100" : "transparent",
              }}
            />
          </SelectContent>
        </SelectPortal>
      </Select>
      <Box>
        {isLoading && page === 1 ? (
          <Loading />
        ) : (
          <MoviesList
            items={tvShows}
            navigation={navigation}
            loadMore={loadMore}
            type="tv"
          />
        )}
      </Box>
    </Box>
  );
};

export default TVShowsContainer;
