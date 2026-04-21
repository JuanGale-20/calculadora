const displayProceso = document.getElementById("operacion-proceso");
const displayActual = document.getElementById("valor-actual");
const botones = document.querySelectorAll("button");

let num1 = "";
let op = "";
let num2 = "";
let esperandoSegundoNumero = false;

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        // Reiniciar (C)
        if (valor === "C") {
            num1 = ""; op = ""; num2 = "";
            esperandoSegundoNumero = false;
            displayActual.textContent = "0";
            displayProceso.textContent = "";
            return;
        }

        // Calcular (=)
        if (valor === "=") {
            if (num1 && op) {
                num2 = displayActual.textContent;
                try {
                    const resultado = eval(`${num1}${op}${num2}`);
                    displayProceso.textContent = `${num1} ${op} ${num2} =`;
                    displayActual.textContent = resultado;
                    // Preparamos para seguir operando con el resultado
                    num1 = resultado;
                    op = "";
                    esperandoSegundoNumero = false;
                } catch {
                    displayActual.textContent = "Error";
                }
            }
            return;
        }

        // Operadores
        if (boton.classList.contains("btn-op")) {
            num1 = displayActual.textContent;
            op = valor;
            displayProceso.textContent = `${num1} ${op}`;
            esperandoSegundoNumero = true;
            return;
        }

        // Números
        if (esperandoSegundoNumero) {
            displayActual.textContent = valor;
            esperandoSegundoNumero = false;
        } else {
            if (displayActual.textContent === "0" && valor !== ".") {
                displayActual.textContent = valor;
            } else {
                if (valor === "." && displayActual.textContent.includes(".")) return;
                displayActual.textContent += valor;
            }
        }
    });
});