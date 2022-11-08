import { Button, Icon } from "@rneui/themed";
import React from "react";
import { ScrollView, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { Category, Field, Machine } from "../../../models";
import { addMachine } from "../../../redux/machines";
import { CreateGuid } from "../../../utils";
import { MachineView } from "../machine-view/machine-view.component";
import { Styles } from "./machine-list.styles";

export const MachineList = ({ route }: any): JSX.Element => {
  const categories: Category[] = useSelector((state) => (state as any).machineCategories.categories);
  const machines: Machine[] = useSelector((state) => (state as any).machineList.machines);
  const dispatch = useDispatch();
  const category = categories.find((cat: any) => (cat).id === route.name);

  const addMachineHandler = (): void => {
    const newMachine: Machine = {
      id: CreateGuid(),
      categoryId: category?.id || ''
    };
    dispatch(addMachine({
      machine: newMachine
    }));
  };

  const renderMachine = (machine: Machine): JSX.Element => {
    return (
      <MachineView machine={machine} category={category} />
    );
  };

  return (
    <View style={Styles.container}>
      <ScrollView  style={Styles.machineContainer}>
          {
            (machines.length > 0 && machines.findIndex(m => m.categoryId === route.name) !== -1)
            ? machines.filter(m => m.categoryId === route.name).map(renderMachine)
            : (
              <Text>No {category?.title} is available, click on Plus "+" button to create a new {category?.title}.</Text>
            )
          }
        </ScrollView>
      <Button containerStyle={Styles.addButtonContainer} buttonStyle={Styles.addButton} onPress={addMachineHandler}>
        <Icon name="add" color={"white"}/>
      </Button>
    </View>
  );
};
