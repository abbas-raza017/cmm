import { Button, Icon, Input, Switch } from "@rneui/themed";
import React, { FC, useState } from "react";
import { Modal, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Attribute, Category, FieldType, Machine } from "../../../models";
import { removeMachine, updateMachine } from "../../../redux/machines";
import { Styles } from "./machine-view.styles";
import DatePicker from 'react-native-modern-datepicker';

interface Props {
  machine: Machine;
  category?: Category;
};

export const MachineView: FC<Props> = ({ machine, category }): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const fieldChangeHandler = (id: string, value: string): void => {
    let updatedFields = [...machine.fields || []];
    if (!machine.fields || machine.fields.findIndex(f => f.id === id) === -1) {
      updatedFields.push({ id, value });
    } else {
      updatedFields = machine.fields?.map((field) => {
        if (field.id === id) {
          return {...field, value};
        }
        return field;
      });
    }
    
    dispatch(updateMachine({
      machine: {
        ...machine,
        fields: updatedFields
      }
    }))
  };

  const getFieldValue = (id: string): string | undefined => {
    return machine.fields?.find((f => f.id === id))?.value;
  };
  
  const renderField = (attribute: Attribute): JSX.Element => {
    switch (attribute.type) {
      case FieldType.Text:
        return (
          <Input
            label={attribute.name}
            value={getFieldValue(attribute.id)}
            placeholder={attribute.name}
            onChangeText={(value) => {
              fieldChangeHandler(attribute.id, value);
            }}
          />
        );    
      case FieldType.Number:
        return (
          <Input
            label={attribute.name}
            value={getFieldValue(attribute.id)}
            keyboardType="numeric"
            placeholder={attribute.name}
            onChangeText={(value) => {
              fieldChangeHandler(attribute.id, value);
            }}
          />
        );
      case FieldType.Checkbox:
        return (
          <View style={Styles.switchContiner}>
            <Switch
              value={getFieldValue(attribute.id) === 'true'}
              style={{alignSelf: 'flex-start'}}
              onValueChange={(value) => {
                fieldChangeHandler(attribute.id, value + "");
              }}
            />
            <Text>{attribute.name}</Text>
          </View>
        );
      case FieldType.Date:
        return (
          <>
            <Input
              label={attribute.name}
              value={selectedDate}
              placeholder={attribute.name}
              onPressIn={() => {setVisible(true)}}
            />

            <Modal visible={visible}>
              <View style={Styles.modalContainer}>
                <DatePicker
                  onSelectedChange={date => {
                    fieldChangeHandler(attribute.id, date);
                    setSelectedDate(date);
                    setVisible(false);
                  }}
                />
                <Button onPress={() => {setVisible(false)}}>Cancel</Button>
              </View>
            </Modal>
          </>
        );
    }
  };

  const removeMachineHandler = (id: string): void => {
    dispatch(removeMachine({id: id}));
  };

  const getMachineTitle = (): string => {
    const defaultTitle = "Unnamed title";
    const titleId = category?.attributes.find((attr) => attr.isTitle)?.id;
    const titleField = machine.fields?.find((field) => field.id === titleId);
    return titleField?.value ? titleField.value : defaultTitle;
  };

  return (
    <>
      <View style={Styles.container}>
        <Text style={Styles.title}>{getMachineTitle()}</Text>
        <View style={Styles.fieldsContainer}>
          {category?.attributes.map(renderField)}
        </View>
        <View style={Styles.formFooter}>
          <Button type="clear" onPress={() => {removeMachineHandler(machine.id)}}>
            <Icon name="delete" size={18} />
            Remove
          </Button>
        </View>
      </View>
    </>
  );
};
