import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { View, ScrollView, Linking, TouchableOpacity, Pressable, TouchableHighlight, TextInput, RefreshControl } from "react-native";
import { GET_ALL_SONGS, SAVE_NEW_SONG } from "../graphql/song.graphql";
import { GetAllSongsQuery, Song, SongInput } from "../graphql/types";
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
import { SongOrderBy } from "../helpers/song";
import { Picker } from "@react-native-picker/picker";
import { Controller, useForm } from "react-hook-form";

