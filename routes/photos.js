const express = require('express');

const router = express.Router();
const api = require('./api');
const Photo = require('../models/photo');

module.exports = (io) => {
  router.post('/', (req, res) => {
    const photo = new Photo();

    photo.image = 'data:image/png;base64';
    photo.image = req.body.toString('base64');

    io.emit('photo', photo);

    photo.data.data = req.body;

    photo.save().then((data) => {
      const { faceId } = data[0];
      photo.faceId = faceId;
      Photo.find({}).then((photos) => {
        const ids = photos.map((photo) => photo.faceId);
      });
      api.identify(faceId, ids, (err, statusCode, body) => {
        if (err || statusCode !== 200) {
          res.status(400).send({ 'identity error': err, body });
        } else {
          const matchIds = body.map((match) => match.faceId);

          Photo.find({ faceId: { $in: matchIds } }, (matches) => {
            if (err || !matches) return res.send('No matches');
            const names = matches.filter((match) => match.name);
            if (names[0]) {
              const { name } = names[0];
              matches.forEach((match) => {
                // eslint-disable-next-line no-param-reassign
                match.name = name;
                match.save();
              });
              io.emit(name);
              res.send({ name });
            } else {
              res.send({ name: 'unknown' });
            }
            return res.json({ matches });
          });
        }
      });
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });
  });
};
