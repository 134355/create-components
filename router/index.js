const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

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

// 徽章组件
router.post('/badge', (req, res) => {
  renderFile(path.join(__dirname, '../template/badge.txt'), req.body).then(data => {
    return writeFile(path.join(__dirname, '../components/badge.vue'), data)
  }).then(() => {
    res.send({code: 0, msg: '创建成功'})
  }).catch(err => {
    console.log(err)
    res.send({code: 1, msg: '创建失败'})
  })
})

module.exports = router
