const express = require("express");
const router = express.Router();

const Project = require('../models/project')
// Display the dashboard page
router.get("/", (req, res) => {
  Project.find({}, { username: true }).exec((err, projects) => {
    res.render('dashboard', { projects });
  });

});

router.get('/:id', (req, res, next) => {
  Project.findOne({ _id: req.params.id }).exec((err, project) => {
    console.log(project)
    res.render('project', { project });
  });
});

router.post('/:id', (req, res, next) => {
  Project.findByIdAndUpdate(req.params.id, { body: req.body.body }, (err, post) => {
    let Pusher = require('pusher');
    let pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER
    });

    pusher.trigger('notifications', 'post_updated', post, req.headers['x-socket-id']);
    res.send('');
  });
});

module.exports = router;