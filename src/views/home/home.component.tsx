import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Category, Machine } from "../../models";
import { MachineList } from "../machine/machine-list/machine-list.component";
import { MachineView } from "../machine/machine-view/machine-view.component";
import { Styles } from "./home.styles";

export const Home = (): JSX.Element => {
  const categories: Category[] = useSelector((state) => (state as any).machineCategories.categories);
  const machines: Machine[] = useSelector((state) => (state as any).machineList.machines);
  const dispatch = useDispatch();

  const renderMachines = (machine: Machine, category: Category): JSX.Element => {
    return (
      <>
        <MachineView category={category} machine={machine} />
      </>
    );
  };

  const renderCategoryGroup = (category: Category): JSX.Element => {
    return (
      <>
        <Text style={Styles.categoryTitle}>
          {category.title}
        </Text>
        <View>
          {
            machines.map((machine: Machine) => {
              if (machine.categoryId === category.id) {
                return renderMachines(machine, category);
              } else {
                return <></>;
              }
            })
          }
        </View>
      </>
    );
  };

  return (
    <ScrollView style={Styles.container}>
      {categories.length > 0 ? categories.map(renderCategoryGroup) : (
        <Text>No data available in the inventory.</Text>
      )}
    </ScrollView>
  );
};
