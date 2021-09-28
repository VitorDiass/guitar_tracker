import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { View, Text, ScrollView } from 'react-native'
import { GET_ALL_SONGS } from '../graphql/song.graphql'
import { GetAllSongsQuery } from '../graphql/types'
import { Card, LinearProgress } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { colors } from '../styles/global'
import { useIsFocused } from '@react-navigation/core';

const SongsComponent = () => {
    const isFocused = useIsFocused();
    const {data, loading, error, refetch} = useQuery<GetAllSongsQuery>(GET_ALL_SONGS);

    if(error && !data) {
        console.log(error)
    }
    
    useEffect(() => {
        console.log(isFocused)
       refetch();
    }, [isFocused])

    return (
        <ScrollView>
        <View>
            {data?.getAllSongs.map((song, index) => {
                return <Card containerStyle={tw.style('rounded')} key={index}>
                    <Card.Title>
                        <Text>{song.artist_name}</Text>
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
    )
}

export default SongsComponent
