/* import React, { Component } from 'react';
import { Text, Button, StyleSheet, Alert, View, FlatList, TextInput } from 'react-native'

export default class App extends Component {
  _onPressButton() {
    alert('Arquivo selecionado!')
  }

  constructor(props) {
    super(props);
    this.state = {text: ''};
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
      <View style={styles.container}>
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

    container: {
      flex: 1,
      backgroundColor: "#f4f4f4"
    },
    input: {
      margin: 5,
      width: 250,
      borderColor: "#000",
      borderWidth: 2
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
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
}) */

import React, { Component } from 'react';
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
});