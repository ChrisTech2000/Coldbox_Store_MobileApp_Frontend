import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IOverlayComponentProps } from "react-native-interactive-walkthrough";


export function DrawerOverlay(props: IOverlayComponentProps) {
  const { next, step: { mask } } = props;

  return (
    <View style={styles.overlayContainer}>
      <TouchableOpacity
        tw="absolute top-8 left-3 w-[10%] h-[5%]"
        onPress={() => {
          props.allSteps[1].onPressMask?.()
          next();
        }}
      />
      <View
        style={[
          styles.tooltipContainer,
          {
            top: mask.y + mask.height - 10,
            left: mask.x + 10,
          },
        ]}
      >
        <Text style={styles.title}>Tutorial Starting!</Text>
        <Text style={styles.description}>Click on the drawer icon to open the menu.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",  // Semi-transparent background for the overlay
  },
  tooltipContainer: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
