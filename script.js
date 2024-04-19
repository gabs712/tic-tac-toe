const gameBoard = (() => {
  const board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]

  let turn = 0

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''
    }
    turn = 0
  }

  const getTurn = () => turn
  const upTurn = () => ++turn

  const cellIsEmpty = (index) => {
    if (board[index] === '') return true
    return false
  }

  const setBoard = (index, mark) => board[index] = mark

  return {board, reset, setBoard, getTurn, upTurn, cellIsEmpty}
})()


const game = (() => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const players = []

  const winner = () => {
    const board = gameBoard.board
    for (condition of winConditions){
      if (
        board[condition[0]] === 'x' &&
        board[condition[1]] === 'x' &&
        board[condition[2]] === 'x'
      ) {
        return 'x'
      }
      if (
        board[condition[0]] === 'o' &&
        board[condition[1]] === 'o' &&
        board[condition[2]] === 'o'
      ) {
        return 'o'
      }
    }
    if (!board.includes('')) {
      console.log('Tie!')
      return 'tie'
    }
    return false
  }

  return {players, winner}
})()


const Player = (name) => {
  let score = 0

  const getScore = () => score
  const upScore = () => ++score

  return {name, getScore, upScore}
}


(() => {
  const inputs = document.querySelectorAll('[data-input]')
  const startButton = document.querySelector('[data-start-button]')
  const labels = document.querySelectorAll('[data-label')
  const gridCells = document.querySelectorAll('[data-gi]')

  inputs.forEach((input) => {
    input.addEventListener('focus', clearWhenFocus, {once: true})
  })

  function clearWhenFocus(ev) {
    ev.target.value = ''
  }

  startButton.addEventListener('click', startGame)

  function startGame(ev) {
    inputs.forEach((input) => {
      game.players.push(Player(input.value))
      input.disabled = true
    })
    startTurn(ev)
  }

  function startTurn(ev) {
    updateScore()
    ev.target.remove()
    gameBoard.reset()
    clearBoard()
    gridCells.forEach((cell) => {
      cell.style.cursor = 'pointer'
      cell.addEventListener('mouseenter', changeOpacity)
      cell.addEventListener('click', playTurn)
    })
  }

  function updateScore() {
    labels.forEach((label, i) => {
      const score = game.players[i].getScore()
      label.textContent = `Score: ${score}`
    })
  }

  function clearBoard() {
    gridCells.forEach((cell) => {
      cell.innerHTML = ''
    })
  }

  function changeOpacity(ev) {
    ev.target.style.opacity = '.6'
    ev.target.addEventListener('mouseleave', () => {
      ev.target.style.opacity = '1'
    })
  }
  function playTurn(ev) {
    const cellIndex = ev.target.dataset.index
    if (!gameBoard.cellIsEmpty(cellIndex)) return

    // O's turn
    if (gameBoard.getTurn() % 2 === 0) {
      gameBoard.setBoard(cellIndex, 'o')
      ev.target.innerHTML = `<svg class="o" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`
    } else { // X's turn
      gameBoard.setBoard(cellIndex, 'x')
      ev.target.innerHTML = `<svg class="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`
    } 
    gameBoard.upTurn()

    const winner = game.winner()
    if (!winner) return

    if (winner === 'o') {
      const player1 = game.players[0]
      player1.upScore()
      labels[0].textContent = `Winner: ${player1.name}`
    } else if (winner === 'x') {
      const player2 = game.players[1]
      player2.upScore()
      labels[1].textContent = `Winner: ${player2.name}`
    } else {
      labels[0].textContent = 'Tie'
      labels[1].textContent = 'Tie'
    }

    gameBoard.reset()
    ev.target.removeEventListener('click', playTurn)

    resetTurn()
  }

  
  function resetTurn() {
    gridCells.forEach((cell) => {
      cell.removeEventListener('click', playTurn)
      cell.removeEventListener('mouseenter', changeOpacity)
      cell.style.cursor = 'default'
    })
    addResetButton()
  }

  function addResetButton() {
    const form = document.querySelector('[data-form]')
    const button = document.createElement('button')
    button.textContent = 'Reset Game'
    button.addEventListener('click', startTurn)
    form.append(button)
  }
})()