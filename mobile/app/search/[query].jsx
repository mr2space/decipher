import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

import useAxiosPrivate from '../../hook/useAxiosPrivate'

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentData, selectCurrentSpecies, detailsSpeciesText } from '../../scripts/speciesSlice';

const Search = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const {query} = useLocalSearchParams()
  const species = useSelector(selectCurrentSpecies);
  const data = useSelector(selectCurrentData);
  if (query != species){
      dispatch(detailsSpeciesText({axiosPrivate,species:species }))
  }
  return (
    <SafeAreaView>
    <ScrollView>
    <View className="px-4 space-y-4 mt-8">
      <Text className="text-2xl font-pmedium">Species</Text>
      <Text className="text-[40px] font-bold">{query}</Text>
       <Text className="text-[30px] font-semibold">Description</Text>
       <Text className="text-lg font-semibold">{data?.description}</Text>

       <Text className="text-[30px] font-semibold">Properties</Text>
       <Text className="text-lg  font-semibold">{data?.properties}</Text>


       <Text className="text-[30px] font-semibold">helpful in</Text>
       <Text className="text-lg   font-semibold">{data?.helpful_in}</Text>


       <Text className="text-[30px] font-semibold">Benefits</Text>
       <Text className="text-lg  font-semibold">{data?.benefits}</Text>

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Search