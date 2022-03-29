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

const averageRate = (daily: number, target: number): RatingObject => {
    const rate = daily / target
    console.log(rate)
    
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

console.log(calculateExercises([2,3,0,4,1,0,5], 2))