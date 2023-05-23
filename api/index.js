const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const bcryptSalt = bcrypt.genSaltSync(8)
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = 'knhhkojijhjhoh9ug0u'
const imageDownloader = require('image-downloader')
const Place = require('./models/Place')
const multer = require('multer')
const fs = require('fs')
require('dotenv').config()
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cookieParser())
mongoose.connect(process.env.MONGOURL)

app.get('/test', (req, res) => {
  res.json('Test Ok')
})

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc)
  } catch (e) {
    res.status(422).json(e)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json(userDoc)
        },
      )
    } else {
      res.status(422).json('pass not ok')
    }
  } else {
    res.status(404).json('User not found')
  }
})

app.get('/profile', (req, res) => {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      const { name, email, _id } = await User.findById(userData.id)

      res.json({ name, email, _id })
    })
  } else {
    res.json(null)
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const { Link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: Link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.status(200).json(newName)
})

const photosMiddleware = multer({ dest: __dirname + '/uploads/' })

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = []

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i]

    const parts = originalname.split('.')

    const ext = parts[parts.length - 1]

    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads/', ''))
  }
  res.json(uploadedFiles)
})

app.post('/places', async (req, res) => {
  const { token } = req.cookies
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err

      const placeDoc = await Place.create({
        owner:userData.id,price,
        title,address,photos:addedPhotos,description,
        perks,extraInfo,checkIn,checkOut,maxGuests,
      });

      res.json(placeDoc) // move inside the callback
    })
  } else {
    res.status(401).json('Unauthorized')
  }
})

app.get('/places', async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json('Unauthorized')
  }
  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // const places = await Place.find({ owner: decodedToken.id })
      const { id } = userData
      const places = await Place.find({ owner: id })
      res.json(places)
    })
  } catch (err) {
    res.status(401).json('Unauthorized')
  }
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
  const { token } = req.cookies
  const {
    id,
    title,
    address,
    photos: addedPhotos,
    description,
    extrainfo,
    checkin,
    checkout,
    maxGuest,
    perks,
  } = req.body

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err
    const placeDoc = await Place.findById(id)

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        
        perks,
        extrainfo,
        checkin,
        checkout,
        maxGuest,
      })
      await placeDoc.save()
      res.json(placeDoc)
    }
  })
})


app.delete('/places/:id', async (req, res) => {
  const { id } = req.params
  await Place.findByIdAndDelete(id)
  res.json(true)
})

app.listen(4000, () => {
  console.log('Started in port ', 4000)
})
