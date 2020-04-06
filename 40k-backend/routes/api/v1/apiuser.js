const express = require('express');
const router = express.Router();
const db = require('../../../db/mongoose')
const bcrypt = require('bcrypt')
const { makeToken, verifyToken } = require('../../../bin/jwt')
const passport = require('passport')

//routes 
router.get('/auth/googlelogin',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

//stopped after getting the routes "1:45pm ish didnt get any of the front end stuff"
//need to add make token to google login
router.get('/auth/googlecallback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {

    // google returns an array of emails, use the first one
    makeToken({ email: req.user.emails[0].value })
      .then(token => {
        res.redirect(`https://warhammer-40k.herokuapp.com/login?token=${token}`);
      })
      .catch(error => {

        console.log(error)
        res.status(500)

      })
  })

router.post('/auth/verifytoken', verifyToken, function (req, res, next) {

  console.log("VERIFY TOKEN", req.email)
  db.findByEmail({ email: req.email })
    .then((user) => {

      console.log("USER",user)
      makeToken(user)
        .then(token => {
          console.log("TOKEN-VERIFY")
          console.log(token)
          res.json({ token })

        })

    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
})

router.get('/:id', function (req, res, next) {
  let readObj = {
    id: req.params.id,
    usersCollection: req.app.locals.usersCollection
  }

  db.readOne(readObj)
    .then(response => {
      console.log(response.fullName())
      res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })

});

//create user

router.post('/signup', async function (req, res, next) {


  let newUser = { ...req.body }
  delete newUser.password
  let passwordHash = await bcrypt.hash(req.body.password, 13)


  newUser.passwordHash = passwordHash
  console.log({ newUser })

  let createObj = {
    doc: newUser,
    usersCollection: req.app.locals.usersCollection
  }

  db.create(createObj)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

//login 
router.post('/login', async function (req, res, next) {
  console.log("helpme", req.body.email)
  //ToDO 
  let emailObj = { email: req.body.email }
  db.findByEmail(emailObj)
    .then(user => {

      if (bcrypt.compare(req.body.password, user.passwordHash)) {
        console.log("login worked", user)
        makeToken(user)
          .then(token => {
            res.json({ token })
          })
      } else {
        throw new Error("text")
      }
    })
    .catch(error => {
      console.log(error)
      res.json(error)

    })


})


router.put('/:id', function (req, res, next) {
  let putObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }

  db.readOne(putObj)
    .then(response => {
      if (response == null) {
        db.create(putObj).then(response => {
          res.json(response)
        })
      } else {
        db.replace(putObj)
          .then(response => {
            res.json(response)
          })
      }
      // res.json(response)
    })
    .catch(error => {
      res.status(500).json(error)
    })

});


//end of patch

router.delete('/:id', function (req, res, next) {
  let deleteObj = {
    id: req.params.id,
    usersCollection: req.app.locals.usersCollection
  }

  db.del(deleteObj)
    .then(response => {
      if (response.deletedCount == 1) {
        res.json({})
      }
      throw new Error("not found")
    })
    .catch(error => {
      console.log()
      res.status(500).json(error)

    })

})
//end of delete
router.patch('/:id', async function (req, res, next) {
  let patchObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }
  try {
    let response = await db.readOne(patchObj)
    if (response == null) {
      throw new Error('not found')
    } else {
      await db.update(patchObj)
      res.json(await db.readOne(patchObj))
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});



router.get('/', function (req, res, next) {
  let readObj = {
    usersCollection: req.app.locals.usersCollection
  }
  db.readAll(readObj)
    .then(response => {
      res.json(response)
    })

})
module.exports = router

