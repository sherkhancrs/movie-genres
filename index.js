const Joi = require('@hapi/joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  {
    id: 1,
    name: "Action"
  },
  {
    id: 2,
    name: "Adventure"
  },
  {
    id: 3,
    name: "Comedy"
  },
  {
    id: 4,
    name: "Crime"
  },
  {
    id: 5,
    name: "Drama"
  },
  {
    id: 6,
    name: "Fantasy"
  },
  {
    id: 7,
    name: "Historical"
  },
  {
    id: 8,
    name: "Horror"
  },
  {
    id: 9,
    name: "Romance"
  }
]
app.get('/api/genres', (req, res) => {
  res.send(genres);
})

app.get('/api/genres/:id', (req, res) => {
  genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`The Genre with ID ${req.params.id} is not found`);
  res.send(genre);
})

app.post('/api/genres', (req, res) => {
  const {value, error} = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {id: genres.length+1, name: value.name}
  genres.push(course);
  res.send(course)
})

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send(`The Genre with ID ${req.params.id} is not found`);

  const {value, error} = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  genre.name  = value.name;
  res.send(genre);
})

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find( g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`The Genre with ID ${req.params.id} is not found`);

  genres.splice(genres.indexOf(genre), 1);
  console.log(genres);

  for (let i = 0; i < genres.length; i++) {
    genres[i].id = i+1;
  }

  res.send(genre);
})

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required()
  })

  return schema.validate(genre);
}

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`app is listening to port ${port}`);
})