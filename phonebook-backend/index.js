require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
const Person = require('./models/person')

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
//custom formatを使ってHTTP POST request dataを追加 
app.use(morgan((tokens, request, response) => {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, 'content-length'), '-',
      tokens['response-time'](request, response), 'ms',
      JSON.stringify(request.body) //JSON文字列に変換
    ].join(' ')
  }))


app.get("/api/persons", (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
    const body = request.body
 // const sameName = persons.find(person => person.name === body.name)

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'The name or number is missing'
        })
    }
    /*
    if(sameName) {
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }
    */
    const person = new Person ({
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get("/info", (request, response) => {
  response.send(`
    <div>    
          <p>Phonebook has info for ${persons.length} people</p>
          <p>${new Date()}</p>
    </div>
     `);
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
