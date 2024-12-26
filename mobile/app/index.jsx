import {Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { Link } from 'expo-router';


const index = () => {
    return (
        <View>
            <TouchableOpacity className="w-20 px-4 py-2 bg-blue-500 text-white rounded" >
                <Link href="/camera">
                    <Text className="text-white">camera</Text>
                </Link>
            </TouchableOpacity>

        </View>
    )
}

export default index