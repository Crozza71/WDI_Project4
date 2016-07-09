module.exports = {
  'port': process.env.PORT || 3000,
  'secret':process.env.JWT_SECRET || 'runbabyrun',
  'database': process.env.MONGODB_URL || 'mongodb://localhost:27017/marathonrunner'

};