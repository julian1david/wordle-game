const keyboard = document.querySelector("#keyboard");
const grid = document.querySelector("#grid");

const keyboardsLetters = [
    ["q","w","e","r","t","y","u","i","o","p"],
    ["a","s","d","f","g","h","j","k","l",],
    ["enter","z","x","c","v","b","n","m","delete"]
]

const listElements = [];
let myAnswer = [];
const positions = [];
const secretWord= ["p","l","a","t","z","i"];

//HTML

const Button = (letter, method) => {
    const button = document.createElement('button');
    button.setAttribute('id', `${letter}`) 
    button.setAttribute('onclick', `${method}`)
    button.textContent = `${letter}`
    button.className = "Letter";

    return button;
} 



keyboardsLetters.map((letters) => {
    const list = document.createElement('ul');
    letters.map((letter) => {
        const listItem = document.createElement('li');
        switch(letter){
            case "enter":
                listItem.appendChild(Button(letter, 'checkWord()'));
                break
            case "delete":
                listItem.appendChild(Button(letter,'deleteLetter()'))
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
    const getbutton = event.target;
    if (myAnswer.length < 6 ){
        myAnswer.push(getbutton.id)
    }
    else{
        alert("yourd is completed")
    }
    console.log(myAnswer);
}

const checkWord = () => {
    if(myAnswer.length === 6) {
        if (myAnswer.join("") === secretWord.join("")){
            console.log("Hey ganaste");
        }else{
            for (let i = 0; i < 6; i++) {
                switch (true){
                    case myAnswer[i] === secretWord[i]:
                        positions.push('green');
                        break;
                    case secretWord.includes(myAnswer[i]):
                        positions.push('yellow');
                        break;
                    default:
                        positions.push('grey')
                }
                
            }
            console.log(positions);
        }
    }
    else{
        alert(`Your answer only have ${myAnswer.length}`)
    }
}

const deleteLetter = () => {
    //Delete the last elment
    if( myAnswer.length === 0 ){
        alert("Tu array ya esta vacio")
    }
    myAnswer.pop();
}

