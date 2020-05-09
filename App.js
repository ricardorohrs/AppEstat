import React, { Component } from 'react';
import { Text, Button, StyleSheet, View, FlatList } from 'react-native'

export default class App extends Component {
  _onPressButton() {
    alert('Arquivo selecionado!')
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const dados = [
      {key: 'Linha 1'},
      {key: 'Linha 2'},
      {key: 'Linha 3'},
      {key: 'Linha 4'},
      {key: 'Linha 5'}
    ]

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Upar arquivo!"
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
})