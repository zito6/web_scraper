require('dotenv').config();
require('express-async-errors');


const Scraper = require('./scraper/scraper')
const Offer = require('./models/offer')

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const searchesRouter = require('./routes/search');
const offersRouter = require('./routes/offer')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Searches API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/searches', authenticateUser, searchesRouter);
app.use('/api/v1/offers', authenticateUser, offersRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;


const Search = require('./models/Search');

async function startScraping_in_the_begining(req,res) {
  try {
    const searchObjects = await Search.find({ active: true }).exec();
    searchObjects.forEach((searchObject) => {
      console.log(searchObject._id)
      const link = searchObject.link
      const userId = searchObject.createdByUser
      const searchId = searchObject._id

      const varName = `scraper_${searchId}`
      global[varName]= new Scraper(link, searchId, userId)
      global[varName].startScraping(1)
    });
  } catch (err) {
    console.error(err);
  }
}

const start = async () => {
  try {
    startScraping_in_the_begining()
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
