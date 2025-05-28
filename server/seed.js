require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Car = require('./models/Car');

mongoose.connect(process.env.MONGO_URI)
  .then(() => Car.deleteMany())
  .then(() =>
    Car.insertMany([
      {
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        price: 1800000,
        image: "https://toyota-cms-media.s3.amazonaws.com/wp-content/uploads/2021/09/2022-toyota-corolla-hybrid-2.jpg",
        description: "Reliable, economical, and efficient."
      },
      {
        make: "Mazda",
        model: "Axela",
        year: 2021,
        price: 1600000,
        image: "https://www.mazda.co.ke/assets/img/cars/axela/axela-banner.jpg",
        description: "Fun to drive and stylish."
      },
      {
        make: "BMW",
        model: "X5",
        year: 2023,
        price: 6500000,
        image: "https://cdn.bmwblog.com/wp-content/uploads/2023/05/2024-bmw-x5-m60i-m-sport-4.jpg",
        description: "Luxury SUV with cutting-edge tech."
      },
      {
        make: "Nissan",
        model: "Note",
        year: 2020,
        price: 1100000,
        image: "https://global.nissannews.com/en/releases/release-0c45cdbf26c7e4e3e6f7f5a0b8bcb5b4-2020-nissan-note-aura/images/2020-nissan-note-aura-6",
        description: "Compact, urban-friendly, and spacious."
      },
      {
        make: "Subaru",
        model: "Impreza",
        year: 2022,
        price: 2500000,
        image: "https://www.subaru.com/content/dam/subaru/images/vehicles/2022/IMPREZA/2022-Subaru-Impreza-Compact-Sedan.jpg",
        description: "All-wheel drive, sporty, and safe."
      },
      {
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2021,
        price: 5000000,
        image: "https://www.mercedes-benz.com/en/vehicles/passenger-cars/c-class/_jcr_content/par/productinfotextimage_1341986269/image.MQ6.12.20211019115914.jpeg",
        description: "Classy, elegant, and comfortable."
      },
      {
        make: "Honda",
        model: "Fit",
        year: 2019,
        price: 900000,
        image: "https://www.honda.co.jp/Fit/webcatalog/styling/design/image/pic-main01.jpg",
        description: "Compact hatchback, perfect for city driving."
      },
      {
        make: "Volkswagen",
        model: "Golf",
        year: 2021,
        price: 2200000,
        image: "https://www.volkswagen.co.uk/files/live/sites/vwuk/files/volkswagen-new-golf-2020-main.jpg",
        description: "German engineering, versatile hatchback."
      },
      {
        make: "Audi",
        model: "A4",
        year: 2020,
        price: 3500000,
        image: "https://www.audi.co.ke/content/dam/nemo/models/a4/a4-limousine/my-2020/1920x1080-gallery/1920x1080_AA4_L_191001.jpg",
        description: "Premium sedan with high performance."
      },
      {
        make: "Ford",
        model: "Ranger",
        year: 2022,
        price: 3200000,
        image: "https://www.ford.co.ke/content/dam/Ford/website-vehicle-billboard/africa/ranger-wildtrak/desktop/Ford_Ranger_Wildtrak-Image-1.jpg",
        description: "Tough, reliable, and ready for anything."
      }
    ])
  )
  .then(() => {
    console.log('✅ Dummy cars added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Seeding failed:', err);
  });
