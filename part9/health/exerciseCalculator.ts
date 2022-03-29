interface ResultObject {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}
interface RatingObject {
    rating: number
    ratingDescription: string
}
interface DaysHour {
    hour: Array<number>
    target:number
}

const parseExerciseArguments = (args: Array<string>): DaysHour => {
    if(args.length !== 10) {
         throw new Error('Not enough or too many arguments') //引数が足らないとErrorを投げる
    }

    const target = Number(args[2])
    const hour = args.slice(3).map(num => Number(num))  //targetの次の引数から新たな配列を作成

// console.log('target:',target,'hour:',hour)

    if(!isNaN(target) && hour.filter(num => isNaN(num)).length === 0){ //無効な値だったらError投げる 
        return {target, hour}
    } else {
        throw new Error('must be number')
    }
}

const averageRate = (daily: number, target: number): RatingObject => {
    const rate = daily / target

    if(rate < 0.5){
        return {rating: 1, ratingDescription: 'bad'}
    } else if(rate < 1.2) {
        return {rating: 2, ratingDescription: 'not too bad but could better'}
    } else if(rate < 1.5) {
        return {rating: 3, ratingDescription: 'good'}
    } else if(rate < 2) {
        return {rating: 4, ratingDescription: 'great'}
    } else if(rate >= 2.5) {
        return {rating: 5, ratingDescription: 'perfect'}
    } 
}

const calculateExercises = (args: Array<number>, target: number): ResultObject => {
    const periodLength = args.length
    const trainingDays = args.filter((days) => days !== 0).length
    const average = args.reduce((sum, hour) => sum + hour, 0) / args.length
    const success = average >= target
    const {rating, ratingDescription} = averageRate(average, target)
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}
const {target, hour} = parseExerciseArguments(process.argv)
console.log(calculateExercises(hour, target))