import express from 'express';
import { calculateBmi } from './bmiCalculator'; // モジュールをimportする
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());
app.get('/bmi', (req, res) =>{
  try {
    const height = Number(req.query.height); //クエリ文字列から身長を取得(Number型)
    const weight = Number(req.query.weight); //クエリ文字列から体重を取得(Number型)

    if(isNaN(height) || isNaN(weight)) {    //不正な値がないか確認
      throw new Error('malformatted parameters');  
    } 

    res.send({height, weight, bmi: calculateBmi(height, weight)}); //HTTPレスポンスを送信

  } catch (error){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send({error: String(error.message)});   
  }
});

app.post('/exercise', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if(daily_exercises === undefined || target === undefined) { //undefinedじゃないか検証 
      throw new Error("parameter missing");
    }
    if(!Array.isArray(daily_exercises)) { // daily_exerciseが配列かどうか検証
      throw new Error("malformatted parameters");
    }
    const daily_exercises_num = daily_exercises.map(num => Number(num)); //Number型にした新しい配列を作成
    const target_num = Number(target);

    if(isNaN(target_num) || daily_exercises_num.filter(num => isNaN(num)).length !== 0) { //targetがNumberじゃないか配列daily_exercise_numの要素にNumber以外が入っていないか検証
      throw new Error("parameter missing");
    }
    res.json(calculateExercises(daily_exercises_num, target_num)); //JSONを送信
  } catch (error){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send({error: String(error.message)});
  }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});