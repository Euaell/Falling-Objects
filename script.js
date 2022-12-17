// create an array of emoji
const emoji = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🕷', '🕸', '🐢', '🐍', '🦎', '🦂', '🦀', '🦑', '🐙', '🦐', '🐠', '🐟', '🐡', '🐬', '🦈', '🐳', '🐋', '🐊', '🐅', '🐆', '🦓', '🦍', '🐘', '🦏', '🦛', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🕊', '🐇', '🐁', '🐀', '🐿', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '🌋', '🌌', '⭐', '🌠', '☄', '☀', '⛅', '☁', '⚡', '☔', '❄', '⛄', '🌀', '🌁', '🌈', '🌊', '🎃', '🎄', '🎆', '🎇', '✨', '🎈', '🎉', '🎊', '🎋', '🎍', '💝', '🎎', '🎏', '🎐', '🎀', '🎁', '🎗', '🎟', '🎫', '🎖', '🏆', '🏅', '🥇', '🥈', '🥉', '⚽', '⚾', '🏀', '🏐', '🏈', '🏉', '🎾', '🎱', '🏓', '🏸', '🏒', '🏑', '🏏', '🏹', '🥊', '🥋', '⛳', '⛸', '🎣', '🎽', '🎿', '🛷', '🥌', '🎯', '🎱', '🎮', '🎰', '🎲', '🧩', '♟', '🎭', '🎨', '🎬', '🎤']
// length: 202

function setHighScore(score) {
    let highscore = localStorage.getItem('falling_objects_highscore') || 0
    if (score >= highscore) {
        localStorage.setItem('falling_objects_highscore', score)
    }

    document.getElementById('high_score').innerHTML = localStorage.getItem('falling_objects_highscore')
}

let score = 0
setHighScore(score)

function onCollision(e) {
    var audio = new Audio('./collision.wav');
    audio.play();

    score -= Math.floor(emoji.indexOf(e.target.innerHTML) / 100) + 1
    document.getElementById('score').innerHTML = score

    e.target.remove()
}

function onClick(e) {
    var audio = new Audio('./click.wav');
    audio.play();

    score += Math.floor(emoji.indexOf(e.target.innerHTML) / 20) + 1
    document.getElementById('score').innerHTML = score
    setHighScore(score)
    e.target.remove()
}

// create a function to generate a random emoji
function createElement() {
    let newElem = document.createElement('div')
    newElem.classList.add('obj')

    newElem.style.left = Math.random() * 100 + 'vw'
    newElem.style.animationDuration = Math.random() * 3 + 10 + 's'

    newElem.innerHTML = emoji[Math.floor(Math.random() * emoji.length)]

    // newElem.innerHTML = '🐹';

    document.body.appendChild(newElem)
    
    newElem.addEventListener('click', onClick)
    newElem.addEventListener('animationend', onCollision)

    setTimeout(() => {
        newElem.remove()
    }, 15000)

}

let starter = document.getElementById('starter')

starter.addEventListener('click', () => {
    
    if (starter.innerHTML == 'Start') {
        starter.innerHTML = 'Stop'
        starter.classList.add('stop')
        starter.classList.remove('start')
        createElement()
        setInterval(() => {
            createElement()
        }, 300)
    } else {
        starter.innerHTML = 'Start'
        starter.classList.add('start')
        starter.classList.remove('stop')
        
        location.reload()
    }

})

