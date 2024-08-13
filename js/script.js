
function getGender() {
    const genderInput = document.getElementsByName('gender');
    let genderval = null;
    for (let i = 0; i < genderInput.length; i++) {
        if (genderInput[i].checked) {
            genderval = genderInput[i].value
        }
    }
    
    return genderval;
}
const weightInput = document.querySelector('#weight');
const heightInput = document.querySelector('#height');
const ageInput = document.querySelector('#age');
const activityLevelInput = document.querySelector('#activity-level');

const calculate = document.querySelector('.calculateBMI');
const reset = document.querySelector('.reset-form');
const resultside = document.querySelector('.form-result');
const resultDiv = document.querySelector('#result');

calculate.addEventListener('click', function(e) {
    e.preventDefault();
    // Get user input
    let gender = getGender();
    let weight = parseFloat(weightInput.value);
    let height = parseFloat(heightInput.value)/100;
    let age = parseInt(ageInput.value);
    let activityLevel = parseFloat(activityLevelInput.value);
    // Validate input
    if (!height || !weight || !age ) {
        alert("Please enter valid height, weight and age.")        
        return;
    }
    // Calculate BMI
    const bmi = (weight / (height * height));
    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5; // height in cm
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161; // height in cm
    }
    // Calculate TDEE
    const tdee = bmr * activityLevel;

    // Determine BMI category
    let category;
    let color;
    let suggestion;
    if (bmi < 18.5) {
        category = "Underweight (BMI < 18.5)";
        color = "#e95";
        suggestion = "Consult a healthcare provider. Focus on a nutrient-rich, high-calorie diet. Include regular strength training. Eat small, frequent meals to increase calorie intake.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal Weight (BMI 18.5–24.9)";
        color = "#2a9d8f";
        suggestion = "Maintain a balanced diet and regular physical activity. Monitor weight periodically and prioritize mental well-being. Schedule regular health check-ups.";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight (BMI 25–29.9)";
        color = "#f4a261";
        suggestion = "Adopt a healthy, balanced diet with portion control. Increase physical activity. Aim for gradual weight loss through sustainable lifestyle changes. Seek personalized advice from a healthcare professional.";
    } else {
        category = "Obese (BMI ≥ 30)";
        color = "#e76f51";
        suggestion = "Develop a comprehensive weight loss plan with a healthcare provider. Focus on a nutritious, calorie-controlled diet and regular exercise. Consider behavioral changes and possibly medical interventions. Monitor progress and seek support.";
    }


    // Display result
    resultside.hidden=false;
    resultDiv.innerHTML =
        `
        <p class="bmi" style="color: ${color}; text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);">Your BMI is<br> ${bmi.toFixed(2)}</p>
        <p class="category" style="color: ${color}; text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);">${category}</p>
        <p class="activity-level">Activity Level: ${document.getElementById('activity-level').selectedOptions[0].text}</p>
        <p class="activity-level">Estimated Daily Calory Needs: ${tdee.toFixed(2)} calories</p>
        <article class="advice">
            <h3 style="margin-bottom=.75rem;">Advice</h3>
            <p>${suggestion}</p>
        </article>
    `;
})

reset.addEventListener('click', function(){
    resultside.hidden=true;
})