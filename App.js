import React, { Component } from 'react';
import { Button, StyleSheet, Alert, View, Image, ScrollView, TextInput } from 'react-native';
import { Table, Row } from 'react-native-table-component';

var SampleArray = [];

export default class MainActivity extends Component {
  constructor(props) {
       super(props)
       this.state = {
        HeadTable: ['Dados', 'xi', 'Xi', 'fr', 'Fr', '%'],
        widthArr: [105, 40, 45, 100, 100, 100],
        DataTable: [],
        Holder: ''
       }
  }

  AddItemsToArray = () => {
      SampleArray.push(this.state.Holder.toString());
      console.log('Valor adicionado!');
      this.setState({SampleArray: SampleArray});
      //Alert.alert(SampleArray.toString());
  }

  valores = () => {
    Alert.alert(SampleArray.toString());
  };

  calculate = () => {
    let novo = SampleArray.toString().split(",");
    const data = novo.sort((a,b)=>{
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
    let array = [];
    let inicio;
    let final;

    if (data.length === 0) {
      Alert.alert('Antes de calcular, você deve inserir ao menos 2 valores!');
      return;
    }

    for (let i = 0; i < k; i++) {
      inicio = min + i * intervalo;
      final = min + (i+1) * intervalo;
      intervalos.push([inicio, final]);
    }

    do {
    for (let i = ultimaIteracao; i <= data.length; i++ ) {
      if (i===0) {
        if (data[i] <= intervalos[intervaloAtual][1])
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
        if ( data[i] >= intervalos[intervaloAtual][0] && data[i] <= intervalos[intervaloAtual][1])
          xi[intervaloAtual]++;
        else {
          ultimaIteracao = i;
          intervaloAtual++;
          break;
        }
      }
    }
    } while(intervaloAtual < intervalos.length);

    for (let i = 0; i < k; i++) {
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
    console.log(data); 

    for (let i = 0; i<k; i++) {
      intervalos[i].splice(1, 0, " ... ");
    }

    for (let i=0; i<k; i++) {
      array.push([intervalos[i], xi[i], Xi[i], fr[i].toFixed(4), Fr[i].toFixed(4), percent[i].toFixed(2)+'%'])
    }

    this.setState({DataTable: array});
  }

  zerar = () => {
    SampleArray = [];
    this.setState({DataTable:[]});
  }

/*   renderItem = ({ item }) => {
    if (item.empty === true)
      return <View/>;

    return (<Text>{item.key}</Text>);
  }; */

 render() {
  const state = this.state;
   return (
    <View>
      <ScrollView>
        <Image source = {require('C:/Users/ricar/AppEstat/logo-ufsm.png')} style={styles.logo}/>
        <View style={styles.MainContainer}>
          <TextInput
              placeholder="Digite o valor"
              onChangeText={TextInputValue => this.setState({Holder: TextInputValue})}
              style={{textAlign: 'center', marginBottom: 6, height: 45}}
          />
          <Button title="Adicionar valor" onPress={this.AddItemsToArray}/>

        <View style={styles.botao}>  
          <Button title="Ver valores inseridos" onPress={this.valores}/>
        </View>

        <View style={styles.botao}>
         <Button title="Calcular" onPress={this.calculate}/>
        </View>

        <ScrollView horizontal={true}>
          <Table borderStyle={{borderWidth: 1.5, borderColor: '#000'}}>
            <Row data={state.HeadTable} widthArr={state.widthArr} style={styles.header} textStyle={{color: '#fff', textAlign: 'center', fontWeight: 'bold', padding: 5}}/>
            {this.state.DataTable.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={state.widthArr}
                style={[styles.row, index%2 && {backgroundColor: '#DDDDFF'}]}
                textStyle={{textAlign: 'center', padding: 7, fontSize: 17,}}
              />
            ))}
          </Table>
        </ScrollView>

        <View style={styles.botao}>
         <Button title="Calcular Novamente" onPress={this.zerar}/>
        </View>

        </View>
      </ScrollView>
    </View>
   );
 }
}

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: -25,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    margin: 15
  },
  header: {
    backgroundColor: '#333',
    marginTop: 5
  },
  botao: {
    marginTop: 5
  },
  logo: {
    width: 125,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});