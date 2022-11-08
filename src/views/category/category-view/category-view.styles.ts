import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  attributesContainer: {
    padding: 10
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  formTitle: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 15
  },
  listItemContainer: {
    padding: 0
  },
  listItem: {
    width: '100%',
    borderColor: 'grey',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  attributeTitle: {
    fontSize: 17,
    fontWeight: '600'
  },
  categoryContainer: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10
  },
  fieldType: {
    borderWidth: 0.5,
    alignSelf: 'center',
    padding: 5,
    borderColor: 'grey',
    borderRadius: 5
  },
  fieldActions: {
    flexDirection: 'row'
  },
  fieldTitleBtn: {
    margin: 16
  }
});
