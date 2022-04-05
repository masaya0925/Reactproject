import express from 'express'
import { calculateBmi } from './bmiCalculator' // モジュールをimportする
const app = express()

app.get('/bmi', (req, res) =>{
  try {
    const height = Number(req.query.height) //クエリ文字列から身長を取得(Number型)
    const weight = Number(req.query.weight) //クエリ文字列から体重を取得(Number型)

    if(isNaN(height) || isNaN(weight)) {    //不正な値がないか確認
      throw new Error('malformatted parameters')  
    } 

    res.send({height, weight, bmi: calculateBmi(height, weight)}) //HTTPレスポンスを送信

  } catch (error){
      throw new Error(error.message)   
  }
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})