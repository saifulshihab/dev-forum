import cors from 'cors';
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://devforum.netlify.app'];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export const corsWithOptions = cors(corsOptionsDelegate);
