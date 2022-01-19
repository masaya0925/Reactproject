const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(express.json())
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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/api/persons", (request, response) => {
  response.json(persons)
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

const generateId = () => {
    const ranId = Math.floor(Math.random() * (1000 - 1)) + 1
    return ranId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const sameName = persons.find(person => person.name === body.name)

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'The name or number is missing'
        })
    }

    if(sameName) {
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    //console.log(person);
    response.json(person)
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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
