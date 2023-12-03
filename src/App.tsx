import './App.css'
import Field from './components/Field/Field'
import GameTable from './components/StatisticTable/GameTable'

function App() {
  return (
    <div className='app'>
      <Field />
      <GameTable />
    </div>
  )
}

export default App

export enum APIEndpoints {
  result = 'http://127.0.0.1:8000/result/'
}
