const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
let expression = "";

// Add event listeners to buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;

    if (val === "=") {
      try {
        expression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/\^/g, "**");
        display.textContent = eval(expression);
        expression = display.textContent;
      } catch {
        display.textContent = "Error";
        expression = "";
      }
    } else if (val === "⌫") {
      expression = expression.slice(0, -1);
      display.textContent = expression || "0";
    } else {
      expression += val;
      display.textContent = expression;
    }
  });
});

// Initialize display
display.textContent = "0";

// Add keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Enter") {
    buttons.forEach((btn) => {
      if (btn.textContent === "=") btn.click();
    });
  } else if (key === "Backspace") {
    buttons.forEach((btn) => {
      if (btn.textContent === "⌫") btn.click();
    });
  } else if ("0123456789+-*/^".includes(key)) {
    expression += key.replace("*", "×").replace("/", "÷").replace("**", "^");
    display.textContent = expression;
  }
});
