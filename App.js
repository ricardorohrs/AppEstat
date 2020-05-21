/*import React, { Component } from 'react';
import { Text, Button, StyleSheet, Alert, View, FlatList, TextInput } from 'react-native'

var SampleArray = ["ONE", "TWO"] ;

export default class MainActivity extends Component {
  _onPressButton() {
    alert('Arquivo selecionado!')
  }

  constructor(props) {
       super(props)
       this.state = {
         Holder: ''
       }
  }

  AddItemsToArray=()=>{
      //Adding Items To Array.
      SampleArray.push( this.state.Holder.toString() );
      // Showing the complete Array on Screen Using Alert.
      Alert.alert(SampleArray.toString());
  }

 render() {
  const dados = [
    {key: 'Linha 1'},
    {key: 'Linha 2'},
    {key: 'Linha 3'},
    {key: 'Linha 4'},
    {key: 'Linha 5'}
  ]

  function rendertodo() {

    for (todo of todos) {
      var todoElement = document.createElement('li');
      var todoText = document.createTextNode(todo);

      todoElement.appendChild(todoText);
      listElement.appendChild(todoElement);
    }
  }

  function addtodo() {
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = '';
    rendertodo();
  }
   return (
      <View style={styles.MainContainer}>
          <TextInput
              placeholder="Digite o valor"
              onChangeText={TextInputValue => this.setState({ Holder : TextInputValue }) }
              style={{textAlign: 'center', marginBottom: 6, height: 45}}
          />
          <Button title="Adicionar valor" onPress={this.AddItemsToArray} />

      <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Upar arquivo!"
          />
        </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Escreva aqui!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
            onPress={this._onPressButton}
            title="Salvar valor"
        />
      </View>

        <FlatList
          data={dados}
          renderItem = { ({item}) => <Text style={styles.textoItem}>{item.key}</Text> }
        />
      </View>
   );
 }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: "#f4f4f4",
    margin: 15
  },
  input: {
    margin: 5,
    width: 250,
    borderColor: "#c3c3c3",
    borderWidth: 1
  },
  textoItem: {
    fontSize: 20,
    color: "#000",
    padding: 25,
    borderBottomWidth: 2
  },
  buttonContainer: {
    margin: 25
  },
});*/

import React, { Component } from 'react';
import { Text, Button, StyleSheet, Alert, View, FlatList, TextInput } from 'react-native'

const SampleArray = [1,2,3,4,5,6,7,8,9,0,1,5,2,3,6,4,9,7,8,1,2,3,4,6,9,5,2,3,1,7,0,8,5,9,4,6,3,1,2,0,7,8,4,1,5,2,3,0,6,9,2,3,4,5,0,1,9,4,2,1,6];

const data = [
  { key: 'Dado' },
  { key: 'xi' },
  { key: 'XI' }, 
  { key: 'fr' }, 
  { key: 'Fr' },
  { key: '%' }
];

const numColumns = 6;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: 'blank-${numberOfElementsLastRow}', empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

export default class MainActivity extends Component {
  _onPressButton() {
    alert('Arquivo selecionado!')
  }

  constructor(props) {
       super(props)
       this.state = {
         Holder: ''
       }
  }

  AddItemsToArray=()=>{
      //Adding Items To Array.
      SampleArray.push(this.state.Holder.toString());
      // Showing the complete Array on Screen Using Alert.
      Alert.alert(SampleArray.toString());
  }

   renderItem = ({item}) => (
    <View>
      <Text>{item}</Text>
    </View>
  );
  
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

 render() {
   return (
      <View style={styles.MainContainer}>
          <TextInput
              placeholder="Digite o valor"
              onChangeText={TextInputValue => this.setState({Holder: TextInputValue})}
              style={{textAlign: 'center', marginBottom: 6, height: 45}}
          />
          <Button title="Adicionar valor" onPress={this.AddItemsToArray}/>

        <FlatList
          data={SampleArray}
          renderItem = { ({item}) => <Text style={styles.textoItem}>{item}</Text>}
        />

        <FlatList
          data={formatData(data, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />

      </View>
   );
 }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: "#f4f4f4",
    margin: 15
  },
  input: {
    margin: 5,
    width: 250,
    borderColor: "#c3c3c3",
    borderWidth: 1
  },
  textoItem: {
    fontSize: 20,
    color: "#000",
    padding: 25,
    borderBottomWidth: 2
  },
  buttonContainer: {
    margin: 25
  },
  container: {
 //   marginBottom: 300
  },
  item: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
  itemText: {
    color: '#fff',
  },
});