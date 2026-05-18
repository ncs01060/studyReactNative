import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type GlobalClickCountType = {
  globalClickCount: number;
  setGlobalClickCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function App() {
  const [clickCount, setClickCount] = useState<number>(0);
  const [globalClickCount, setGlobalClickCount] = useState<number>(0);
  const GlobalClickCountContext = createContext<GlobalClickCountType | null>(
    null,
  );

  const generateColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  function SomeComponent(props: any) {
    const context = useContext(GlobalClickCountContext);
    if (!context) {
      throw new Error("Provider 없음");
    }

    const { globalClickCount, setGlobalClickCount } = context;

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
          글로벌 클릭 카운트 {globalClickCount}
        </Text>
        <Button
          title="버튼이다!"
          onPress={() => {
            props.onClick();
          }}
        />
        <NestedSomeComponent01 onClick={props.onClick} />
        <NestedSomeComponent02 onClick={props.onClick} />
      </>
    );
  }

  function NestedSomeComponent01(props: any) {
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
        <Button
          title="버튼이다!"
          onPress={() => {
            props.onClick();
          }}
        />
      </>
    );
  }
  function NestedSomeComponent02(props: any) {
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
        <Button title="버튼이다!" onPress={() => {}} />
      </>
    );
  }

  function EvenNumberTitle(props: any) {
    if (props.isEven) {
      return <Text>짝수입니다.</Text>;
    }
    return null;
  }

  return (
    <GlobalClickCountContext.Provider
      value={{ globalClickCount, setGlobalClickCount }}
    >
      <View style={[styles.container, { backgroundColor: generateColor() }]}>
        <EvenNumberTitle isEven={clickCount % 2 === 0} />
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
        <Button
          title="글로벌 버튼이다!"
          onPress={(e) => {
            setGlobalClickCount(globalClickCount + 1);
          }}
        />
        <SomeComponent
          clickCount={clickCount}
          onClick={() => {
            setClickCount(clickCount + 1);
          }}
        />
      </View>
    </GlobalClickCountContext.Provider>
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
