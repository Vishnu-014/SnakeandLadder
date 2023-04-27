import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';


const SQUARE_SIZE = 40;

const SnakeNLader = () => {

  const BOARD = Array.from({ length: 100 }, (_, i) => i + 1)
  const [position, setPosition] = useState(1);
  const [position1, setPosition1] = useState(1);
  const [winner, setWinner] = useState(false);
  const [winner1, setWinner1] = useState(false);
  const [player, setPlayer] = useState();
  const sn = [18, 7, 27, 43, 51, 60, 72, 86]
  const ld = [3, 22, 35, 47, 65, 78, 92]

  const isSnakeOrLadder = (cellIndex) => {
    switch (cellIndex) {
      case 3:
        return { type: 'ladder', target: 17 };
      case 7:
        return { type: 'snake', target: 3 };
      case 18:
        return { type: 'snake', target: 8 };
      case 22:
        return { type: 'ladder', target: 39 };
      case 27:
        return { type: 'snake', target: 13 };
      case 35:
        return { type: 'ladder', target: 45 };
      case 43:
        return { type: 'snake', target: 25 };
      case 47:
        return { type: 'ladder', target: 56 };
      case 51:
        return { type: 'snake', target: 33 };
      case 60:
        return { type: 'snake', target: 23 };
      case 65:
        return { type: 'ladder', target: 85 };
      case 72:
        return { type: 'snake', target: 53 };
      case 78:
        return { type: 'ladder', target: 96 };
      case 86:
        return { type: 'snake', target: 63 };
      case 92:
        return { type: 'ladder', target: 99 };
      default:
        return false;
    }
  };

  const rollDice = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setPosition(position + diceValue);
    const snakenLadder = isSnakeOrLadder(position);
    if (snakenLadder) {
      setPosition(snakenLadder.target);
    }

    if (position >= 100) {
      setWinner(true);
    }
  }

  const rollDice1 = () => {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    setPosition1(position1 + diceValue);
    const snakenLadder = isSnakeOrLadder(position1);
    if (snakenLadder) {
      setPosition1(snakenLadder.target);
    }

    if (position1 >= 100) {
      setWinner1(true);
    }
  }
  //console.log(position);

  const movePlayer = (item) => {
    const isPlayerPosition = item === position;
    const s = sn.filter(snake => snake === item)
    const l = ld.filter(ladder => ladder === item)

    const color = isPlayerPosition ? '#19A7CE' : 'white';
    const snakeColor = s ? 'red' : 'white';
    const ladderColor = s ? 'green' : 'white';

    if (isPlayerPosition) {
      return <View style={[{ backgroundColor: color }]}>
        <Text style={{ color: 'black' }}>P1</Text>
      </View>
    }


    if (+s === item) {
      return <View>
        <Text style={[{ backgroundColor: snakeColor, color: 'white' }]}>snake</Text>
      </View>
    }
    if (+l === item) {
      return <View>
        <Text style={[{ backgroundColor: ladderColor, color: 'white' }]}>ladder</Text>
      </View>
    }
  }


  const movePlayer1 = (item) => {
    const isPlayerPosition = item === position1;
    const color = isPlayerPosition ? '#E11299' : 'white';

    if (isPlayerPosition) {
      return <View style={[{ backgroundColor: color }]}>
        <Text style={{ color: 'white' }}>P2</Text>
      </View>
    }

  }


  const reset = () => {
    setPosition(1);
    setPosition1(1);
    setWinner(false)
    setWinner1(false)
  }

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient
        style={styles.rootContainer}
        colors={['#753682', '#bf2e34']}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Snake And Ladder</Text>
            
            <View style={styles.board}>
              {BOARD.reverse().map((item) => {
                return <View key={item} style={styles.square}>
                  <View>
                    {movePlayer(item)}
                    {movePlayer1(item)}
                    <Text>{item}</Text>
                  </View>
                </View>
              })}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                buttonStyle={{
                  backgroundColor: '#19A7CE',
                  borderWidth: 0,
                  borderColor: 'black',
                  borderRadius: 30,
                }}
                style={{
                  margin: 30,
                }}
                title='Roll Player 1' onPress={rollDice} />
              <Button
                buttonStyle={{
                  backgroundColor: '#E11299',
                  borderWidth: 0,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                style={{
                  margin: 30
                }}
                title='Roll Player 2' onPress={rollDice1} />
            </View>
            <Button
              buttonStyle={{
                backgroundColor: '#609966',
                borderColor: 'black',
                borderWidth: 0,
                borderRadius: 30,
                width: 270,

              }}
              title='Reset' onPress={reset} />

            {winner && Alert.alert('Game Over', 'Player 1 Wins 🏆')}
            {winner && reset()}
            {winner1 && Alert.alert('Game Over', 'Player 2 Wins 🏆')}
            {winner1 && reset()}
          </View>
        </View>
      </LinearGradient>
    </>

  )
}

export default SnakeNLader

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
  container: {
    flex: 1,

  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    marginTop: 50,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 60,
    //fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 50,
    color: '#fff',
    fontFamily: 'snake',
    letterSpacing: 5
  },
  board: {
    height: '100%',
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'orange',
    borderColor: 'white'
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1',

    //backgroundColor: 'pink',
  },
  piece: {
    //backgroundColor: 'red',
    height: 10,
    width: 10,
  }
})