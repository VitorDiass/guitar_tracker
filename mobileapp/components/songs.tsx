import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { View, ScrollView, Linking } from "react-native";
import { GET_ALL_SONGS } from "../graphql/song.graphql";
import { GetAllSongsQuery, Song } from "../graphql/types";
import { Card, LinearProgress, SearchBar, FAB, Overlay, Text, Divider } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { colors } from "../styles/global";
import { useIsFocused } from "@react-navigation/core";
import { SearchBarBaseProps, SearchBarProps } from "react-native-elements/dist/searchbar/SearchBar";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchBarComponent from "./searchbar";
import FABComponent from "./fab";
import ProgressBarComponent from "./progressbar";
import FilterComponent from "./filter";
import { SongFieldsFilters } from "../helpers/song.filter";
import { Picker } from "@react-native-picker/picker";

const SongsComponent = () => {
  const [filterSelected, setFilterSelected] = useState('');
  const [search, setSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const { data, loading, error, refetch } = useQuery<GetAllSongsQuery>(GET_ALL_SONGS);

  const [filteredData, setFilteredData] = useState(data?.getAllSongs);

  console.log(filteredData);

  if (error && !data) {
    console.log(error);
  }

  /*     useEffect(() => {
        for(const elem of (filteredData || [])){
           console.log(Object.isFrozen(elem))
        }
    },[]) */

  useEffect(() => {
    const filtered = data?.getAllSongs.filter((elem) => elem.artist_name.includes(search) || elem.song_name.includes(search));
    setFilteredData(filtered);
  }, [search]);

  useEffect(() => {
    setFilteredData(data?.getAllSongs);
  }, [data]);

  const showOverlayFn = () => {
    setShowOverlay(true);
  };

  return (
    <>
         {/*  <FilterComponent selected={filterSelected} onSelectedChange={(item : any) => setFilterSelected(item)} options={SongFieldsFilters}/> */}
      <SearchBarComponent onChangeText={setSearch} value={search} lightTheme={true} round={true} containerStyle={{ borderStartWidth: 0, backgroundColor: "transparent", borderBottomWidth: 0, margin: 5 }} inputContainerStyle={{ backgroundColor: "lightgray" }} placeholder="Search a song here..." />
      <ScrollView>
        <View style={tw.style("flex-1 flex-row mx-4 justify-end")}>
         <Picker style={tw.style('flex-1')} selectedValue={filterSelected} onValueChange={(item) => setFilterSelected(item)}>
           {SongFieldsFilters.map(field => {
             return <Picker.Item label={field} value={field}/>
           })}
           </Picker> 
          <Icon name="sort-amount-desc" size={15}></Icon>
        </View>
        <View>
          {filteredData
            ?.slice()
            .sort((a, b) => {
              return a.createdAt - b.createdAt;
            })
            .map((song, index) => {
              return (
                <Card containerStyle={tw.style("rounded-lg shadow-lg border-0 my-3")} key={index}>
                  <View style={tw.style("p-1")}>
                    <Text style={tw.style("text-xl font-bold")}>{song.song_name}</Text>
                    <Text style={tw.style("text-lg")}>{song.artist_name}</Text>
                  </View>

                  <Card.Divider />

                  <View style={tw.style("mb-5")}>
                    <View style={tw.style("flex-row justify-between")}>
                      <Text>
                        <Text style={tw.style("text-xs text-gray-600 font-bold")}>Lesson: </Text>
                        <Icon name={song?.fromLesson ? "check" : "times"} size={12} color={song?.fromLesson ? 'green' : 'red'}/>
                      </Text>
                      <Text>
                        <Text style={tw.style("text-xs text-gray-600 font-bold")}>Created: </Text>
                        <Text style={tw.style("text-xs text-gray-500 mr-2")}>{song?.createdAt?.substring(0, 10)}</Text>
                      </Text>
                      <Text>
                        <Text style={tw.style("text-xs text-gray-600 font-bold")}>Updated: </Text>
                        <Text style={tw.style("text-xs text-gray-500")}>{song?.updatedAt?.substring(0, 10)}</Text>
                      </Text>
                    </View>
                    {/*  <View style={tw.style("flex-row justify-end")}>
                    </View> */}
                  </View>

                  <View style={tw.style("mb-2")}>
                    <Text>Melody Progress</Text>
                    <ProgressBarComponent dynamicBarColor={true} value={(song?.prog_melody || 0) / 100} style={tw.style("h-4 rounded")} />
                  </View>
                  <View style={tw.style("mb-4")}>
                    <Text>Rhythm Progress</Text>
                    <ProgressBarComponent dynamicBarColor={true} value={(song?.prog_rhythm || 0) / 100} style={tw.style("h-4 rounded")} />
                  </View>
                  <>
                    {song?.links && <Text>Links</Text>}
                    {song?.links?.split(";").map((link) => {
                      return (
                        <>
                          <Text onPress={() => Linking.openURL(`${link}`)}>
                            <Icon name="external-link" size={12} />
                            <Text style={tw.style("text-blue-700")}> {link}</Text>
                          </Text>
                        </>
                      );
                    })}
                  </>
                </Card>
              );
            })}
        </View>
      </ScrollView>
      <FABComponent onPress={() => setShowOverlay(true)} title="" size="large" icon={<Icon name="plus" size={20} color="white" />} />
      <Overlay animationType="slide" isVisible={showOverlay} onBackdropPress={() => setShowOverlay(false)}>
        <View>
          <Text>TESTE</Text>
        </View>
      </Overlay>
    </>
  );
};

export default SongsComponent;
