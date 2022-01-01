import React from 'react'
import { View, Text } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { SongOrderBy } from '../helpers/song';

const FilterComponent = ({selected, onSelectedChange, options} : any) => {
    return (
      <Picker style={{flex : 1}} selectedValue={selected} onValueChange={(item, index) => onSelectedChange(item)}>
          {options.map((option : any, index: number) => {
              return <Picker.Item key={index} label={option} value={option}/>
          })}
      </Picker>
    )
}

export default FilterComponent
