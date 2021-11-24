import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    name: 'Arto Hellas',
    number: '090-1234-5678',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '080-2345-6789',
    id: 2
  },
  {
    name: 'Dan Abratov',
    number: '070-2356-1247',
    id: 3
  },
  {
    name: 'Lucy Evlabve',
    number: '080-9754-5387',
    id: 4
  }
]

ReactDOM.render(
    <App persons = {persons}/>,
  document.getElementById('root')
)
