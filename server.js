import webpack from 'webpack'
import config from './webpack.config.babel'
import express from 'express'
import { join } from 'path'


let app = express()
let compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.sendFile(join(__dirname, 'src/index.html'))
})

app.listen(8080, function(err) {
  if (err) return console.log(err)

  console.log('Server running on port: 8080')
})