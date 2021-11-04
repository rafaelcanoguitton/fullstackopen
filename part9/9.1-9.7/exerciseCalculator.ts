interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
const calculateExercises = (dailyExercises: Array<number>, target: number): Result => {
    const rating = Math.round(dailyExercises.reduce((acc, curr) => acc + curr) / dailyExercises.length);
    const ratingDescription = rating > target ? "good" : rating < target ? "bad" : "not too bad but could be better";
    const result: Result = {
        periodLength: dailyExercises.length,
        trainingDays: dailyExercises.filter(day => day > 0).length,
        success: dailyExercises.reduce((acc, curr) => acc + curr) / dailyExercises.length >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: dailyExercises.reduce((acc, curr) => acc + curr, 0) / dailyExercises.length
    }
    return result;
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));