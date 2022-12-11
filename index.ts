// Import
import './style.css';

import solutions from './Day09/index';

const solution1El = document.querySelector('#solution1 pre');
const solution2El = document.querySelector('#solution2 pre');

solution1El.textContent = String(solutions.solution1);
solution2El.textContent = String(solutions.solution2);
