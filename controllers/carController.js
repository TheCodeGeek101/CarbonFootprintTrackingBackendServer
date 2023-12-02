const { createClient } = require('@sanity/client');

// Sanity.io client setup
const client = createClient({
  projectId: 'ilicayds',
  dataset: 'production',
  apiVersion: '2023-11-29', // The API version you are using
  useCdn: false, // Set to true if you want to enable the Content Delivery Network (CDN)
});

// define the getCars function to retrieve all cars
const getCars = async (req, res) => {
    try {
        
        // query the schema to retrieve the cars
        const data = await client.fetch(
            `*[_type == "car"]{
                    year,
                    model,
                    brand,
                    price,
                    gearbox,
                    seat,
                    motor,
                    color,
                    speed,
                    topSpeed,
                    "frontImage": frontImage.asset->url,
                    "rearImage": rearImage.asset->url,
                    "sideImage": sideImage.asset->url,
                    "upperImage": upperImage.asset->url,
                    _id
            }`
        );

        // map the cars in an array 
         const carsList = data.map((car) => ({
            brand: car.brand,
            model: car.model,
            year: car.year,
            price:car.price,
            id: car._id,
            frontImage: car.frontImage,
            rearImage: car.rearImage,
            sideImage: car.sideImage,
            upperImage: car.upperImage,
            gearbox: car.gearbox,
            seat: car.seat,
            motor: car.motor,
            topSpeed: car.topSpeed,
            color: car.color,
            speed: car.speed
        }));

        //log them into the console 
        console.log('Cars:', carsList);

        // return a json response
        res.json({ cars: carsList });
        console.log('Success');
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// define search cars function 
const searchCars = async (req,res) => {

// destructure brand from the request
 const { brand} = req.body;
   
    // check if the brand is available in the request 
  if (!brand) return res.status(400).json({ 'message': 'Please enter the brand of the car you want.' });

    try{

        // query the cars based on the brand from the request
        const data = await client.fetch(
                `*[_type == "car" && brand == $brand]{
                    year,
                    model,
                    brand,
                    price,
                    gearbox,
                    seat,
                    motor,
                    color,
                    speed,
                    topSpeed,
                    "frontImage": frontImage.asset->url,
                    "rearImage": rearImage.asset->url,
                    "sideImage": sideImage.asset->url,
                    "upperImage": upperImage.asset->url,
                    _id
                    }`,
                {
                brand: brand,
                }
            );
        
        // map the results into an array
        const carsList = data.map((car) => ({
            brand: car.brand,
            model: car.model,
            year: car.year,
            price:car.price,
            id: car._id,
            frontupperImage: car.image,
            rearImage: car.image,
            sideImage: car.image,
            upperImage: car.image,
            gearbox: car.gearbox,
            seat: car.seat,
            motor: car.motor,
            topSpeed: car.topSpeed,
            color: car.color,
            speed: car.speed
        }));

        // log the results in the console
        console.log('Cars:', carsList);

        // return a json response
        res.json({ cars: carsList });
        console.log('Success');
        }
        catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getDealers = async (req, res) => {
     try {
        // query the schema to retrieve the dealers
        const data = await client.fetch(
            `*[_type == "dealers"]{
                name,
                offers,
                "image": image.asset->url,
                _id
            }`
        );

        // map the results in an array 
        const dealersList = data.map((dealer) => ({
            name: dealer.name,
            offers: dealer.offers,
            id: dealer._id,
            image: dealer.image,
        }));

        //log them into the console 
        console.log('dealers :', dealersList);

        // return a json response
        res.json({ dealers: dealersList });
        console.log('Success');
    } catch (err) {
        console.error('Error fetching dealers:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
 
module.exports = { getCars, searchCars, getDealers };
