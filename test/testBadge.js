const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const badge = require('../create-components-data/badge')

function renderFile (path, data) {
  return new Promise((reslove, reject) => {
    ejs.renderFile(path, data, (error, data) => {
      if (error) {
        reject(error)
      }
      reslove(data)
    })
  })
}

function writeFile (path, data) {
  return new Promise((reslove, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err)
      }
      reslove(null)
    })
  })
}

renderFile(path.join(__dirname, '../template/badge.txt'), badge).then(data => {
  return writeFile(path.join(__dirname, '../components/badge.vue'), data)
}).then(() => {
  console.log('创建成功')
}).catch(err => {
  console.log(err)
})
