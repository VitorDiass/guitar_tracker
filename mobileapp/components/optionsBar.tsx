import React from 'react'
import { View, Text } from 'react-native'
import { Badge } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

const OptionsBarComponent = ({cardView, setCardView, setOrderBySelected, setShowBottomSheet, orderBySelected} : any) => {
    return (
      <View style={tw.style("flex-row items-center mx-4 px-1")}>
        {/*  <Picker style={tw.style('flex-1')} selectedValue={filterSelected} onValueChange={(item) => setFilterSelected(item)}>
         {SongOrderBy.map(field => {
           return <Picker.Item label={field} value={field}/>
         })}
         </Picker>  */}
        {cardView ? (
          <IconFontAwesome
            name="th-list"
            size={20}
            color="#4B5563"
            style={tw.style("text-left")}
            onPress={() => {
              setCardView((prev: any) => !prev);
            }}
          />
        ) : (
          <IconMaterial
            name="view-agenda"
            size={20}
            color="#4B5563"
            style={tw.style("text-left")}
            onPress={() => {
              setCardView((prev: any) => !prev);
            }}
          />
        )}

        <View style={tw.style("flex-1 flex-row items-center justify-end")}>
          {orderBySelected["key"] && (
            <Badge
              textStyle={tw.style("text-xs")}
              containerStyle={tw.style("mr-1")}
              badgeStyle={tw.style("rounded-full p-3")}
              value={`x  ${orderBySelected["value"]}`}
              status="primary"
              onPress={() => {
                setOrderBySelected({});
              }}
            ></Badge>
          )}
          <IconFontAwesome
            name="sort-amount-desc"
            size={20}
            color="#4B5563"
            onPress={() => {
              setShowBottomSheet(true);
            }}
          />
        </View>
      </View>
    );
}

export default OptionsBarComponent
