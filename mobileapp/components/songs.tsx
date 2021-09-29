import React, {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { View, Text, ScrollView } from 'react-native'
import { GET_ALL_SONGS } from '../graphql/song.graphql'
import { GetAllSongsQuery } from '../graphql/types'
import { Card, LinearProgress, SearchBar, FAB, Overlay} from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { colors } from '../styles/global'
import { useIsFocused } from '@react-navigation/core';
import { SearchBarBaseProps, SearchBarProps } from 'react-native-elements/dist/searchbar/SearchBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBarComponent from './searchbar'
import FABComponent from './fab'



const SongsComponent = () => {
    const [search, setSearch] = useState('');
    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const {data, loading, error, refetch} = useQuery<GetAllSongsQuery>(GET_ALL_SONGS);

    const [filteredData, setFilteredData] = useState(data?.getAllSongs);

    if(error && !data) {
        console.log(error)
    }

    useEffect(() => {
        const filtered = data?.getAllSongs.filter(elem => elem.artist_name.includes(search) || elem.song_name.includes(search));
        setFilteredData(filtered);
    }, [search])

    useEffect(() => {
        setFilteredData(data?.getAllSongs);
    }, [data])

    const showOverlayFn = () => {
        setShowOverlay(true);
    }

    return (
        <>
        <SearchBarComponent 
            onChangeText={setSearch}
            value={search} 
            lightTheme={true} 
            round={true} 
            containerStyle={{borderStartWidth : 0, backgroundColor : "transparent", borderBottomWidth : 0, margin : 5}} 
            inputContainerStyle={{backgroundColor : "lightgray"}} 
            placeholder="Search a song here..."
        />
        <ScrollView>
        <View>
            {filteredData?.map((song, index) => {
                return <Card containerStyle={tw.style('rounded')} key={index}>
                    <Card.Title>
                    <View  style={tw.style('text-left')}>
                            <Text >{song.artist_name}</Text>
                        </View>
                        <View  style={tw.style('text-right')}>
                            <Text>{song.song_name}</Text>
                        </View>
                    
                    </Card.Title>
                    <Card.Divider/>
                    <Text>Created</Text>
                    <Text>{song.createdAt}</Text>
                    <Text>{song.links}</Text>
                    <Text>Melody Progress</Text>
                    <LinearProgress variant='determinate' color={colors.dangerColor.color} trackColor={colors.dangerColorBg.color} style={tw.style('h-4 rounded')} value={(song.prog_melody || 0)/100}/>
                    <Text>Rhythm Progress</Text>
                    <LinearProgress variant='determinate' color={colors.dangerColor.color} trackColor={colors.dangerColorBg.color} style={tw.style('h-4 rounded')} value={(song.prog_rhythm || 0)/100}/>
                    </Card>
            })}
        </View>
        </ScrollView>
        <FABComponent onPress={() => setShowOverlay(true)} title="" size="large" icon={<Icon name="plus" size={20} color="white"/>} />
        <Overlay animationType="slide" isVisible={showOverlay} onBackdropPress={() => setShowOverlay(false)}>
            <View>
                <Text>TESTE</Text>
            </View>
        </Overlay>
        </>
    )
}

export default SongsComponent
