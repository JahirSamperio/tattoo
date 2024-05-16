import express from 'express';
import homeRouter from './home.js'
import userRouter from './usuario.js'
import profileRouter from './profile-leccion.js'
import testRouter from './test.js'


const app = express();

app.use('/', homeRouter, userRouter)

app.use('/leccion', profileRouter)

app.use('/evaluacion', testRouter)

export default app;