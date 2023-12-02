// import packages
const bcrypt = require('bcrypt');
const { createClient } = require('@sanity/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sanity.io client setup
const client = createClient({
  projectId: 'ilicayds',
  dataset: 'production',
  apiVersion: '2023-11-29',
  useCdn: false,
});

/**
 * Handles the login request.
 * @param req - The request object.
 * @param res - The response object.
 */
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("User 1:" + email);
  console.log("Password 1 :" + password);
  if (!email || !password) {
    return res.status(400).json({ 'message': 'Username and password are required.' });
  }

  try {
    // fetch the customer from sanity
    const data = await client.fetch('*[_type == "customer" && email == $email]', { email });

    // Check if user exists
    if (!data || data.length === 0) {
      return res.sendStatus(401); // Unauthorized
    }

    const user = data[0]; // Assuming you expect only one user with a given email

    // Evaluate password
    const match = await bcrypt.compare(password, user.password);
    
    // if the two passwords match
    if (match) {
      // Create JWT token
      const accessToken = jwt.sign(
        { "CustomerInfo": { "username": user.name } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Adjust token expiration as needed
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
  } catch (error) {
    // Handle any errors that occur during the fetch or password comparison
    console.error('Error:', error);
    return res.status(500).json({ 'message': 'Internal Server Error' });
  }
};

module.exports = { handleLogin };
