interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface Exercise {
  dailyExercises: Array<number>;
  target: number;
}
const parseArguments2 = (args: Array<string>): Exercise => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const exercise: Exercise = {
    dailyExercises: [],
    target: 0,
  };
  if (!isNaN(Number(args[2]))) {
    exercise.target = Number(args[2]);
  } else {
    throw new Error("Provided values were not numbers!");
  }
  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      exercise.dailyExercises.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return exercise;
};

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): Result => {
  const rating = Math.round(
    dailyExercises.reduce((acc, curr) => acc + curr) / dailyExercises.length
  );
  const ratingDescription =
    rating > target
      ? "good"
      : rating < target
      ? "bad"
      : "not too bad but could be better";
  const result: Result = {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((day) => day > 0).length,
    success:
      dailyExercises.reduce((acc, curr) => acc + curr) /
        dailyExercises.length >=
      target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average:
      dailyExercises.reduce((acc, curr) => acc + curr, 0) /
      dailyExercises.length,
  };
  return result;
};
try {
  const { dailyExercises, target } = parseArguments2(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (e) {
  const error = e as Error;
  console.log("Something went wrong: ", error.message);
}
