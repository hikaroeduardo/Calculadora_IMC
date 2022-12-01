const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

// Variáveis
const btnCalc = document.querySelector("#btn-calc");
const btnClear = document.querySelector("#btn-clear");
const btnRestart = document.querySelector("#restart-btn");
const btnModal = document.querySelector('.btn-modal');

const containerBtnAction = document.querySelector(".btn-action");
const containerBtnRestart = document.querySelector(".btn-restart");

const inputHeight = document.querySelector("#height");
const inputWeight = document.querySelector("#weight");

const table = document.querySelector(".table");

const titleSpan = document.querySelector(".result-title span");
const infoSpan = document.querySelector(".info span");

const backgroundModal = document.querySelector('.background-modal');
const divModal = document.querySelector('.modal');

// Funções
function createTable(data) {
  data.forEach((item) => {
    const divTableData = document.createElement('div');
    divTableData.classList.add('table-data');
  
    const imcData = document.createElement('p');
    imcData.innerText = item.classification;

    const classificationData = document.createElement('p');
    classificationData.innerText = item.info;

    const obesityData = document.createElement('p');
    obesityData.innerText = item.obesity;

    divTableData.appendChild(imcData);
    divTableData.appendChild(classificationData);
    divTableData.appendChild(obesityData);

    table.appendChild(divTableData);
  });
};

function clear() {
  inputHeight.value = "";
  inputWeight.value = "";
};

function calcImc() {
  const heightValue = inputHeight.value.replace(',', '.');
  const weightValue = inputWeight.value.replace(',', '.');

  const imc = (weightValue / (heightValue * heightValue)).toFixed(1);

  return imc;
};

function showOrHideBtn() {
  containerBtnAction.classList.toggle('hide');
  containerBtnRestart.classList.toggle('hide');
};

function clearTitleInfo() {
  infoSpan.className = "";
  infoSpan.innerText = "";
  titleSpan.innerText = "";
};

function disabledInput() {
  inputHeight.setAttribute('disabled', 'disabled');
  inputWeight.setAttribute('disabled', 'disabled');
};

function enabledInput() {
  inputHeight.disabled = false;
  inputWeight.disabled = false;
};

function initModal() {
  backgroundModal.classList.toggle('modal-hide');
  divModal.classList.toggle('modal-hide');
}

// Init
createTable(data);

// Eventos
btnClear.addEventListener('click', (e) => {
  e.preventDefault();

  clear();
});

btnCalc.addEventListener('click', (e) => {
  e.preventDefault();

  console.log(calcImc());
  const calc = calcImc();
  let info;

  data.forEach((item) => {
    if(calc >= item.min && calc <= item.max) {
      info = item.info
    };
  });
  
  titleSpan.innerText = calc;
  infoSpan.innerText = info;

  switch (info) {
    case "Magreza":
      infoSpan.classList.add('low');
      break;
    case "Normal":
      infoSpan.classList.add('good');
      break;
    case "Sobrepeso":
      infoSpan.classList.add('low');
      break;
    case "Obesidade":
      infoSpan.classList.add('medium');
      break
    case "Obesidade grave":
      infoSpan.classList.add('high');
      break;
  }

  if(inputHeight.value == "" || inputWeight.value == "") {
    initModal()
    clearTitleInfo();
    return
  };

  disabledInput();
  showOrHideBtn();
});

btnRestart.addEventListener('click', (e) => {
  e.preventDefault();

  clear();

  clearTitleInfo();

  showOrHideBtn();

  enabledInput();
});

btnModal.addEventListener('click', () => {
  initModal()
});