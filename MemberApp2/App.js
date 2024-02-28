import React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import HomeScreen from "./components/HomeScreen";
import MemberScreen from "./components/MemberScreen";
import client from "./components/client";
import { ApolloProvider } from "@apollo/client";

const HomeRoute = ({ navigation }) => <HomeScreen navigation ={navigation}/>;

const MemberRout = () => <MemberScreen />;
const renderScene = SceneMap({
  first: HomeRoute,
  second: MemberRout,
});

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Home" },
    { key: "second", title: "Member" },
  ]);

  return (
    <ApolloProvider client={client}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ paddingTop: 15 }}
      />
    </ApolloProvider>
  );
}
