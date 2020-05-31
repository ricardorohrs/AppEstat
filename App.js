import React, { Component } from 'react';
import { Text, Button, StyleSheet, Alert, View, FlatList, TextInput } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

var SampleArray = [1,2,10,3,4,5,6,7,8,9,0,1,5,2,3,6,4,9,7,8,1,2,3,4,6,9,5,2,3,1,7,0,8,5,9,4,6,3,1,2,0,7,8,4,1,10,5,2,3,0,6,9,2,3,4,5,0,1,9,4,
                      12,16,15,17,19,20,11,13,17,19,12,14,13,18,17,20,16,11,10,19,18,13,16,15,10,17,14,20,12,11,3,6,9,8,7,4,2,1,10,20,11,2,1,6];

/* const data = [
  { key: 'Dado' },
  { key: 'xi' },
  { key: 'XI' }, 
  { key: 'fr' }, 
  { key: 'Fr' },
  { key: '%' }
];
 */

/* const numColumns = 6;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: 'blank-${numberOfElementsLastRow}', empty: true });
    numberOfElementsLastRow++;
  }

  return data;
}; */

export default class MainActivity extends Component {
  constructor(props) {
       super(props)
       this.state = {
        HeadTable: ['Dado', 'xi', 'Xi', 'fr', 'Fr', '%'],
        DataTable: [],
        Holder: ''
       }
  }

  AddItemsToArray = () => {
      SampleArray.push(this.state.Holder.toString());
      //Alert.alert(SampleArray.toString());
  }

  calculate = () => {
    const data = SampleArray.sort((a,b)=>{
      return a - b;
    });

    let k = Math.round((1 + 3.3 * Math.log10(data.length)));
    let max = Math.max(...data);
    let min = Math.min(...data);
    let A = max - min;
    let intervalo = (A/k).toFixed(4);
    let xi = [0, 0, 0, 0, 0, 0, 0, 0];
    let intervaloAtual = 0;
    let ultimaIteracao = 0;
    let intervalos = [];
    let fr = [];
    let Xi = [];
    let Fr = [];
    let percent = [];
    let inicio;
    let final;
    let aux = [];
    
    for (let i = 0; i < k; i++) {
      inicio = min + i * intervalo;
      final = min + (i+1) * intervalo;
      intervalos.push([inicio, final]);
    }

    do {
    for ( let i = ultimaIteracao; i<data.length; i++ ) {
      if (i===0) {
        if ( data[i] < intervalos[intervaloAtual][1])
          xi[intervaloAtual]++;
        else	{
          ultimaIteracao = i;
          intervaloAtual++;
          break;
        }
      } else if (i===data.length-1) {
        if ( data[i] > intervalos[intervaloAtual][0] && data[i] <= intervalos[intervaloAtual][1])
          xi[intervaloAtual]++;
        else {
          ultimaIteracao = i;
          intervaloAtual++;
          break;
        }
      } else {
        if ( data[i] >= intervalos[intervaloAtual][0] && data[i] < intervalos[intervaloAtual][1])
          xi[intervaloAtual]++;
        else {
          ultimaIteracao = i;
          intervaloAtual++;
          break;
        }
      }
    }
    } while(intervaloAtual < intervalos.length);

    for (let i = 0; i<xi.length; i++) {
      fr.push(xi[i]/data.length);
      percent.push((fr[i])*100);
      if (i===0) {
        Xi.push(xi[i]);
        Fr.push(fr[i]);
        Fr[i] = (fr[i]);
      } else {
        Xi.push(Xi[i-1] + xi[i]);
        Fr.push(Fr[i-1] + fr[i]);
      }
    }

    console.log('   ');
    console.log('xi', xi);
    console.log('Xi', Xi);
    console.log('fr', fr);
    console.log('Fr', Fr);
    console.log('%', percent);
    console.log(intervalos); 

    for (let i = 0; i<k; i++) {
      intervalos[i].splice(1, 0, " ... ");
    }

    let array = [];

    for (let i=0; i<xi.length; i++) {
      array.push([intervalos[i], xi[i], Xi[i], fr[i].toFixed(4), Fr[i].toFixed(4), percent[i].toFixed(2)])
    }

    this.setState({DataTable: array});
  }

  renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

 render() {
  const state = this.state;
   return (
      <View style={styles.MainContainer}>
          <TextInput
              placeholder="Digite o valor"
              onChangeText={TextInputValue => this.setState({Holder: TextInputValue})}
              style={{textAlign: 'center', marginBottom: 6, height: 45}}
          />
          <Button title="Adicionar valor" onPress={this.AddItemsToArray}/>

{/*         <FlatList
          data={SampleArray}
          renderItem = { ({item}) => <Text style={styles.textoItem}>{item}</Text>}
        /> */}

        <Button title="Calcular" onPress={this.calculate}/>

{/*         <FlatList
          data={formatData(data, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        /> */}

        <Table borderStyle={{borderWidth: 1, borderColor: '#333'}}>
          <Row data={state.HeadTable}/>
          {this.state.DataTable.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
            />
          ))}
        </Table>

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