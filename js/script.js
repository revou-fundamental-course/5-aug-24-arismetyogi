const genderInput = document.getElementsByName('gender');
let genderval = '';
for (let i = 0; i < genderInput.length; i++) {
    if (genderInput[i].checked) {
        genderval = genderInput[i];
    }
}
const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const ageInput = document.querySelector('#age');
const activityLevelInput = document.getElementById('activity-level');

const calculate = document.querySelector('.calculateBMI');
const reset = document.querySelector('.reset-form');
const resultside = document.querySelector('.form-result');
const resultDiv = document.querySelector('#result');

calculate.addEventListener('click', function(e) {
    e.preventDefault();
    // Get user input
    let gender = genderval;
    let weight = parseFloat(weightInput.value);
    let height = parseFloat(heightInput.value)/100;
    let age = parseInt(ageInput.value);
    let activityLevel = parseFloat(activityLevelInput.value);
    // Validate input
    if (height == '' || weight == '' || age == '') {
        alert("Please enter valid height and weight.");
        return;
    }
    // Calculate BMI
    const bmi = (weight / (height * height));
    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5; // height in cm
    } else {
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161; // height in cm
    }
    // Calculate TDEE
    const tdee = bmr * activityLevel;

    // Determine BMI category
    let category;
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }
    // Display result
    resultside.hidden=false;
    resultDiv.innerHTML =
        `
        <p>Your BMI: ${bmi.toFixed(2)}</p>
        <p>Category: ${category}</p>
        <p>Activity Level: ${document.getElementById('activity-level').selectedOptions[0].text}</p>
        <p>Estimated Daily Calory Needs: ${tdee.toFixed(2)} calories</p>
    `;
})

reset.addEventListener('click', function(){
    resultside.hidden=true;
})