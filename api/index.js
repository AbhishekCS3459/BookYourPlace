const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(8);
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = "knhhkojijhjhoh9ug0u";
const imageDownloader = require("image-downloader");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const multer = require("multer");
const fs = require("fs");
const { log } = require("console");
const port = process.env.PORT || 4000;
require("dotenv").config();
app.use(express.json());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://book-your-place-azure.vercel.app",
      // Add more allowed origins here if needed
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the CORS policy
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log("error:", err));

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) reject(err);
      resolve(userData);
    });
  });
}

app.get("/test", (req, res) => {
  res.json("Test Ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);

      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
  res.end();
  // end the response so that no other middleware is called after this one!
});

app.post("/upload-by-link", async (req, res) => {
  const { Link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: Link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.status(200).json(newName);
});

const photosMiddleware = multer({ dest: __dirname + "/uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];

    const parts = originalname.split(".");

    const ext = parts[parts.length - 1];

    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
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
  } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const placeDoc = await Place.create({
        owner: userData.id,
        price,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });

      res.json(placeDoc); // move inside the callback
    });
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      // const places = await Place.find({ owner: decodedToken.id })
      const { id } = userData;
      const places = await Place.find({ owner: id });
      res.json(places);
    });
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});
app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    try {
      const placeDoc = await Place.findById(id);
      console.log(placeDoc.owner.toString() === userData.id);
      if (userData.id === placeDoc.owner.toString()) {
        const updatedPlaceData = {
          title: title || placeDoc.title,
          address: address || placeDoc.address,
          photos: addedPhotos
            ? [...placeDoc.photos, ...addedPhotos]
            : placeDoc.photos,
          description: description || placeDoc.description,
          perks: perks || placeDoc.perks,
          extraInfo: extraInfo || placeDoc.extraInfo,
          checkIn: checkIn || placeDoc.checkIn,
          checkOut: checkOut || placeDoc.checkOut,
          maxGuests: maxGuests || placeDoc.maxGuests,
          price: price || placeDoc.price,
        };

        placeDoc.set(updatedPlaceData);
        await placeDoc.save();
        res.json("ok");
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the place." });
    }
  });
});

app.delete("/places/:id", async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.json(true);
});

//routes for index page
app.get("/places", async (req, res) => {
  res.json(await Place.find({}));
});
// routes for places page
app.get("/myplaces", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    try {
      const places = await Place.find({ owner: userData.id });
      res.json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Not a Valid User" });
    }
  });
});

//Place page form booking
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    address,
  } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
    address,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    if (!userData) {
      return res.status(401).json("Unauthorized");
    }

    const bookings = await Booking.find({ user: userData.id }).populate(
      "place"
    );
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Started in port ", port);
});
