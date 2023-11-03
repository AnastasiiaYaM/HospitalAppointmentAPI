const db = require('../models');
const Auth = db.auth;
const crypto = require('crypto');
const Validator = require('validator');

function createDigest(encodedData, format) {
  return crypto
    .createHmac('sha256', process.env.TOKEN_SECRET)
    .update(encodedData)
    .digest(format);
}

function encode(sourceData) {
  const json = JSON.stringify(sourceData);
  const encodedData = Buffer.from(json).toString('base64');
  return `${encodedData}!${createDigest(encodedData, 'base64')}`;
}

function decode(value) {
  let [encodedData, sourceDigest] = value.split('!');
  if (!encodedData || !sourceDigest) throw new Error('invalid value');
  const json = Buffer.from(encodedData, 'base64').toString('utf8');
  const decodedData = JSON.parse(json);
  const checkDigest = createDigest(encodedData);
  const digestsEqual = crypto.timingSafeEqual(
    Buffer.from(sourceDigest, 'base64'),
    checkDigest
  );
  if (!digestsEqual) throw new Error('invalid value');
  return decodedData;
}

/*
const data = { name: 'password' };
const encoded = encode(data);
const decoded = decode(encoded);

console.log('original data', data);
console.log('encoded as', encoded);
console.log('encoded size', Buffer.byteLength(encoded, 'utf8'));
console.log('decoded as', decoded);
*/




/*
//REGISTER
exports.register = (req, res) => {
  const {  email, password} = req.body; // TypeError [ERR_INVALID_ARG_TYPE]: The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined at new NodeError (node:internal/errors:399:5)
  (encode(password)).then((result) => {  // 500Internal Server Error
    Auth.create({
      email: email,
      password: result,
    }).then(() => {
        res.json("USER REGISTERED");
    }).catch(error =>{res.send(error.name)});
  });
}
*/
exports.register = (req, res) => {
  const {  email, password } = req.body;
  Auth.create({
      email: email,
      password: password
  }).then(()=>{
      Auth.findByPk(id).then(data => {
          res.status(200).send({
              message: 'Successfully created User registration',
              auth: data
              });
          });
  }).catch(error =>{res.send(error.name)});
}


/* ??? 
throw new Error(`WHERE parameter "${key}" has invalid "undefined" value`);
           Error: WHERE parameter "email" has invalid "undefined" value
//LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const auth = await Auth.findOne({ where: { email: email }} );
  if (!auth) res.status(400).json({ error: "You have not register yet" });

  const userPassword = decode(auth.password);

  if (userPassword !== password) {
      res
      .status(400)
      .json({ error: "Wrong Email and Password Combination!" });
  } else {
      res
      .status(200)
      .json("Succesfully logged in!");
  }
}
*/
// check registration
exports.login = (req, res) => {
  let error = null;
  let id = req.params.id || null;

  if (!id) error = "Invalid request.";
  else if (Validator.isEmpty(id)) error = "Invalid request.";
  else if (!Validator.isInt(id)) error = "Value must be integer.";
  else if (id <= 0) error = "Invalid value.";

  if (error) res.status(400).json({ success: false, error: error, data: {} });

  Auth.findByPk(id).then(data => {
      if (data)
      res.status(200).send({
          message: 'You have already registered',
          user: id
      });
  }).catch(error =>{res.send(error.name)});
}