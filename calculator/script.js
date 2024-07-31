let display = document.getElementById('display');

function appendToDisplay(value) {
  if(display.textContent == 'Invalid' || display.textContent == 'Infinity') {
    display.textContent = '';
  }
  if((display.textContent == '' || display.textContent.match(/[×÷+-]$/g)) && value.match(/[×÷+-]/g)) return
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = '';
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}


function calculate() {
  if(display.textContent == 'Invalid' || display.textContent == 'Infinity') {
    clearDisplay();
  }
  try {
    display.textContent = display.textContent.replace(/[×÷+-]+$/g,'').replaceAll('×','*').replaceAll('÷','/');
    display.textContent = eval(display.textContent);
  } catch (error) {
    display.textContent = 'Invalid';
  }
}

document.addEventListener('keydown',e => {
  let display = '1234567890()-+/*'
  if(display.includes(e.key)) appendToDisplay(e.key);
  if(e.key == 'c' || e.key == 'C') clearDisplay();
  if(e.key == 'Backspace') backspace();
  if(e.key == '=' || e.key == 'Enter') calculate();
})