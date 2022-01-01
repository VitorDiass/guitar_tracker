import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { View, ScrollView, Linking, TouchableOpacity, Pressable, TouchableHighlight, TextInput, RefreshControl } from "react-native";
import { GET_ALL_SONGS, SAVE_NEW_SONG } from "../graphql/song.graphql";
import { GetAllSongsQuery, SongInput } from "../graphql/types";
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
import { SongOrderBy, SongEditFormValue, Song } from "../helpers/song";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";
import OptionsBarComponent from "./optionsBar";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import StyledInput from "./input";
import Toast from 'react-native-toast-message';

const SongsComponent = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editSong, setEditSong] = useState<Song>();
  const [orderBySelected, setOrderBySelected] = useState<any>({ key: "createdAt", value: "Date Created" });
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [search, setSearch] = useState("");
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [value, changeValue] = useState('ola');
  const [cardView, setCardView] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { data, loading, error, refetch } = useQuery<GetAllSongsQuery>(GET_ALL_SONGS);

  if(error){
    console.log(error)
  }
  

  const [mutationFunction, ...params] = useMutation(SAVE_NEW_SONG, {
   onCompleted : (data) => {
    setShowOverlay(false);
    Toast.show({
      type : 'success',
      text1 : 'New Song',
      text2 : 'New song created successfully',
      position : 'bottom',
      visibilityTime : 3000,
      bottomOffset : 100
    })
   },
   onError : (error) => {
     console.log(error)
   }
    
  });

  const [filteredData, setFilteredData] = useState<any>(data?.getAllSongs);




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
      const res = filteredData?.slice().sort((a: any, b: any) => {
        if (a[orderBySelected["key"]] < b[orderBySelected["key"]]) return -1;
        if (a[orderBySelected["key"]] > b[orderBySelected["key"]]) return 1;
        return 0;
      });
      setFilteredData(res);
    } else {
      setFilteredData(data?.getAllSongs);
    }
  }, [orderBySelected]);

  const refreshData = () => {
    refetch();

    if (orderBySelected["key"]) {
      const res = filteredData?.slice().sort((a: any, b: any) => {
        if (a[orderBySelected["key"]] < b[orderBySelected["key"]]) return -1;
        if (a[orderBySelected["key"]] > b[orderBySelected["key"]]) return 1;
        return 0;
      });
      setFilteredData(res);
    } else {
      setFilteredData(data?.getAllSongs);
    }
  };


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
  const onSubmit = (data: any) => {
    mutationFunction({ variables: { createSongInput: { ...data } } })
  };

  return (
    <>
      {/*  <FilterComponent selected={filterSelected} onSelectedChange={(item : any) => setFilterSelected(item)} options={SongFieldsFilters}/> */}
      <SearchBarComponent
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        round={true}
        containerStyle={{ borderStartWidth: 0, backgroundColor: "transparent", borderBottomWidth: 0, margin: 5 }}
        inputContainerStyle={{ backgroundColor: "lightgray" }}
        placeholder="Search a song here..."
      />
      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />}>
        <OptionsBarComponent cardView={cardView} setCardView={setCardView} setOrderBySelected={setOrderBySelected} setShowBottomSheet={setShowBottomSheet} orderBySelected={orderBySelected} />

        <BottomSheet isVisible={showBottomSheet} containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.7)" }}>
          <ListItem containerStyle={tw.style("bg-gray-200")}>
            <ListItem.Content>
              <ListItem.Title style={tw.style("font-bold")}>Order By</ListItem.Title>
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
            )
          })}
          <Button buttonStyle={{ backgroundColor: colors.dangerColor.color }} raised={true} type="solid" title="Close" onPress={() => setShowBottomSheet(false)}></Button>
        </BottomSheet>
        <View style={tw.style("mt-5")}>
          {filteredData?.map((song: any, index: number) => {
            return (
              <>
                {cardView ? (
                  <Card containerStyle={tw.style("rounded-lg shadow-lg border-0 mb-3 pointer-events-none")}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={index}
                      onPress={() => {
                        setEditSong(song);
                        setShowOverlay(true);
                      }}
                    >
                      <View style={tw.style("pb-2 flex-row")}>
                        <View style={tw.style("")}>
                          <Text style={tw.style("text-xl font-bold")}>{song.song_name}</Text>
                          <Text style={tw.style("text-lg")}>{song.artist_name}</Text>
                        </View>
                        <View style={tw.style("flex-1 flex-row justify-end items-center")}>
                          <Icon
                            name="chevron-right"
                            size={20}
                            color="#4B5563"
                            onPress={() => {
                              setShowBottomSheet(true);
                            }}
                          />
                        </View>
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
                        {song?.links ? <Text>Links</Text> : <Text></Text>}
                        {song?.links?.split(";").map((link: any, index: number) => {
                          return (
                            <>
                              <Text key={index} onPress={() => Linking.openURL(`${link}`)}>
                                <Icon name="external-link" size={12} />
                                <Text style={tw.style("text-blue-700")}> {link}</Text>
                              </Text>
                            </>
                          )
                        })}
                      </>
                    </TouchableOpacity>
                  </Card>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={tw.style("mx-4")}
                    key={index}
                    onPress={() => {
                      setEditSong(song);
                      setShowOverlay(true);
                    }}
                  >
                    <ListItem containerStyle={tw.style("flex-row rounded-md shadow-sm my-2")} key={index}>
                      <ListItem.Content>
                        <View style={tw.style("flex-row min-w-full items-center justify-between")}>
                          <View style={tw.style("flex-row items-center")}>
                          <ListItem.Title style={tw.style("text-lg font-bold text-gray-700 mr-2")}>{song.song_name}</ListItem.Title>
                          <ListItem.Subtitle style={tw.style("text-sm font-bold text-gray-600")}>{song.artist_name}</ListItem.Subtitle>
                          </View>
                          <View style={tw.style("flex-row items-center")}>
                            <Text style={tw.style("text-xs text-gray-500")}>Lesson </Text><Icon name={song?.fromLesson ? "check" : "times"} size={11} color={song?.fromLesson ? colors.successColor.color : colors.dangerColor.color} />
                          </View>
                        </View>
                        <View style={tw.style("flex-col min-w-full mt-2")}>
                          <View style={tw.style("flex-row items-center justify-between")}>
                            <View style={tw.style("flex-row items-center")}>
                              <Text style={tw.style("text-xs text-gray-500 mr-1")}>Melody</Text>

                              <ProgressBarComponent dynamicBarColor={true} value={(song?.prog_melody || 0) / 100} style={tw.style("w-20 h-2 rounded-sm")} />
                            </View>
                            <View>
                              <Text style={tw.style("text-xs text-gray-500")}>Created {song?.createdAt?.substring(0, 10) || "N/A"}</Text>
                            </View>
                          </View>
                          <View style={tw.style("flex-row items-center justify-between")}>
                            <View style={tw.style("flex-row items-center")}>
                              <Text style={tw.style("text-xs text-gray-500 mr-1")}>Rhythm</Text>
                              <ProgressBarComponent dynamicBarColor={true} value={(song?.prog_rhythm || 0) / 100} style={tw.style("w-20 h-2 rounded-sm")} />
                            </View>
                            <View>
                              <Text style={tw.style("text-xs text-gray-500")}>Updated {song?.updatedAt?.substring(0, 10) || "N/A"}</Text>
                            </View>
                          </View>
                        </View>
                        {/*  <ListItem.Subtitle style={tw.style('text-sm font-bold text-gray-500')}>{song.prog_melody}</ListItem.Subtitle>
                        
                          <ListItem.Subtitle style={tw.style('text-sm font-bold text-gray-500')}>{song.prog_rhythm}</ListItem.Subtitle> */}
                      </ListItem.Content>
                      <View>
                        <ListItem.Chevron size={20} />
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                )}
              </>
            )
          })}
        </View>
      </ScrollView>
      <FABComponent
        onPress={() => {
          setShowOverlay(true);
        }}
        title=""
        size="large"
        icon={<Icon name="plus" size={20} color="white" />}
      />
      <Overlay
        overlayStyle={tw.style("flex-row mx-4 p-5")}
        animationType="slide"
        isVisible={showOverlay}
        onBackdropPress={() => {
         
          setShowOverlay(false);
        }}
      >
        <ScrollView>
          <View style={tw.style("flex-row items-center justify-between")}>
          <Text style={tw.style("font-bold text-lg m-2 text-gray-600")}>{editSong?.song_id ? "Edit" : "New"}</Text>
          <Icon
            name="times"
            size={22}
            color="#4B5563"
            style={tw.style("mx-2")}
            onPress={() => {
              setEditSong(undefined);
              setShowOverlay(false);
            }}
          />
        </View>

        <Formik initialValues={editSong?.song_id ? editSong : SongEditFormValue} onSubmit={onSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue}) => {

            return (
              <>
                <View style={tw.style("mx-2 mt-3")}>
                  <StyledInput onChangeText={handleChange("song_name")} value={values.song_name} placeholder="Song Name" />
                  <StyledInput onChangeText={handleChange("artist_name")} value={values.artist_name} placeholder="Artist Name" />
                  <CheckBox containerStyle={tw.style("m-0 my-2 p-0 py-2 bg-white border-0")} checkedColor={colors.successColor.color} title="Lesson" checked={values.fromLesson} onPress={() => setFieldValue("fromLesson", !values.fromLesson)} />
                  <View style={tw.style("my-2")}> 
                  <Text>Melody Progress - {values.prog_melody || 0}</Text>
                  <Slider
                    thumbStyle={tw.style("h-4 w-4 bg-gray-800")}
                    step={5}
                    minimumValue={0}
                    maximumValue={100}
                    value={values.prog_melody || 0}
                    onValueChange={(value) => {
                      setFieldValue('prog_melody', value)
                    }}
                    />
                  </View>
                  <View style={tw.style("my-2")}> 
                  <Text>Rhythm Progress - {values.prog_rhythm || 0}</Text>
                  <Slider
                    thumbStyle={tw.style("h-4 w-4 bg-gray-800")}
                    step={5}
                    minimumValue={0}
                    maximumValue={100}
                    value={values.prog_rhythm || 0}
                    onValueChange={(value) => {
                     setFieldValue('prog_rhythm', value)
                    }}
                    />
                  </View>
                  <TextInput multiline={true} numberOfLines={5} style={tw.style("px-2 border border-gray-400",{ textAlignVertical: "center" })} defaultValue={values.links as string} onChangeText={(text) => setFieldValue('links', text)} value={values.links} placeholder="Links" />
                </View>
                <View style={tw.style("mx-2 mt-8 mb-2")}>
                  <Button buttonStyle={[{ backgroundColor: colors.successColor.color }, tw.style("rounded-full")]} type="solid" title="Save" onPress={() => handleSubmit()}></Button>
                </View>
              </>
            )}}
        </Formik> 
        </ScrollView>



      </Overlay>
    </>
  )
}

export default SongsComponent;
