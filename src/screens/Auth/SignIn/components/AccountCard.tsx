import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type AccountCardProps = {
  isActive: boolean;
  onPress: () => void;
} & React.PropsWithChildren;

export function AccountCard({ children, isActive, onPress }: AccountCardProps) {
  return (
    <TouchableOpacity
      tw="border-green-primary rounded-md"
      style={isActive ? styles.active : styles.shadow}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    backgroundColor: '#FFFF',
    elevation: 2, // Android
    borderWidth: 1,
    padding: 3,
  },
  active: {
    borderWidth: 4,
    padding: 0,
  },
});
