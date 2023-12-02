const { createClient } = require('@sanity/client');

// Sanity.io client setup
const client = createClient({
  projectId: 'ilicayds',
  dataset: 'production',
  apiVersion: '2023-11-29', // The API version you are using
  useCdn: false, // Set to true if you want to enable the Content Delivery Network (CDN)
});

// define sanity client properties
const projectId = 'ilicayds';
const dataset = 'production';
const tokenWithWriteAccess = "skrxXnAjDiTsL7GoGPwfBdOuIf4IYOf14RUAn5Ug3B1416xNp10nz1lze0lbyybGhQzpFOxC6ie3rhGVeSCriKIAd80WttYVCcGoDr0bjJjGs03uBnaOtdWnCuXmjY7zF6tq99pNQgMOlmVo70T3eEYMNp481Qkhnmq4uf3REw9SDL4svAKA";

const bookCar = async (req, res)  => {
    try {

      // destructure the variables from the request
    const { car, customer, start_time, end_time } = req.body;

    // Check if the car is available for the specified time (you may need to adapt this based on Sanity structure)
    const isAvailable = await isCarAvailable(car, start_time, end_time);

    // if the selected car is available
    if (isAvailable) {

      // passing data from the request to the data object
      const data = {
          car: {
            _type: 'reference',
            _ref: car, 
          },
          customer: {
            _type: 'reference',
            _ref: customer, 
          },
          start_time: start_time,
          end_time: end_time,
    };
    
    // Create a booking record
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
                            _type: 'booking',
                            ...data,
                        },
                    },
                ],
            }),
        }
    );

     // if the response is successful
    if(response.status == 200){
      res.status(200).json({ message: 'Booking successful', response });  
    }
    // response failed with a status code of 500
    else if(response.status == 500){
      res.status(500).json({message : 'Booking Failed!',})
    }
    }
    // the requested car is not available
     else {
      res.status(400).json({ message: 'Car not available for the selected time' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

  const isCarAvailable = async (car, start_time, end_time) => {
      // query sanity schema to check overlapping bookings
      const overlappingBookings = await client.fetch(`
      *[_type == 'booking' && car == $car && (($start_time < $end_time && $end_time > $start_time) || 
      ($start_time >= $start_time && $start_time < $end_time) || 
      ($end_time > $start_time && $end_time <= $end_time))]`, {
        car,
        start_time,
        end_time,
      });

      return overlappingBookings.length === 0;
    }


module.exports = { bookCar };