
const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height / 100) ** 2
    if(bmi < 18.5){
       return 'Thinness(under weight)'
    } else if(bmi < 25) {
       return 'Normal(healthy weight)' 
    } else {
       return 'Overweight(Obese)'
    }
}

try {
   console.log(calculateBmi(170, 48))
} catch (error) {
    console.log('Something when wrong, Error is:', error.message)  
}