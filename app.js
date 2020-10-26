const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = 'ad4e15c131a99c99191358610ac09b82'

const getData = async (baseURL, zip, country, apiKey) => {
  const req = await fetch(baseURL + `?zip=${zip},${country}&units=metric&appid=` + apiKey)
  try {
    const data = await req.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
}

document.getElementById('generate').addEventListener('click', action)

function action() {
  const newZip = document.getElementById('zip').value
  const newCountry = document.getElementById('country').value
  getData(baseURL, newZip, newCountry, apiKey).then(
    function (data) {
      const allData = {
        temperature: data.main.temp,
        date: new Date().toISOString().slice(0, 10),
        user_response: document.getElementById('feeling').value
      }
      postData('http://localhost:8000/', allData).then(updateData)
    }
  )
}

const postData = async (path, data = {}) => {
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  try {
    const newData = await res.json()
    return newData
  } catch (error) {
    console.log('error', error)
  }
}

const updateData = async () => {
  const req = await fetch('http://localhost:8000/')
  try {
    const allData = await req.json()
    console.log(allData)
    document.getElementById('temp').innerHTML = allData.temperature
    document.getElementById('date').innerHTML = allData.date
    document.getElementById('content').innerHTML = allData.user_response
  } catch (error) {
    console.log('error', error)
  }
}
updateData()