const mongoose = require('mongoose')


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(
      'Connected to mongoose successfully!'
    )
    
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB