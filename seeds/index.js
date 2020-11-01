const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '5f9deb52ed73c03c66ca8020',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude

                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/hazederlad/image/upload/v1604158183/YelpCamp/o2k7unlecv3ghgxqpuap.png',
                    filename: 'YelpCamp/o2k7unlecv3ghgxqpuap.png'
                },
                {
                    url: 'https://res.cloudinary.com/hazederlad/image/upload/v1604158043/YelpCamp/rfhdgry4gsvbxyoo4sv0.png',
                    filename: 'YelpCamp/rfhdgry4gsvbxyoo4sv0.png'
                },
                {
                    url: 'https://res.cloudinary.com/hazederlad/image/upload/v1604155317/YelpCamp/r8afzjpbqyotwqbbyjuc.png',
                    filename: 'YelpCamp/r8afzjpbqyotwqbbyjuc.png'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})