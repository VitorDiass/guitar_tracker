import React from 'react'
import { View, Text } from 'react-native'
import { SearchBar, SearchBarProps } from 'react-native-elements'

const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarProps>;

const SearchBarComponent = ({onChangeText, ...props} : SearchBarProps) => {
    return (
        <SafeSearchBar
        {...props}
        platform="default" 
        onChangeText={(e) => onChangeText(e)}
        />
    )
}

export default SearchBarComponent
