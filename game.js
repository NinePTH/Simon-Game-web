let gamePattern = []

let userClickedPattern = []

let buttonColours = ["red", "blue", "green", "yellow"]

let started = false

let level = 0

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)

    let randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)

    level += 1

    $("h1").text(`Level ${level}`)

    userClickedPattern = []
}

$(".btn").click(function() {
    let userChosenColour = this.id
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name) {
    let sound = new Audio(`./sounds/${name}.mp3`)
    sound.play();
}

function animatePress(currentColour) {
    $(`.${currentColour}`).addClass("pressed")
    
    setTimeout(function() {
        $(`.${currentColour}`).removeClass("pressed")
    }, 100)
}

$('body').on("keypress", function() {
    if (started === false) {
        $("h1").text("Level 0")
        nextSequence()
        started = true;
    }
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    }
    else{
        console.log("wrong")

        let wrong = new Audio(`./sounds/wrong.mp3`)
        wrong.play();

        $('body').addClass("game-over")

        setTimeout(function() {
            $(`body`).removeClass("game-over")
        }, 200)
        
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}