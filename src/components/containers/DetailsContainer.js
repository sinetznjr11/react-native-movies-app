import {
  Box,
  Center,
  HStack,
  VStack,
  Image,
  Text,
  ScrollView,
} from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { getDetails } from "../../services/apiClient";
import Loading from "../Loading";

const DetailsContainer = ({ route }) => {
  const { detailsRoute } = route.params;
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getDetails(detailsRoute);
        setDetails(data);
      } catch (error) {
        console.error("DetailsContainer: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, []);

  return (
    <Box>
      {isLoading && <Loading />}

      {details && (
        <ScrollView>
          <VStack space="3xl" alignItems="center" p="$8">
            <Text bold size="3xl" textAlign="center">
              {details.title || details.name}
            </Text>
            <Image
              alt={details.title || details.name}
              source={{
                uri: `http://image.tmdb.org/t/p/w500/${details.poster_path}`,
              }}
              resizeMode="contain"
              width={200}
              height={300}
            />
            <Text size="md">{details.overview}</Text>
            <HStack>
              <Text size="sm">Popularity: {details.popularity} |</Text>
              <Text size="sm"> Release Date: {details.release_date}</Text>
            </HStack>
          </VStack>
        </ScrollView>
      )}
    </Box>
  );
};

export default DetailsContainer;
