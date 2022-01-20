import React, { useEffect, useState } from "react";
import { View, ScrollView, Linking, TouchableOpacity, TextInput, RefreshControl} from "react-native";
import { Card, Overlay, Text, BottomSheet, ListItem, Button, Badge, Input, Slider, CheckBox } from "react-native-elements";

//GRAPHQL
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SONGS, SAVE_NEW_SONG, SAVE_EDIT_SONG, DELETE_SONG } from "../graphql/song.graphql";
import { GetAllSongsQuery } from "../graphql/types";
import { SongOrderBy, SongEditFormValue, Song } from "../helpers/song";

//STYLES
import tw from "tailwind-react-native-classnames";
import { colors } from "../styles/global";
import Icon from "react-native-vector-icons/FontAwesome";

//COMPONENTS
import { Formik } from 'formik';
import FABComponent from "./fab";
import SearchBarComponent from "./searchbar";
import ProgressBarComponent from "./progressbar";
import OptionsBarComponent from "./optionsBar";
import StyledInput from "./input";
import Toast from 'react-native-toast-message';
import AlertDialog from "./alertdialog";

const SongsComponent = () => {
  //ScrollView refresh
  const [isRefreshing, setIsRefreshing] = useState(false);

  //Song being edited
  const [editSong, setEditSong] = useState<Song>();
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  //orderby ASC
  const [orderBySelected, setOrderBySelected] = useState<any>({ key : "createdAt", value : "Created Date"});
  
  //BottomSheet for orderby
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  //Search bar query
  const [search, setSearch] = useState("");
  
  //Compact/full view
  const [cardView, setCardView] = useState<boolean>(true);
  
  
  //GRAPHQL queries/mutations
  const { data, loading, error, refetch } = useQuery<GetAllSongsQuery>(GET_ALL_SONGS);

  const [viewData, setViewData] = useState<Array<any> | undefined>(data?.getAllSongs);

  //data filtered by search bar
  const [filteredData, setFilteredData] = useState<any>([]);


  const [editSongMutation, ...editSongMutationParams] = useMutation(SAVE_EDIT_SONG, {
    onCompleted: (data) => {
      setShowOverlay(false);
      refreshData();
      Toast.show({
        type: "success",
        text1: "Edit Song",
        text2: "Edited song  successfully",
        position: "bottom",
        visibilityTime: 3000,
        bottomOffset: 100,
      });
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });

  const [saveSongMutation, ...params] = useMutation(SAVE_NEW_SONG, {
    onCompleted: (data) => {
      setShowOverlay(false);
      refreshData();
      Toast.show({
        type: "success",
        text1: "New Song",
        text2: "New song created successfully",
        position: "bottom",
        visibilityTime: 3000,
        bottomOffset: 100,
      });
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
  });

  const [deleteSongMutation, ...deleteSongMutationParams] = useMutation(DELETE_SONG,{
    onCompleted : (data) => {
      setShowOverlay(false);
      refreshData();
      Toast.show({
        type : 'success',
        text1 : 'Delete song',
        text2 : 'Deleted song  successfully',
        position : 'bottom',
        visibilityTime : 3000,
        bottomOffset : 100
      })
     },
     onError : (error) => {
       console.log(JSON.stringify(error, null, 2));
     }
  })

  useEffect(() => {
    setViewData(data?.getAllSongs);
    //setFilteredData(data?.getAllSongs);
  }, [data]);

 /*  useEffect(() => {
    if(!search || search == ''){
      setViewData(data?.getAllSongs);
    }
  }, [search]); */



  useEffect(() => {
    //if orderby is defined, order by the on that is defined
    //if there is no orderby, order by created at
    orderBySelected['key'] ? setViewData(orderBy(viewData,orderBySelected['key'])) : setViewData(orderBy(viewData,"createdAt"))

  }, [orderBySelected]);

  const refreshData = () => {
    refetch();
    setSearch('');
    setOrderBySelected({});
    setViewData(data?.getAllSongs);
  };

  const orderBy = (dataToSort: Array<any> | undefined, orderByKey: string) => {
    console.log(orderByKey)
    let sortedData : any = [];
    if (dataToSort) {
      //if(orderBySelected['key']){
        console.log(dataToSort, orderByKey)
        sortedData = dataToSort?.slice().sort((a: any, b: any) => {
          if (a[orderByKey] < b[orderByKey]) return -1;
          if (a[orderByKey] > b[orderByKey]) return 1;
          return 0;
        });
        return sortedData;
      /* }else{
        return dataToSort;
      } */
    }
    return sortedData;
  };

  const filterDataByNames = (dataToFilter : Array<any> | undefined) => {
    return dataToFilter?.filter((elem : Song) => elem.artist_name.includes(search) || elem.song_name.includes(search));
  }

  const submitFilterTextInput = () => {
    if(search){
      //apply filter to the data
      setViewData(filterDataByNames(data?.getAllSongs))

    }else{
      //filter is empty
      //reset the data to its original content
      setViewData(data?.getAllSongs);
    }
  }
 

  const updateOrderBy = (orderByObj : any) => {
    setOrderBySelected(orderByObj);
  }

  const onSubmit = (data: any) => {
    data.song_id ? editSongMutation({ variables: { editSongInput: { ...data } } }) : saveSongMutation({ variables: { createSongInput: { ...data } } });
  };

  const onDelete = () => {
   if(editSong?.song_id){
    deleteSongMutation({variables : {deleteSongInput : {song_id : editSong.song_id}}})
   }
  }

  return (
    <>
      {/*  <FilterComponent selected={filterSelected} onSelectedChange={(item : any) => setFilterSelected(item)} options={SongFieldsFilters}/> */}
      <SearchBarComponent
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        round={true}
        containerStyle={{ borderStartWidth: 0, backgroundColor: "transparent", borderBottomWidth: 0, margin: 5 }}
        inputContainerStyle={[tw.style("rounded-full"),{ backgroundColor: "lightgray" }]}
        placeholder="Search a song here..."
        onSubmitEditing={submitFilterTextInput}
        onClear={() => {setSearch(''); setViewData(data?.getAllSongs || [])}}
      />
      <OptionsBarComponent cardView={cardView} setCardView={setCardView} setOrderBySelected={updateOrderBy} setShowBottomSheet={setShowBottomSheet} orderBySelected={orderBySelected}/>
      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshData} />}>
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
                  setOrderBySelected({key : field, value : SongOrderBy[field]})
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
          {viewData?.map((song: any, index: number) => {
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
                           /*  onPress={() => {
                              setShowBottomSheet(true);
                            }} */
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

                      <View style={tw.style("mb-3")}>
                        <Text style={tw.style("text-xs mb-1")}>Melody Progress - {song?.prog_melody} %</Text>
                        <ProgressBarComponent dynamicBarColor={true} value={(song?.prog_melody || 0) / 100} style={tw.style("h-3 rounded-full")} />
                      </View>
                      <View>
                        <Text style={tw.style("text-xs mb-1")}>Rhythm Progress - {song?.prog_rhythm} %</Text>
                        <ProgressBarComponent dynamicBarColor={true} value={(song?.prog_rhythm || 0) / 100} style={tw.style("h-3 rounded-full")} />
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
                          <View style={tw.style("flex-row flex-wrap flex-shrink items-center")}>
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
                {editSong?.song_id ?
                  <View style={tw.style("mx-2 mb-2")}>
                    <Button buttonStyle={[{ backgroundColor: colors.dangerColor.color }, tw.style("rounded-full")]} type="solid" title="Delete" onPress={() => {AlertDialog("Are you sure?","Are you sure you want to delete this?","Yes","No",onDelete)}}></Button>
                  </View>
                  :
                  <></>
                }
              </>
            )}}
        </Formik> 
        </ScrollView>



      </Overlay>
    </>
  )
}

export default SongsComponent;
