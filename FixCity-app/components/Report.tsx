import { View, Text } from 'react-native';
import type { ReactNode } from 'react';


interface ReportProps {
  title: string;
  location: string;
  description: string;
  icon : ReactNode;
}

export default function Report({ title, location, description, icon }: ReportProps) {
  return (
    <View className="bg-gray-200 p-1 rounded-3xl mb-3 items-center flex-row gap-2">
      <View className="items-center">
        {icon}
      </View>
      <View>
        <Text className="font-bold">{title}</Text>
        <Text className="text-blue-500">{location}</Text>
        <Text className="italic text-sm">{description}</Text>
      </View>
    </View>
  );
}