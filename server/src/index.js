import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import passport from 'passport';
import all_routes from 'express-list-endpoints';
import cors from 'cors';


import routes from './routes';
import { seedDb } from './utils/seed';

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./services/jwtStrategy');
require('./services/localStrategy');
let corsOption = {
  origin: 'http://localhost:3000', // 허락하는 요청 주소
  credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
} 

app.use(cors(corsOption)); // CORS 미들웨어 추가


const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
    seedDb();
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
app.use('/public/images', express.static(join(__dirname, '../public/images')));

// Serve static assets if in production
if (isProduction) {
  // Set static folder
  // nginx will handle this
  // app.use(express.static(join(__dirname, '../../client/build')));

  // app.get('*', (req, res) => {
  //   // index is in /server/src so 2 folders up
  //   res.sendFile(resolve(__dirname, '../..', 'client', 'build', 'index.html')); 
  // });

  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 4000;
  // const httpsOptions = {
  //   key: readFileSync(resolve(__dirname, '../security/cert.key')),
  //   cert: readFileSync(resolve(__dirname, '../security/cert.pem')),
  // };

  const server = http.createServer(app).listen(port, () => {
    console.log('https server running at ' + port);
    // console.log(all_routes(app));
  });
}
