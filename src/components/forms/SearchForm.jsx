import {
  Box,
  Text,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  SearchIcon,
  HStack,
  Select,
  SelectTrigger,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectInput,
  Button,
  ButtonText,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectItem,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  ButtonIcon,
} from "@gluestack-ui/themed";

import { useState } from "react";

const SearchForm = ({ onSubmit, type, setType }) => {
  const [query, setQuery] = useState("");
  const [isQueryInvalid, setIsQueryInvalid] = useState();

  const handleSearch = () => {
    if (query.trim() === "") {
      setIsQueryInvalid(true);
      return;
    }

    setIsQueryInvalid(false);
    onSubmit(query);
  };

  return (
    <Box px="$4">
      <FormControl size="md" isRequired isInvalid={isQueryInvalid}>
        <FormControlLabel>
          <FormControlLabelText bold mt="$4">
            Search Movie/TV Show Name
          </FormControlLabelText>
        </FormControlLabel>

        <Input
          variant="outline"
          width="100%"
          sx={{
            ":focus": { borderColor: "$cyan500" },
          }}
        >
          <InputSlot>
            <InputIcon ml="$2">
              <SearchIcon />
            </InputIcon>
          </InputSlot>
          <InputField
            placeholder="i.e James Bond, CSI"
            value={query}
            onChangeText={(value) => setQuery(value)}
          />
        </Input>

        <FormControlLabel>
          <FormControlLabelText bold mt="$4">
            Choose Search Type
          </FormControlLabelText>
        </FormControlLabel>
        <HStack space="md" pb="$4">
          <Select
            selectedValue={type}
            onValueChange={(value) => setType(value)}
            sx={{ flex: 1 }}
          >
            <SelectTrigger>
              <SelectInput placeholder="asdf" />
              <SelectIcon mr="$2">
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
                  label="movie"
                  value="movie"
                  sx={{
                    backgroundColor:
                      type == "movie" ? "$cyan100" : "transparent",
                  }}
                />
                <SelectItem
                  label="multi"
                  value="multi"
                  sx={{
                    backgroundColor:
                      type == "multi" ? "$cyan100" : "transparent",
                  }}
                />
                <SelectItem
                  label="tv"
                  value="tv"
                  sx={{
                    backgroundColor: type == "tv" ? "$cyan100" : "transparent",
                  }}
                />
              </SelectContent>
            </SelectPortal>
          </Select>

          <Button backgroundColor="$cyan500" onPress={handleSearch}>
            <ButtonIcon>
              <Icon
                as={SearchIcon}
                sx={{
                  color: "white",
                }}
              />
            </ButtonIcon>
            <ButtonText>Search</ButtonText>
          </Button>
        </HStack>

        {!isQueryInvalid && (
          <FormControlHelper>
            <FormControlHelperText size="xs">
              Please select a search type
            </FormControlHelperText>
          </FormControlHelper>
        )}

        <FormControlError>
          <FormControlErrorText>
            Movie/TV show name is required
          </FormControlErrorText>
        </FormControlError>
      </FormControl>
    </Box>
  );
};

export default SearchForm;
