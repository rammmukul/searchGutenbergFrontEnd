async function fetchBooks (q) {
  const url = 'http://localhost:9200/_search'

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: q
  }

  const res = await fetch(url, options)
  return res.json()
}
