const express = require('express');
const MoviesService = require('../services/movies');
const buildMessage = require('../utils/buildMessage');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');
const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // GET all the movies
  router.get('/', async function (req, res, next) {
    const {
      tags
    } = req.query;

    try {
      const movies = await moviesService.getMovies({
        tags
      });

      res.status(200).json({
        data: movies,
        message: buildMessage('movie', 'list')
      });
    } catch (error) {
      next(error);
    }
  });

  // GET a movie by id
  router.get('/:movieId', validationHandler({
    movieId: movieIdSchema
  }, 'params'), async function (req, res, next) {
    const {
      movieId
    } = req.params;

    try {
      const movie = await moviesService.getMovie({
        movieId
      });

      res.status(200).json({
        data: movie,
        message: buildMessage('movie', 'retreive')
      });
    } catch (error) {
      next(error);
    }
  });

  // CREATE a new movie
  router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
    const {
      body: movie
    } = req;

    try {
      const createdMovieId = await moviesService.createMovie({
        movie
      });

      console.log(createdMovieId);

      res.status(201).json({
        data: createdMovieId,
        message: buildMessage('movie', 'create')
      });
    } catch (error) {
      next(error);
    }
  });

  // EDIT an exist movie
  router.put('/:movieId', validationHandler({
    movieId: movieIdSchema
  }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
    const {
      movieId
    } = req.params;
    const {
      body: movie
    } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie
      });

      res.status(200).json({
        data: updatedMovieId,
        message: buildMessage('movie', 'update')
      });
    } catch (error) {
      next(error);
    }
  });

  // EDELETE a movie
  router.delete('/:movieId', validationHandler({
    movieId: movieIdSchema
  }, 'params'), async function (req, res, next) {
    const {
      movieId
    } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({
        movieId
      });

      res.status(200).json({
        data: deletedMovieId,
        message: buildMessage('movie', 'delete')
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApi;