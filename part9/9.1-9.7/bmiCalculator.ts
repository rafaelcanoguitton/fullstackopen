const calculateBmi = (height: number, weight: number): string => {
    const convertedHeight = height / 100;
    const bmi = weight / (convertedHeight * convertedHeight);
    if (bmi < 18.5) {
        return "Underweight (unhealthy weight)";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight (unhealthy weight)";
    } else {
        return "Obese (unhealthy weight)";
    }
}
console.log(calculateBmi(180, 74));