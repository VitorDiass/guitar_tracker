import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { View, ScrollView, Linking } from "react-native";
import { GET_ALL_SONGS, SAVE_NEW_SONG } from "../graphql/song.graphql";
import { GetAllSongsQuery, Song } from "../graphql/types";
import { Card, Overlay, Text, BottomSheet, ListItem, Button, Badge, Input, Slider, CheckBox } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { colors } from "../styles/global";
import { useIsFocused } from "@react-navigation/core";
import { SearchBarBaseProps, SearchBarProps } from "react-native-elements/dist/searchbar/SearchBar";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchBarComponent from "./searchbar";
import FABComponent from "./fab";
import ProgressBarComponent from "./progressbar";
import FilterComponent from "./filter";
import { SongOrderBy } from "../helpers/song.filter";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";

const SongsComponent = () => {
  const [orderBySelected, setOrderBySelected] = useState<any>({});
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [search, setSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, loading, error, refetch } = useQuery<GetAllSongsQuery>(GET_ALL_SONGS);
  const [ mutationFunction, ...res ]= useMutation(SAVE_NEW_SONG,{
    onError : (err) =>{
      console.log(console.log(JSON.stringify(err, null, 2)))
    }
  });

  const [filteredData, setFilteredData] = useState<any>(data?.getAllSongs);

  /* console.log(filteredData); */

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

  useEffect(() => {
    if (orderBySelected["key"]) {
      console.log(orderBySelected["key"]);
      const res = filteredData.slice().sort((a: any, b: any) => {
        if (a[orderBySelected["key"]] < b[orderBySelected["key"]]) return -1;
        if (a[orderBySelected["key"]] > b[orderBySelected["key"]]) return 1;
        return 0;
      });
      setFilteredData(res);
    } else {
      setFilteredData(data?.getAllSongs);
    }
  }, [orderBySelected]);

  /*  const orderBy = () => {
    const unsortedData = filteredData;
    console.log("data", unsortedData)
    if(orderBySelected){
      const res = unsortedData.slice().sort((a:any,b:any) => console.log(a['song_name']))
      setFilteredData(res)
    }
  }

  const clearOrderBy = () => {
    setFilteredData(data?.getAllSongs);
  }
 */
  const onSubmit = (event : any, data : any) => {
    event.preventDefault();
    mutationFunction({variables : { input : {...data}}})
  }

  return (
    <>
      {/*  <FilterComponent selected={filterSelected} onSelectedChange={(item : any) => setFilterSelected(item)} options={SongFieldsFilters}/> */}
      <SearchBarComponent onChangeText={setSearch} value={search} lightTheme={true} round={true} containerStyle={{ borderStartWidth: 0, backgroundColor: "transparent", borderBottomWidth: 0, margin: 5 }} inputContainerStyle={{ backgroundColor: "lightgray" }} placeholder="Search a song here..." />
      <ScrollView>
        <View style={tw.style("flex-1 flex-row mx-4 justify-end")}>
          {/*  <Picker style={tw.style('flex-1')} selectedValue={filterSelected} onValueChange={(item) => setFilterSelected(item)}>
           {SongOrderBy.map(field => {
             return <Picker.Item label={field} value={field}/>
           })}
           </Picker>  */}
          {orderBySelected["key"] && (
            <Badge
              textStyle={tw.style("text-sm")}
              containerStyle={tw.style("mr-1")}
              badgeStyle={tw.style("p-2")}
              value={`x ${orderBySelected["value"]}`}
              status="primary"
              onPress={() => {
                setOrderBySelected({});
              }}
            ></Badge>
          )}
          <Icon
            name="sort-amount-desc"
            size={18}
            color="#4B5563"
            onPress={() => {
              setShowBottomSheet(true);
            }}
          ></Icon>
          <BottomSheet isVisible={showBottomSheet} containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.7)" }}>
            <ListItem containerStyle={tw.style("bg-gray-200")}>
              <ListItem.Content>
                <ListItem.Title style={tw.style("font-bold")}>Order By:</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            {Object.keys(SongOrderBy).map((field, index) => {
              return (
                <ListItem
                  key={index}
                  onPress={() => {
                    setOrderBySelected({ key: field, value: SongOrderBy[field] });
                    setShowBottomSheet(false);
                  }}
                >
                  <ListItem.Content key={index}>
                    <ListItem.Title style={{ color: "black" }}>
                      {SongOrderBy[field]} <Text style={tw.style("text-gray-400")}>{field === orderBySelected["key"] && "(selected)"}</Text>
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              );
            })}
            <Button buttonStyle={{ backgroundColor: colors.dangerColor.color }} raised={true} type="solid" title="Close" onPress={() => setShowBottomSheet(false)}></Button>
          </BottomSheet>
        </View>
        <View>
          {filteredData
            ?.slice()
            .sort((a: any, b: any) => {
              return a.createdAt - b.createdAt;
            })
            .map((song: any, index: number) => {
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
                        <Icon name={song?.fromLesson ? "check" : "times"} size={12} color={song?.fromLesson ? "green" : "red"} />
                      </Text>
                      <View>
                        <Text style={tw.style("text-right")}>
                          <Text style={tw.style("text-xs text-gray-600 font-bold")}>Created: </Text>
                          <Text style={tw.style("text-xs text-gray-500 mr-2")}>
                            {song?.createdAt?.substring(0, 10) || "N/A"} {song?.createdAt?.substring(11, 19)}
                          </Text>
                        </Text>
                        <Text style={tw.style("text-right")}>
                          <Text style={tw.style("text-xs text-gray-600 font-bold")}>Updated: </Text>
                          <Text style={tw.style("text-xs text-gray-500")}>
                            {song?.updatedAt?.substring(0, 10) || "N/A"} {song?.updatedAt?.substring(11, 19)}
                          </Text>
                        </Text>
                      </View>
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
                    {song?.links?.split(";").map((link: any, index: number) => {
                      return (
                        <>
                          <Text key={index} onPress={() => Linking.openURL(`${link}`)}>
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
      <Overlay overlayStyle={tw.style("m-2", { width: "95%", height: "80%" })} animationType="slide" isVisible={showOverlay} onBackdropPress={() => setShowOverlay(false)}>
        <ScrollView style={tw.style("flex flex-col")}>
          <Text style={tw.style("font-bold text-lg m-2")}>NEW</Text>

          <Controller
            control={control}
            defaultValue=""
            name="song_name"
            render={({ field: { onChange, value } }) => <Input errorMessage={errors?.song_name?.message} onChangeText={(text) => onChange(text)} value={value} placeholder="Song" />}
           /*  rules={{
              required: { value: true, message: "Song is required" },
            }} */
          />
          <Controller control={control} defaultValue="" name="artist_name" render={({ field: { onChange, value } }) => <Input onChangeText={(text) => onChange(text)} value={value} placeholder="Artist" />} />
          <Controller
            control={control}
            defaultValue=""
            name="fromLesson"
            render={({ field: { onChange, value } }) => (
              /*   <View style={tw.style("m-2")}> */
              <CheckBox checkedColor={colors.successColor.color} title="Lesson" checked={value} onPress={() => onChange(!value)} />
              /*    </View> */
            )}
          />
          <Controller
            control={control}
            defaultValue=""
            name="prog_melody"
            render={({ field: { onChange, value } }) => (
              <View style={tw.style("m-3")}>
                <Text style={tw.style("text-gray-500")}>Melody Progress : {value}</Text>
                <Slider thumbStyle={tw.style("h-4 w-4 bg-gray-900")} step={5} minimumValue={0} maximumValue={100} value={value} onValueChange={(value) => onChange(value)} />
              </View>
            )}
          />
          <Controller
            control={control}
            defaultValue=""
            name="prog_rhythm"
            render={({ field: { onChange, value } }) => (
              <View style={tw.style("m-3")}>
                <Text style={tw.style("text-gray-500")}>Rhythm Progress : {value}</Text>
                <Slider thumbStyle={tw.style("h-4 w-4 bg-gray-900")} step={5} minimumValue={0} maximumValue={100} value={value} onValueChange={(value) => onChange(value)} />
              </View>
            )}
          />
          <Button onPress={handleSubmit((data, event) => onSubmit(event, data))} title="Save"/>
        </ScrollView>
      </Overlay>
    </>
  );
};

export default SongsComponent;
