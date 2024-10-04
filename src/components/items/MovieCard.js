import React, { PureComponent } from "react";
import {
  VStack,
  HStack,
  Image,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";

class MovieCard extends PureComponent {
  render() {
    const { navigation, item, type } = this.props;

    return (
      <HStack space="sm" px="$4">
        <Image
          alt={item.title ? item.title : item.name}
          borderRadius="$none"
          height="$full"
          source={{
            uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
        />

        <VStack flex={1}>
          <Text bold size="md" isTruncated={false}>
            {item.title ? item.title : item.name}
          </Text>
          <Text size="sm">Popularity: {item.popularity}</Text>
          <Text size="sm">Release Date: {item.release_date}</Text>
          <Button
            width="$full"
            variant="outlined"
            backgroundColor="$cyan500"
            sx={{ mt: "$1" }}
            onPress={() =>
              navigation.navigate("Details", {
                title: `${item.title ? item.title : item.name}`,
                detailsRoute: `/${type}/${item.id}`,
              })
            }
          >
            <ButtonText>More Details</ButtonText>
          </Button>
        </VStack>
      </HStack>
    );
  }
}

export default MovieCard;
