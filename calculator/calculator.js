const calculator = document.querySelector(".calculator");
const keys       = calculator.querySelector(".calculator_keys");
const display    = document.querySelector(".calculator_display");

keys.addEventListener( "click", e => {
    if ( e.target.matches("button") ) {
        const key             = e.target;
        const action          = key.dataset.action;
        const keyConent       = key.textContent;
        const displayedNum    = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if ( ! action ) {
            if ( displayedNum === "0" || previousKeyType === "operator" ) {
                display.textContent = key.textContent;
            }
            else {
                display.textContent = displayedNum + key.textContent;
            }
            calculator.dataset.previousKeyType = "number";
        }

        else if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            key.classList.add("is-depressed");

            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.firstValue      = displayedNum;
            calculator.dataset.operator        = action;
        }

        else if ( action === "decimal" ) {
            if (previousKeyType === "operator") {
                display.textContent = "0.";
            }
            else if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            }

            calculator.dataset.previousKeyType = "decimal";
        }

        else if ( action === "clear" ) {
            if (key.textContent === "AC") {
                calculator.dataset.firstValue      = "";
                calculator.dataset.modValue        = "";
                calculator.dataset.operator        = "";
                calculator.dataset.previousKeyType = "";
            }
            else {
                key.textContent = "AC";
            }

            display.textContent                = 0;
            calculator.dataset.previousKeyType = "clear";
        }

        else if ( action === "calculate" ) {
            const firstValue  = calculator.dataset.firstValue;
            const operator    = calculator.dataset.operator;
            const secondValue = displayedNum;
            const calculate   = ( n1, operator, n2 ) => {
                let result = "";

                if (operator === "add") {
                    result = parseFloat(n1) + parseFloat(n2);
                }
                else if ( operator === "subtract" ) {
                    result = parseFloat(n1) - parseFloat(n2);
                }
                else if (operator === "multiply") {
                    result = parseFloat(n1) * parseFloat(n2);
                }
                else if (operator === "divide") {
                    result = parseFloat(n1) / parseFloat(n2);
                }

                return result;
            }

            display.textContent = calculate( firstValue, operator, secondValue );

            calculator.dataset.previousKeyType = "calculate";
        }

        Array.from( key.parentNode.children ).forEach( k => k.classList.remove("is-depressed") );
    }
} );
