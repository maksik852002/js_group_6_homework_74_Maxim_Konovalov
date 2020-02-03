const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/' , (req, res) => {
  let arr = []
  let path = fs.readdirSync('./messages')
  if (path.length >=5) {
    path.reverse();
    for(let i = 0; i<5; i++) {
      arr.push(JSON.parse(fs.readFileSync(`./messages/${path[i]}`)))
    }
  } else {
    for(let i of path) {
      arr.push(JSON.parse(fs.readFileSync(`./messages/${i}`)))
    }
  }
  res.send(arr);
});

router.post('/' , (req, res) => {

    const datetime = new Date
    const filename = `./messages/${datetime.toISOString()}.json`;
    const messages = req.body
    messages.datetime = datetime
  
    const data = JSON.stringify(messages)
  
    fs.writeFile(filename, data, err => {
      err ? console.log(err) : console.log('File was saved');
    })
  
  res.send(messages);
});

module.exports = router;