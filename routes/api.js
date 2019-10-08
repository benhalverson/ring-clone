const request = require('request');

const apiKey = '';

module.exports.postUrl = (url, cb) => {
  const options = {
    method: 'POST',
    url: '',
    // url: 'https://api.projectoxford.ai/face/v0/detections?analyzesAge=true&analyzesGender=true&analyzesHeadPose=true',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': apiKey,
    },
    json: { url },
  };

  request(options, (err, response, faces) => {
    if (!err && response.statusCode === 200) {
      cb(null, 200, faces);
    } else {
      cb(err, response.statusCode);
    }
  });
};

module.exports.uploadFile = (data, cb) => {
  const options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/detections',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': apiKey,
    },
    body: data,
  };

  request(options, (err, response, faces) => {
    if (!err && response.statusCode === 200) {
      cb(null, 200, JSON.parse(faces));
    } else {
      cb(err, response.statusCode);
    }
  });
};

module.exports.identify = (faceId, faceIds, cb) => {
  const options = {
    method: 'POST',
    url: 'https://api.projectoxford.ai/face/v0/findsimilars',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': apiKey,
    },
    json: {
      faceId,
      faceIds,
    },
  };

  request(options, (err, response, faces) => {
    if (!err && response.statusCode === 200) {
      cb(null, 200, faces);
    } else {
      cb(err, response.statusCode);
    }
  });
};
