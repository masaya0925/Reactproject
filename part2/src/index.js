import ReactDOM from 'react-dom'
import App from './App'


const notes = [
  {
    id:1,
    content: 'HTML is easy',
    date:'2021-10-28T15:00:00.000Z',
    important: true
  },
  {
    id:2,
    content: 'Browser can execute only JavaScript',
    date:'2021-10-28T15:30:00.500Z',
    important: false
  },
  {
    id:3,
    content: 'GET and POST are most important methods of HTTP protocol',
    date:'2021-10-28T16:40:00.200Z',
    important: true
  }
]

ReactDOM.render(
    <App notes = {notes} />,
  document.getElementById('root')
)
