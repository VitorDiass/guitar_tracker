import React from 'react'
import { View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { SongFieldsFilters } from '../helpers/song.filter';

const FilterComponent = ({selected, onSelectedChange, options} : any) => {
    return (
      <Picker style={{flex : 1}} selectedValue={selected} onValueChange={(item, index) => onSelectedChange(item)}>
          {options.map((option : any) => {
              return <Picker.Item label={option} value={option}/>
          })}
      </Picker>
    )
}

export default FilterComponent
