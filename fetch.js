function fetchBooks (q) {
  const url = 'http://localhost:9200/_search'

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: q
  }

  fetch(url, options).then(res => res.json()).then(console.log).catch(console.error)
}
