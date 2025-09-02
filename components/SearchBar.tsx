import { Image, TextInput, Pressable } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  return (
    <Pressable className="flex-row items-center bg-searchBar rounded-full px-5 py-4" onPress={onPress}>
      <Image
        source={icons.search}
        className="size-4"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        value={value}
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
        returnKeyType="search"
      />
    </Pressable>
  );
};

export default SearchBar;
