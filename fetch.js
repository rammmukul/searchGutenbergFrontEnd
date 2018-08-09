async function fetchBooks (query) {
  const url = 'http://localhost:9200/_search'

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: query
  }

  const res = await fetch(url, options)
  return res.json()
}
