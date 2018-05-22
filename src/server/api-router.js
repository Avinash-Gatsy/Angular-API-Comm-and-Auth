const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function apiRouter(database){
    const router = express.Router();

    router.get('/contacts', (req, res) => {
        const contactsCollection = database.collection('contacts');
        contactsCollection.find({}).toArray((err, docs) => {
          return res.json(docs);
        });
      });
      
    router.post('/contacts', (req, res) => {
        const user = req.body;
        const contactsCollection = database.collection('contacts');
        contactsCollection.insertOne(user, (err, r) => {
          if (err) {
            return res.status(500).json({ error: 'Error inserting new record.' });
          }
          const newRecord = r.ops[0];
          return res.status(201).json(newRecord);
        });
      });
    router.post('/authenticate', (req,res)=>{
      const user = req.body;
      const usersCollection = database.collection('users');
      usersCollection.findOne({username: user.username}, (err, result)=>{
        if(!result){
          return res.status(404).json({error: 'user not found'});
        }
        if(!bcrypt.compareSync(user.password, result.password)){
          // 401 status code - unauthorized
          return res.status(401).json({error: 'incorrect password'});
        }
        // if both username and password are correct then issue a JWT
        const payload = {
          username: result.username,
          admin: result.admin
        };
        // sign the payload. pass payload, jwt secret and expires as args in jwt.sign()
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h'});
        return res.json({
          message: 'successfuly authenticated',
          token: token
        });
      });
    });
      return router;
}
module.exports = apiRouter;