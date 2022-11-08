import { Button, Input, Icon } from "@rneui/base";
import { Dialog, Divider, ListItem } from "@rneui/themed";
import React, { FC, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { Attribute, Category, FieldType } from "../../../models";
import { removeCategory, updateCategory } from "../../../redux/categories";
import { CreateGuid } from "../../../utils";
import { Styles } from "./category-view.styles";

export const CategoryView: FC<Category> = (category): JSX.Element => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState<boolean>(false);
  const [titalModalvisible, setTitalModalvisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(category.title);
  const [attributes, setAttributes] = useState<Attribute[]>(category.attributes);

  const attributeTypes = [FieldType.Text, FieldType.Number, FieldType.Checkbox, FieldType.Date];

  const addAttribute = (attributeType: FieldType): void => {
    setVisible(false);
    const newAttr: Attribute = {
      id: CreateGuid(),
      name: '',
      type: attributeType,
      isTitle: false
    };
    setAttributes((attributes) => {
      return [...attributes, newAttr];
    });

    dispatch(updateCategory({
      category: {
        ...category,
        attributes: [...attributes, newAttr]
      }
    }));
  };

  const removeAttribute = (id: string): void => {
    setAttributes([...(attributes.length > 1 ? attributes.filter((attr) => attr.id !== id) : attributes)]);

    dispatch(updateCategory({
      category: {
        ...category,
        attributes: [...(attributes.length > 1 ? attributes.filter((attr) => attr.id !== id) : attributes)]
      }
    }));
  };

  const removeCategoryHandler = (id: string): void => {
    dispatch(removeCategory({id: id}));
  };
  
  const renderFieldTypeList = (attributeType: FieldType, index: number): JSX.Element => {
    return (
      <>
        <ListItem key={attributeType} containerStyle={Styles.listItemContainer}>
          <Pressable onPress={() => { addAttribute(attributeType) }} style={Styles.listItem}>
            <Text>{attributeType}</Text>
          </Pressable>
        </ListItem>
        {index < attributeTypes.length-1 && <Divider width={1} />}
      </>
    );
  };

  const attributeChangeHandler = (value: string, id: string): void => {
    const updatedAttributes = attributes.map((attr) => {
      if (attr.id === id) {
        return {...attr, name: value};
      }
      return attr;
    });
    setAttributes(updatedAttributes);
    
    dispatch(updateCategory({
      category: {
        ...category,
        attributes: updatedAttributes
      }
    }));
  };

  const renderAttribute = (attribute: Attribute): JSX.Element => {
    return (
      <Input
        key={attribute.id}
        placeholder="Field"
        onChangeText={(value: string) => {
          attributeChangeHandler(value, attribute.id);
        }}
        value={attribute.name}
        rightIcon={(
          <View style={Styles.fieldActions}>
            <Text style={Styles.fieldType}>{attribute.type}</Text>
            <Icon name="delete" onPress={() => { removeAttribute(attribute.id) }} />
          </View>
        )}
      />
    );
  };

  const titleHandler = (value: string): void => {
    setTitle(value);
    dispatch(updateCategory({
      category: {
        ...category,
        title: value
      }
    }));
  };
  
  const setAttributeAsTitle = (id: string): void => {
    setTitalModalvisible(false);
    const updatedAttributes = attributes.map((attr) => {
      if (attr.id === id) {
        return {...attr, isTitle: true};
      }
      return {...attr, isTitle: false};
    });
    setAttributes(updatedAttributes);
    
    dispatch(updateCategory({
      category: {
        ...category,
        attributes: updatedAttributes
      }
    }));
  };
  
  const renderFieldList = (attribute: Attribute, index: number): JSX.Element => {
    return attribute.name ? (
      <>
        <ListItem key={attribute.id} containerStyle={Styles.listItemContainer}>
          <Pressable onPress={() => { setAttributeAsTitle(attribute.id) }} style={Styles.listItem}>
            <Text>{attribute.name}</Text>
          </Pressable>
        </ListItem>
        {index < attributes.length-1 && <Divider width={1} />}
      </>
    ) : <></>;
  };

  return (
    <>
      <View style={Styles.categoryContainer}>
        <Text style={Styles.formTitle}>{title}</Text>
        <Input placeholder={title} value={title} onChangeText={titleHandler} />
        <View style={Styles.attributesContainer}>
          <Text style={Styles.attributeTitle}>Attributes</Text>
          {attributes.map(renderAttribute)}
          <Button containerStyle={Styles.fieldTitleBtn} onPress={() => { setTitalModalvisible(true) }}>
            Title field: {attributes.find((attr) => attr.isTitle)?.name}
          </Button>
        </View>
        <View style={Styles.formFooter}>
          <Button title={"Add new attribute"} onPress={() => { setVisible(true) }} />
          <Button type="clear" onPress={() => {removeCategoryHandler(category.id)}}>
            <Icon name="delete" />
            Remove category
          </Button>
        </View>
      </View>

      <Dialog
        isVisible={visible}
        onBackdropPress={() => { setVisible(false) }}
      >
        {attributeTypes.map(renderFieldTypeList)}
      </Dialog>

      <Dialog
        isVisible={titalModalvisible}
        onBackdropPress={() => { setTitalModalvisible(false) }}
      >
        {attributes.map(renderFieldList)}
      </Dialog>
    </>
  );
};
