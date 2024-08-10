function calculateBMI() {
  // Get user input
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const age = parseFloat(document.getElementById('age').value);
  const gender = parseFloat(document.getElementById('gender').value);
  const activityLevel = parseFloat(document.getElementById('activity-level').value);
  console.log(height);
  // Validate input
  if (isNaN(height) || isNaN(weight) || isNaN(age) || height <= 0 || weight <= 0 || age <= 0) {
      alert("Please enter valid height and weight.");
      return;
  }
  
  // Calculate BMI
  const bmi = weight / (height * height);
  
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
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <p>Your BMI: ${bmi.toFixed(2)}</p>
      <p>Category: ${category}</p>
      <p>Activity Level: ${document.getElementById('activity-level').selectedOptions[0].text}</p>
      <p>Estimated Daily Calory Needs: ${tdee.toFixed(2)} calories</p>
  `;
}
