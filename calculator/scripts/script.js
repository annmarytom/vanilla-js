const time = document.getElementById('time');

setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    time.innerText = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}, 1000);


const themeButton = document.getElementById("toggle-btn");
themeButton.addEventListener('click', () => {
    darkmodeStatus = localStorage.getItem('darkmode');
    darkmodeStatus !== "active" ? enableDarkMode() : disableDarkMode();

})

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmodeStatus', null);
}

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmodeStatus', 'active');
}


const keys = document.querySelectorAll("button[data-key]");
const displayHistory = document.querySelector(".calc-display .calc-display-history");
const displayOutput = document.querySelector(" .calc-display .calc-display-value");

let userInput = "";

for (let key of keys) {
    const value = key.dataset.key;
    key.addEventListener("click", () => {
        console.log(value);
        console.log(displayOutput, "input");
        console.log(displayHistory, "history");

        if (value === "clear") {
            userInput = "";
            displayHistory.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if (value === "backspace") {
            userInput = userInput.slice(0, -1);
            displayOutput.innerHTML = userInput;
        } else if (value === "=") {
            try {
                const result = eval(userInput);
                displayHistory.innerHTML = userInput;
                displayOutput.innerHTML = result;
                userInput = result.toString();
            } catch {
                displayOutput.innerHTML = "Error";
            }
        } else {
            if (validateOperators(value)) {
                userInput += value;
                displayOutput.innerHTML = userInput;
            }
        }
    })
}

// function for preventing two operators in a row and multiple decimal points 

function validateOperators(value) {
    let operators = ["+", "-", "*", "/", "%"];
    let last_input_value = userInput.slice(-1);

    if (value == "." && last_input_value == ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(last_input_value)) {
            return false;
        }
        else {
            return true;
        }
    }
    return true;
}


