import axios from "axios";
import openSocket from 'socket.io-client';

const socket = openSocket(window.location.origin);

export default {
  // Gets all minions
  getMinions: function() {
    return axios.get("/api/minions");
  },



  // Socket stuff below
  joinGame: (cb) => {
    socket.emit('joinGame', { })
    socket.on('updateGame', cb)
    socket.on('showNewTurn', cb)
    
  },
  draftChampion: (champions, champion, cb) => {
    socket.emit('draftChampion', champions, champion)
    // socket.on
  },
  draft1Minion: (minions , minion, name, cb) => {
  
    socket.emit('draft1Minion', minions, minion, name)
  },

  draft2Minion: (minions , minion, name,  cb) => {
  
    socket.emit('draft2Minion', minions, minion, name)
  },

  leaveGame: () => {
    socket.emit('leaveGame')
    
  },

  assignNames: (name) => {
    socket.emit('assignNames', name)
  },

  board: (allState) => {
    console.log(allState)
    socket.emit('board', allState)
  },

  playAHand: (playerAField, playerAHand, playerAMana) => {
    socket.emit('playAHand', playerAField, playerAHand, playerAMana)
  },

  playBHand: (playerBField, playerBHand, playerBMana, name) => {
    socket.emit('playBHand', playerBField, playerBHand, playerBMana, name)
  },

  attackAChampion: (playerAChampion, playerBField, playerBMana, playerBGraveyard) => {
    socket.emit('attackAChampion', playerAChampion, playerBField, playerBMana, playerBGraveyard)
  },

  attackBChampion: (playerBChampion, playerAField, playerAMana, playerAGraveyard) => {
    socket.emit('attackBChampion', playerBChampion, playerAField, playerAMana, playerAGraveyard)
  },

  attackBMinion: (playerAField, playerBField, playerAMana, playerBGraveyard, playerAGraveyard) => {
    socket.emit('attackBMinion', playerAField, playerBField, playerAMana, playerBGraveyard, playerAGraveyard)
  },

  attackAMinion: (playerBField, playerAField, playerBMana, playerAGraveyard, playerBGraveyard) => {
    socket.emit('attackAMinion', playerBField, playerAField, playerBMana, playerAGraveyard, playerBGraveyard)
  },

  showTurn: (modal) => {
    socket.emit('showTurn', modal)
  },



  joinNewGame: () => {
    console.log("joining a game")
    socket.emit('joinNewGame')

  },

  checkSocket: (cb) => {
    socket.emit('checkSocket', cb)
  },

  changeAsTurn: (currentAMaxMana, newMana, name) => {
    socket.emit('changeATurn', currentAMaxMana, newMana, name)
  },

  changeBsTurn: (currentBMaxMana, newMana, name) => {
    socket.emit('changeBTurn', currentBMaxMana, newMana, name)
  }



};