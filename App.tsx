import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [clickCount, setClickCount] = useState<number>(0);

  const generateColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  function SomeComponent(props: any) {
    return (
      <>
        <Text
          style={[
            { fontWeight: "bold" },
            { fontSize: 20 },
            { backgroundColor: generateColor() },
          ]}
        >
          someComponent
        </Text>
        <Text style={[{ fontWeight: "bold" }, { fontSize: 20 }]}>
          들어온 데이터 {props.clickCount}
        </Text>
        <Button title="버튼이다!" onPress={props.onClick} />
      </>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: generateColor() }]}>
      <Text
        style={[
          { fontWeight: "bold" },
          { fontSize: 20 },
          { backgroundColor: generateColor() },
        ]}
      >
        오늘도 빡코딩!!
      </Text>

      <Text style={[styles.boldText, { backgroundColor: generateColor() }]}>
        오늘도 빡코딩!! {clickCount}
      </Text>

      <StatusBar style="auto" />
      <Text style={styles.boldText}>클릭수! {clickCount}</Text>
      <Button
        title="버튼이다!"
        onPress={(e) => {
          setClickCount(clickCount + 1);
        }}
      />
      <SomeComponent
        clickCount={clickCount}
        onClick={() => {
          setClickCount(clickCount + 1);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 26,
  },
});
