import { Button, Icon } from "@rneui/themed";
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Attribute, Category, FieldType } from "../../../models";
import { addCategory, removeCategory } from "../../../redux/categories";
import { CreateGuid } from "../../../utils";
import { CategoryView } from "../category-view/category-view.component";
import { Styles } from "./category-list.styles";

const DEFAULT_ATTRIBUTE: Attribute = { id: CreateGuid(), name: "Model", type: FieldType.Text, isTitle: true };
const DEFAULT_TITLE = "New machine type";

export const CategoryList = (): JSX.Element => {
  const categories = useSelector((state) => (state as any).machineCategories.categories);
  const dispatch = useDispatch();

  const renderCategory = (category: Category): JSX.Element => {
    return (
      <CategoryView {...category} />
    );
  };

  const addCategoryHandler = (): void => {
    const newCat = {
      id: CreateGuid(),
      title: DEFAULT_TITLE,
      attributes: [DEFAULT_ATTRIBUTE]
    };
    dispatch(addCategory({category: newCat}));
  };

  return (
      <View style={Styles.container}>
        <ScrollView  style={Styles.categoryContainer}>
          {categories.length > 0 ? categories.map(renderCategory) : (
            <Text>No Machine Type is available, click on Plus "+" button to create a new Machine Type.</Text>
          )}
        </ScrollView>
        <Button containerStyle={Styles.addButtonContainer} buttonStyle={Styles.addButton} onPress={addCategoryHandler}>
          <Icon name="add" color={"white"}/>
        </Button>
      </View>
  );
};
