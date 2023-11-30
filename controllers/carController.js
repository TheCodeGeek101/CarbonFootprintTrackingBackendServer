const { createClient } = require('@sanity/client');

// Sanity.io client setup
const client = createClient({
  projectId: 'ilicayds',
  dataset: 'production',
  apiVersion: '2023-11-29', // The API version you are using
  useCdn: false, // Set to true if you want to enable the Content Delivery Network (CDN)
});

const getCars = async (req, res) => {
    try {
        const data = await client.fetch(
            `*[_type == "car"]{
                year,
                model,
                brand,
                "image": image.asset->url,
                _id
            }`
        );

        const carsList = data.map((car) => ({
            brand: car.brand,
            model: car.model,
            year: car.year,
            id: car._id,
            image: car.image,
        }));

        console.log('Cars:', carsList);

        res.json({ cars: carsList });
        console.log('Success');
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchCars = async (req,res) => {

 const { brand} = req.body;
  if (!brand)
    return res.status(400).json({ 'message': 'Please enter the brand of the car you want.' });

    try{
    const data = await client.fetch(
            `*[_type == "car" && brand == $brand]{
                year,
                model,
                brand,
                "image": image.asset->url,
                _id
                }`,
            {
               brand: brand,
            }
        );
        const carsList = data.map((car) => ({
            brand: car.brand,
            model: car.model,
            year: car.year,
            id: car._id,
            image: car.image,
        }));
        console.log('Cars:', carsList);

        res.json({ cars: carsList });
        console.log('Success');
        }
        catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
 
module.exports = { getCars, searchCars };
