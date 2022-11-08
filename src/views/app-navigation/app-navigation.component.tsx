import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { CategoryList } from "../category/category-list/category-list.component";
import { Home } from "../home/home.component";
import { MachineList } from "../machine/machine-list/machine-list.component";
import { Styles } from "./app-navigation.styles";

const Drawer = createDrawerNavigator();

export const AppNavigation = (): JSX.Element => {
  const navigation = useNavigation();
  const categories = useSelector((state) => (state as any).machineCategories.categories);

  const renderRow = (title: string, icon: string, routeName: string): JSX.Element => {
    return (
      <ListItem
        key={routeName}
        bottomDivider
        onPress={() => {
          navigation.navigate(routeName as never);
        }}
      >
        <Icon name={icon} />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <Drawer.Navigator initialRouteName="Home" useLegacyImplementation drawerContent={(props) => (
      <View style={Styles.drawerContainer}>
        {renderRow("Home", "home", "Home")}
        {categories.map((category: any) => {
          return renderRow(category.title, "category", category.id);
        })}
        {renderRow("Manage Machine Types", "playlist-add", "ManageCategories")}
      </View>
    )}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ManageCategories" component={CategoryList} />
      {categories.map((category: any) => {
        return (
          <Drawer.Screen
            key={category.id}
            name={category.id} component={MachineList}
            options={{ title: category.title }}
          />
        );
      })}
    </Drawer.Navigator>
  );
};
