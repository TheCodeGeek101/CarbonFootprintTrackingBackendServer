const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const { createClient } = require('@sanity/client');


const client = createClient({
  projectId: 'ilicayds',
  dataset: 'production',
  apiVersion: '2023-09-18', // The API version you are using
  useCdn: false, // Set to true if you want to enable the Content Delivery Network (CDN)
});

const projectId = 'ilicayds';
const dataset = 'production';
const tokenWithWriteAccess = 'skrxXnAjDiTsL7GoGPwfBdOuIf4IYOf14RUAn5Ug3B1416xNp10nz1lze0lbyybGhQzpFOxC6ie3rhGVeSCriKIAd80WttYVCcGoDr0bjJjGs03uBnaOtdWnCuXmjY7zF6tq99pNQgMOlmVo70T3eEYMNp481Qkhnmq4uf3REw9SDL4svAKA';

const handleNewUser = async (req, res) => {
    const { name, email, password  } = req.body;
    if (!name || !password || !email ) return res.status(400).json({ 'message': 'Username, email and password are required.' });

    // check for duplicate usernames in the db
     const duplicate = await client.fetch(
            `*[_type == "customer" && email == $email][0]`,
            {
            email:email,
            }
        );

    if (duplicate) return res.sendStatus(409); //Conflict 

      //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const newUser = {
             "name": name, 
             "email": email,
             "password": hashedPwd,
             "isAdmin":false
             };
    
  try {
    const response = await fetch(
        `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenWithWriteAccess}`,
            },
            body: JSON.stringify({
                mutations: [
                    {
                        create: {
                            _type: 'customer',
                            ...newUser,
                        },
                    },
                ],
            }),
        }
    );

    if (response.status === 200) {
        console.log("User created:", newUser);
        res.status(201).json({ 'success': `New user ${newUser} created!` });
    } else {
        console.log("Status:", response.status);
        console.log("Response Body:", await response.json());
        res.sendStatus(response.status);
    }
} catch (err) {
    console.error("Error during fetch:", err);
    res.status(500).json({ 'message': err.message });
}

}

module.exports = { handleNewUser };