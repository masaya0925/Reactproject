interface Bmivalue { // height weight はnumber型であると定義している
    height: number
    weight: number
}

const parseBmiArguments = (args: Array<string>): Bmivalue => {
    if(args.length !== 4) throw new Error('Value is incorrect. Need two values for height and weight.') //height weightが足らないとErrorを投げる

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {   //引数がnumberか確認 true => height weight それぞれに値を入れる, それ以外だったらError投げる
        return{
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('provided values were not numbers!') 
    }
    
    
}

 export const calculateBmi = (height: number, weight: number): string => {
    if(height <= 0 || weight <= 0) {
        throw new Error('Negative values are invalid')  
    }
    const bmi: number = weight / (height / 100) ** 2 //BMIに応じて文字列を返す
    if(bmi < 18.5){
       return 'Thinness(under weight)'
    } else if(bmi < 25) {
       return 'Normal(healthy weight)' 
    } else {
       return 'Overweight(Obese)'
    }
}

try {
    const {height, weight} = parseBmiArguments(process.argv)
    console.log(calculateBmi(height, weight))         
} catch (error) {
    console.log('Something when wrong, Error is:', error.message)  
}