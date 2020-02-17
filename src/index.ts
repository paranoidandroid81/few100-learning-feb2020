
import './styles.css';
import { add } from './math';

const num1Elem = document.getElementById('num1') as HTMLInputElement;
const num2Elem = document.getElementById('num2') as HTMLInputElement;
const addButton = document.getElementById('add') as HTMLButtonElement;
const answerElem = document.getElementById('answer') as HTMLElement;

addButton.addEventListener('click', () => {
    const a = num1Elem.valueAsNumber;
    const b = num2Elem.valueAsNumber;

    const sum = add(a, b);

    answerElem.innerText = sum.toString();
});
