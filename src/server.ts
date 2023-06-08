import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connected Successfully`)

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('Failed to connect db', error)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
bootstrap()
