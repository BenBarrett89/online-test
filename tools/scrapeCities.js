const axios = require('axios')
const fs = require('fs')
const path = require('path')

const instance = axios.create({
  baseURL: 'https://bpdts-test-app.herokuapp.com'
})

const run = async () => {
  const array = []
  for (let i = 0; i < 1000; i++) {
    array.push(await instance.get(`/user/${i + 1}`))
  }
  await Promise.all(array)
  const cities = array
    .map(response => response.data.city)
    .reduce((all, city) => {
      return all.includes(city) ? all : all.concat(city)
    }, [])
    .sort()
  await fs.writeFileSync(
    path.join(__dirname, 'cities.json'),
    JSON.stringify({ cities }),
    { encoding: 'utf-8' }
  )
}

run()
