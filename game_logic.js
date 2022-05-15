let cards= ["🦁","🦓","🦜","🐒","🐸","🐟","🐮","🐶","🐘","🐪","🦒","🦔","🐨","🐓"]


let cardNum;
let playersNum;
let playersNames = []
let players=[]
let screenScore ;
let shown = 0
let totalShown = 0
let curPlayer ;
let curPlayerElem ; 


let startScreen = document.getElementById("startScreen")
let cardsNumInp = document.getElementById('cardsInput')
let playersNumInp = document.getElementById('playersNumInput')
let playersNamesInp = document.getElementsByClassName('playersNameInput')
let playersNamesElem = document.getElementById("playersNames")
let btn = document.getElementById('startGameBtn')
let semiBody = document.getElementById("semi-body")
let playerScreen = document.getElementById("players")
let board = document.getElementById("game-table")
let restartBtn = document.getElementById("restartGameBtn")
let winScreen = document.getElementById("winScreen")


function restartGgame(){
    cards = cards.slice(0,cardNum) 
    players.forEach(p=>p.score = 0)
    board.replaceChildren()
    addCards(shuffle())
    playerScreen.replaceChildren()
    curPlayer = players[0]
    addPlayers()
}


restartBtn.onclick = function(e){restartGgame()}


function checkWinner(){
    maxScore = 0
    for (obj of players){
        if (obj.score >= maxScore){maxScore=obj.score}
    }
    winners = players.filter(obj=>obj.score == maxScore? true : false)
    return winners
}


function showWinScreen(){
    semiBody.style.display = 'none'
    curWinners = checkWinner()
    if (curWinners.length ==1){
        winScreen.innerText = `The winner is: ${curWinners[0].name}
        With ${curWinners[0].score} points!!`
    }
    else{
        winStr = ``
        curWinners.forEach((v,i)=> winStr += `Winner number ${i+1} is: ${v.name} \n\n`)
        winScreen.innerText = `${winStr}
        With ${curWinners[0].score} points for each!!`
    }
    winScreen.style.display = 'flex'
}


function changePlayer(){
    if (curPlayer == players[players.length-1]){
        curPlayer=players[0]
    }
    else{curPlayer=players[players.indexOf(curPlayer)+1]}
    curPlayerElem = document.getElementById(curPlayer.playerNum)
    document.querySelectorAll('.players').forEach(player => player.classList.remove("curPlayer"))
    curPlayerElem.classList.add('curPlayer')
}


function endOfGame(){
    if (totalShown == cards.length){
        showWinScreen()
    }
}


let flipBack = ()=>{
    document.querySelectorAll('.isFlipped:not(.matched)').forEach(card => card.classList.remove("isFlipped"))
    shown = 0
}


let flipCard = (event)=>{
    shown++
    if (shown<=2){
        event.target.classList.add("isFlipped")
    }
    if (shown == 2){
        let shownCards = document.querySelectorAll('.isFlipped:not(.matched)')
        setTimeout(function(){
            flipBack()
        if (shownCards[0].innerText == shownCards[1].innerText){
            shownCards[0].classList.add("matched")
            shownCards[1].classList.add("matched")
            curPlayer.score ++
            totalShown ++
            screenScore = document.getElementById(curPlayer.playerNum)
            screenScore.innerText= `${curPlayer.name}: ${curPlayer.score}`
            endOfGame()
        }
        else{changePlayer()}
        },1000)        
    }
}


function addPlayers(){
    players.forEach(v=>{
        let p= document.createElement("div")
        p.className="players"
        p.id=v.playerNum
        p.innerText=`${v.name}: ${v.score}`
        playerScreen.appendChild(p)
    })
    curPlayerElem = document.getElementById(curPlayer.playerNum)
    curPlayerElem.classList.add("curPlayer")
}


function addCards(shuffledArr){
    for (item of shuffledArr){
        let elem = document.createElement("div")
        elem.className="card"
        board.appendChild(elem)
        front = document.createElement("div")
        back = document.createElement("div")
        front.className="frontCard"
        back.className="backCard"
        back.innerText= item
        elem.style.fontSize="20px"
        front.innerHTML = '❔'
        elem.appendChild(front)        
        elem.appendChild(back)        
        elem.onclick=flipCard
    }
}


function shuffle(){
    let shuffled = cards.slice().concat(cards)
    shuffled.sort(()=>Math.random()-0.5)
    return shuffled
}


function game(){
    // defines cards array, players array, and current player. then send to add cards and players functions and show everything.
    cards = cards.slice(0,cardNum) 
    for (i=0;i<playersNum;i++){
        players.push({playerNum: `player${i+1}` ,name:`${playersNames[i]}`,score:0})
    }
    addCards(shuffle())
    curPlayer = players[0]
    addPlayers()
    semiBody.style.display = 'flex'
}


function playerNamesFunc(){
    // add inputNames elements and send the names into an array when finished
    for (i=0;i<playersNum;i++){
        par = document.createElement("p")
        span = document.createElement("span")
        player = document.createElement("input")
        space = document.createElement("br")
        player.type = "text"
        span.innerText = `Player ${i+1}, Insert name: `
        player.className = 'playersNameInput'
        par.className = 'playerNamePar'
        par.append(span,player,space)
        playersNamesElem.appendChild(par)
        player.onblur = function(e){
            playersNames.push(e.target.value)
        }
    }
}


// initialize start screen and when start game is pressed, the game starts.
function startGameScreen(){
    cardsNumInp.oninput = function(e){
        cardNum= e.target.valueAsNumber /2
    }
    playersNumInp.oninput = function(e){
        // make sure that each press initialize new inputNames
        const inputNames = document.querySelectorAll(".playerNamePar")
        inputNames.forEach(v=>v.remove())
        playersNames = []
        // define number of players according to user choose, then creates the new inputs(using separate function)
        playersNum = e.target.valueAsNumber
        playerNamesFunc()
    }
    btn.onclick = function(){
        const inputFields = document.querySelectorAll("input")
        const validInputs = Array.from(inputFields).filter( input => input.value == "");
        // check if there is an empty input
        if (validInputs.length > 0){
            alert("Fill all the fields!")
        }
        else{
            startScreen.style.display = 'none'
            game()
        }
    }        
}


startGameScreen()
