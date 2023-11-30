const bcrypt = require('bcrypt');
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'ilicayds',
  dataset: 'production',
  apiVersion: '2023-11-29', // The API version you are using
  useCdn: false, // Set to true if you want to enable the Content Delivery Network (CDN)
});

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
const { postData } = require('../routes/api/sanity');

/**
 * Handles the login request.
 * @param req - The request object.
 * @param res - The response object.
 */
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("User 1:" + email);
  console.log("Password 1 :" + password);
  if (!email || !password)
    return res.status(400).json({ 'message': 'Username and password are required.' });

  // fetch the user from sanity
  client
    .fetch('*[_type == "customer" && email == $email ]', { email }) // Replace "your-data-type" with the actual type you want to query
    .then((data) => {

      // Handle the fetched data
      console.log(data);
      data.forEach((user) => {
        // Access and display the desired fields
        console.log('User:', user.name);
        console.log('Email:', user.email);
        console.log('refreshToken:', user.refreshToken);
        console.log('role:', user.isAdmin);
        console.log('password:', user.password);

        if (!user) return res.sendStatus(401); // Unauthorized
        // evaluate password
        const match = bcrypt.compare(password, user.password);
        if (match) {
          // const roles = Object.values(user.role);
          // create JWTs
          const accessToken = jwt.sign(
            {
              "UserInfo": {
                "username": user.name,
              }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
          );
          const refreshToken = jwt.sign(
            { "username": user.name },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
          );
          // Saving refreshToken with current user
          const currentUser = {
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "id": user._id,
            "isAdmin": user.isAdmin,
            "created_at": user._createdAt,
            "refreshToken": refreshToken
          };

          res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
          res.json({ accessToken, user: currentUser });
        } else {
          return res.status(500).json({ 'message': 'Incorrect email or password.' });
        }
        //   console.log('Address:', user.address);
        console.log('---');
      });

    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error:', error);
    });
};

module.exports = { handleLogin };
