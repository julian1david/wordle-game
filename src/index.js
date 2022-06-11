const keyboard = document.querySelector("#keyboard");
const grid = document.querySelector("#grid");
const resetButton = document.querySelector('#reset');

const keyboardsLetters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l",],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"]
]

const listElements = [];
const secretWord = [
    ["p", "l", "a", "t", "z", "i"],
    ["p", "l", "a", "t", "z", "i"],
    ["p", "l", "a", "t", "z", "i"],
    ["p", "l", "a", "t", "z", "i"],
];

let positions = [];
let myAnswer = [];
let attempts = 0;

//HTML

const Button = (letter, method) => {
    const button = document.createElement('button');
    button.setAttribute('id', `${letter}`)
    button.setAttribute('onclick', `${method}`)
    button.textContent = `${letter}`
    button.className = "Letter";

    return button;
}


const Board = () => {

    const rows = [];

    for (let row = 0; row < 5; row++) {
        const list = document.createElement('ul');
        list.classList.add('board');
        for (let column = 0; column < 6; column++) {
            const listItem = document.createElement('li');
            listItem.classList.add('board__item');
            //identfy by column and row
            listItem.id = `${row}-${column}`
            list.appendChild(listItem);
        }
        rows.push(list);
    }

    grid.append(...rows);

    return grid;
}


keyboardsLetters.map((letters) => {
    const list = document.createElement('ul');
    letters.map((letter) => {
        const listItem = document.createElement('li');
        switch (letter) {
            case "enter":
                listItem.appendChild(Button(letter, 'checkWord()'));
                break
            case "delete":
                listItem.appendChild(Button(letter, 'deleteLetter()'))
                break
            default:
                listItem.appendChild(Button(letter, 'pressLetter()'));
        }
        list.appendChild(listItem);
    })
    listElements.push(list);
});

keyboard.append(...listElements);

// Functions

const pressLetter = () => {

    const getButton = event.target;
    if (myAnswer.length < 6) {
        const currentItem = document.getElementById(`${attempts}-${myAnswer.length}`);
        currentItem.textContent = getButton.textContent;
        myAnswer.push(getButton.id);
    }
    else {
        alert("yourd is completed")
    }
}

const checkWord = () => {

    switch (true) {
        case myAnswer.length === 6:
            attempts++
            for (let i = 0; i < 6; i++) {
                switch (true) {
                    case myAnswer[i] === secretWord[i]:
                        positions.push('green');
                        break;
                    case secretWord.includes(myAnswer[i]):
                        positions.push('yellow');
                        break;
                    default:
                        positions.push('grey');
                }
            }
            positions.map((color, id) => {
                //Use -1 because 
                const item = document.getElementById(`${attempts - 1}-${id}`);
                item.classList.add(color)
            });
            myAnswer = [];
            positions = [];
            break
        case attempts === 5:
            alert('Ya no tienes intentos');
            break
        case positions.every(position => position === 'green'):
            alert('Completaste el game');
            break
        default:
            alert(`Your answer only have ${myAnswer.length}`)
    }
}

const deleteLetter = () => {
    //Delete the last elment
    if (myAnswer.length === 0) {
        alert("Tu array ya esta vacio")
    }
    const item = document.getElementById(`${attempts}-${myAnswer.length - 1}`);
    item.textContent = ""
    myAnswer.pop();
}

const reset = () => {
    event.target.disabled = true;
    for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 6; column++) {
            const item = document.getElementById(`${row}-${column}`);
            item.textContent = "";
            item.classList.remove("green");
            item.classList.remove("marron");
            item.classList.remove("gray");
        }
    }
    attempts = 0;
};

Board();

resetButton.addEventListener('click', reset);
