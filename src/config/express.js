import express from 'express'

const expressApp = express();

expressApp.use(express.json());

console.log('holaa');
// expressApp.use('')

export default expressApp;