const gameBoard = (() => {
  const board = [
    '', '', '',
    '', '', '',
    '', '', ''
  ]

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = ''
    }
  }

  const set = (index, mark) => {
    if (board[index] !== '') {
      console.log('Cell already occupied')
      return false
    }
    board[index] = mark
    return true
  }

  return {board, reset, set}
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

  const checkWinner = (board) => {
    for (condition of winConditions){
      if (
        board[condition[0]] === 'x' &&
        board[condition[1]] === 'x' &&
        board[condition[2]] === 'x'
      ) {
        console.log('X wins')
        return 'x'
      }
      if (
        board[condition[0]] === 'o' &&
        board[condition[1]] === 'o' &&
        board[condition[2]] === 'o'
      ) {
        console.log('O wins')
        return 'o'
      }
    }
    if (!board.includes('')) {
      console.log('Tie!')
      return 'tie'
    }
    console.log('not finished')
    return false
  }

  return {checkWinner}
})()


const Player = (name, mark) => {
  let score = 0

  const getScore = () => score
  const upScore = () => ++score

  return {name, mark, getScore, upScore}
}


;(function uiEffects() {
  ;(function inputClear() {
    const inputs = document.querySelectorAll('input')
    
    inputs.forEach((input) => {
      input.addEventListener('focus', (ev) => {
        ev.target.value = ''
      }, {once:true})
    })
  })()


})()