let cards= ["lion","zebra","bird","monkey","frog","fish"]

function shuffle(){
    let shuffled = cards.slice()
    shuffled.sort(()=>Math.random()-0.5)
    // cards[Math.random()*cards2.length]
    return shuffled
}
console.log(shuffle())
console.log(cards)

function addChild(){
    let board = document.getElementById("game-table")
    for (item of cards){
        let elem = document.createElement("div")
        elem.innerText = item
        elem.className="card"
        board.appendChild(elem)
    }
}
addChild()