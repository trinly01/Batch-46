import store from 'src/store/store.js'
import wings from 'wings4'

const app = wings('http://localhost:3030')

app.on('login', (user) => {
  console.log('Logged in', user)
  store.user = user.user
})

app.authenticate()

app.on('logout', (user) => {
  store.user = null

  store.todos = []
})

export default app
