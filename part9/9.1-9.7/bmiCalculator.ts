interface BmiValues {
  height: number;
  weight: number;
}
const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
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
};
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  const error = e as Error;
  console.log("Error, something went wrong, message: ", error.message);
}
export default calculateBmi;
