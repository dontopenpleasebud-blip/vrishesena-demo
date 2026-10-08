import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Cause } from '../models/Cause.js';
import { Package } from '../models/Package.js';
import { Admin } from '../models/Admin.js';

dotenv.config();

const causesData = [
  {
    title: 'Nepal Kit',
    slug: 'nepal',
    tagline: 'Support flood-affected families in Nepal with essential food supplies and daily necessities, bringing comfort, safety, and hope during difficult times.',
    description: 'Support flood-affected families in Nepal with essential food supplies and daily necessities, bringing comfort, safety, and hope during difficult times.',
    categories: ['all', 'others'],
    unitPrice: 500,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/nepal3.webp',
    sortOrder: 1,
  },
  {
    title: 'Feed a Homeless Person',
    slug: 'homeless',
    tagline: 'Vrishasena Foundation | Feed the Homeless, End Hunger & Donate Food to Save Lives',
    description: 'Provide hot, hygienic, nourishing meals to homeless elders and individuals living on streets across Chennai and surrounding areas.',
    categories: ['all', 'food'],
    unitPrice: 30,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/homeless5.webp',
    isFeatured: true,
    sortOrder: 2,
  },
  {
    title: 'Virtual Cake Cutting Celebration',
    slug: 'virtual_birthday_cake',
    tagline: 'Virtual Cake Cutting Celebration | Connect & Celebrate with our NGO in chennai',
    description: 'Celebrate your special birthday or anniversary virtually with underprivileged children. Includes customized cake, snacks, and video highlights.',
    categories: ['all', 'birthday', 'special_events'],
    unitPrice: 4000,
    unitLabel: 'Celebration',
    image: 'https://media.thaagam.org/media/deps/causes/card/4kcardimage.jpeg',
    sortOrder: 3,
  },
  {
    title: 'Thaali Meals',
    slug: 'thaali',
    tagline: 'Donate Thali Meals to Feed a Homeless Person with our transparent NGO',
    description: 'Wholesome full South Indian thali meal including rice, sambar, rasam, kootu, poriyal, and buttermilk served with dignity.',
    categories: ['all', 'food'],
    unitPrice: 60,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/thali.webp',
    sortOrder: 4,
  },
  {
    title: 'Chicken Biryani',
    slug: 'chicken_briyani',
    tagline: 'Vrishasena foundation | Feed the Homeless with Chicken Biryani with our NGO',
    description: 'Delicious aromatic chicken biryani prepared freshly in our community kitchen and distributed to destitute individuals.',
    categories: ['all', 'food'],
    unitPrice: 120,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/chickenbiriyani.webp',
    sortOrder: 5,
  },
  {
    title: 'Feed a Stray Dog',
    slug: 'stray_dog',
    tagline: 'Our NGO actively provides food and care to stray dogs facing hunger.',
    description: 'Daily feeding rounds providing nutritious boiled rice, chicken broth, and pedigree to community stray dogs.',
    categories: ['all', 'animals', 'food'],
    unitPrice: 35,
    unitLabel: 'Stray Dog',
    image: 'https://media.thaagam.org/media/deps/causes/card/dogfood.webp',
    isFeatured: true,
    sortOrder: 6,
  },
  {
    title: 'Blanket',
    slug: 'blanket',
    tagline: 'Support Vrishasena Foundation by Donating Blankets to the Needy',
    description: 'Warm, high-quality fleece blankets distributed to roadside dwellers and pavement sleepers during monsoon and cold winter nights.',
    categories: ['all', 'others'],
    unitPrice: 200,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/blanket.webp',
    sortOrder: 7,
  },
  {
    title: 'Child Care Kit',
    slug: 'childcare_kit',
    tagline: 'Child Care Kit | Support Children\'s Health & Wellness with our NGO',
    description: 'Care kits containing health drinks, vitamins, basic hygiene items, and wellness essentials for children in shelter homes.',
    categories: ['all', 'child', 'orphanage'],
    unitPrice: 100,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/childcare.webp',
    sortOrder: 8,
  },
  {
    title: 'Plant a Tree',
    slug: 'plant_tree',
    tagline: 'Vrishasena Foundation – Donate to Plant a Tree & Restore Nature',
    description: 'Sponsor native tree saplings planted and protected across urban school grounds, community parks, and lake borders.',
    categories: ['all', 'environment', 'others'],
    unitPrice: 70,
    unitLabel: 'Sapling',
    image: 'https://media.thaagam.org/media/deps/causes/card/plantree.webp',
    sortOrder: 9,
  },
  {
    title: 'Wheelchair',
    slug: 'wheel_chair',
    tagline: 'Donate for Wheelchair Support | Vrishasena Foundation',
    description: 'Sturdy, ergonomically designed wheelchairs gifted to elderly homeless persons and disabled individuals restoring independence.',
    categories: ['all', 'others', 'healthcare'],
    unitPrice: 6500,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/wheelchair-1.webp',
    sortOrder: 10,
  },
  {
    title: 'Give a Napkin',
    slug: 'napkin',
    tagline: 'Donate for Hygiene Support Vrishasena Foundation Give a Napkin to Those in Need',
    description: 'Sanitary napkin packs and menstrual hygiene awareness kits distributed to adolescent girls in slums and shelter homes.',
    categories: ['all', 'others', 'healthcare'],
    unitPrice: 50,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/napkin.webp',
    sortOrder: 11,
  },
  {
    title: 'Gift for Children',
    slug: 'child_gift',
    tagline: 'Creating happiness is the greatest thing a human being can create.',
    description: 'Toy kits, drawing books, colors, and puzzles gifted to orphan children on festive occasions.',
    categories: ['all', 'child', 'orphanage'],
    unitPrice: 200,
    unitLabel: 'Child',
    image: 'https://media.thaagam.org/media/deps/causes/card/childgift.webp',
    sortOrder: 12,
  },
  {
    title: 'Egg Biryani',
    slug: 'egg_briyani',
    tagline: 'Feed a homeless person egg biriyani | End hunger with thaagam foundation',
    description: 'Hearty egg biryani with two boiled eggs, raita, and brinjal gravy served to daily wage earners and destitute citizens.',
    categories: ['all', 'food'],
    unitPrice: 70,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/eggbriyanicard.jpeg',
    sortOrder: 13,
  },
  {
    title: 'Veg Biryani',
    slug: 'veg_briyani',
    tagline: 'Vrishasena foundation | Support our NGO to provide Feed a homeless person veg biriyani',
    description: 'Pure vegetarian aromatic biryani packed with fresh garden vegetables and paneer cubes.',
    categories: ['all', 'food'],
    unitPrice: 60,
    unitLabel: 'Person',
    image: 'https://media.thaagam.org/media/deps/causes/card/vegbiriyani.webp',
    sortOrder: 14,
  },
  {
    title: 'School Bag',
    slug: 'school_bag',
    tagline: '100% transparent NGO | Donate a School Bag – Equip Needy Children with Education Essentials',
    description: 'Durable, waterproof school backpacks distributed to street children returning to school.',
    categories: ['all', 'education', 'child'],
    unitPrice: 500,
    unitLabel: 'Bag',
    image: 'https://media.thaagam.org/media/deps/causes/card/schoolbag.webp',
    sortOrder: 15,
  },
  {
    title: 'A Pair of Slippers',
    slug: 'slipper',
    tagline: 'Donate a Slipper | Vrishasena Foundation Provide Footwear & Protection to Needy Children',
    description: 'Comfortable, non-slip footwear gifted to barefoot children living in roadside settlements.',
    categories: ['all', 'child', 'others'],
    unitPrice: 150,
    unitLabel: 'Child',
    image: 'https://media.thaagam.org/media/deps/causes/card/sliper.webp',
    sortOrder: 16,
  },
  {
    title: 'Educate a Child',
    slug: 'child_education',
    tagline: 'Support our Education initiative to educate homeless children living on the streets.',
    description: 'Sponsor notebooks, stationery, tuition assistance, and study materials for an underprivileged child.',
    categories: ['all', 'education', 'child'],
    unitPrice: 800,
    unitLabel: 'Child',
    image: 'https://media.thaagam.org/media/deps/causes/card/education.png',
    isFeatured: true,
    sortOrder: 17,
  },
  {
    title: 'Tailoring Machine',
    slug: 'tailoring_machine',
    tagline: 'Donate a Tailoring Machine | Empower Livelihoods with our ngo in chennai',
    description: 'Empower single mothers and destitute women with professional sewing machines to start home tailoring businesses.',
    categories: ['all', 'livelihood', 'others'],
    unitPrice: 7000,
    unitLabel: 'Machine',
    image: 'https://media.thaagam.org/media/deps/causes/card/tailoring_machime.jpeg',
    sortOrder: 18,
  },
  {
    title: 'Hearing Aid',
    slug: 'hearing_aid',
    tagline: 'Donate Hearing Aids for a Better Life | Vrishasena Foundation',
    description: 'Digital hearing assistance devices fitted for deaf and hard-of-hearing underprivileged seniors.',
    categories: ['all', 'healthcare', 'others'],
    unitPrice: 1800,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/hearing_aid-2.webp',
    sortOrder: 19,
  },
  {
    title: 'Mother Care Kit',
    slug: 'mother_kit',
    tagline: 'Give a Mother Care Kit | Support Mothers with Essential Care Packages with our transparent NGO',
    description: 'Nutritional supplements, maternity clothes, and postpartum recovery kits for expectant mothers in marginalized settlements.',
    categories: ['all', 'child', 'healthcare'],
    unitPrice: 700,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/mothercarekit.webp',
    sortOrder: 20,
  },
  {
    title: 'Bicycle',
    slug: 'bicycle',
    tagline: 'Vrishasena Foundation | Bicycle Donation Program – Pedal Towards a Better Future',
    description: 'Bicycles provided to rural students and daily wage earners having to walk 5-8 kilometers every day to reach school or work.',
    categories: ['all', 'child', 'livelihood', 'education'],
    unitPrice: 6500,
    unitLabel: 'Cycle',
    image: 'https://media.thaagam.org/media/deps/causes/card/cycle.jpeg',
    sortOrder: 21,
  },
  {
    title: 'Banana & Milk',
    slug: 'banana_milk',
    tagline: 'Banana & Milk – Nourish a Child’s Future',
    description: 'Daily fresh milk and nutrient-rich bananas provided in morning drives to slum children battling malnutrition.',
    categories: ['all', 'child', 'food'],
    unitPrice: 30,
    unitLabel: 'Child',
    image: 'https://media.thaagam.org/media/deps/causes/card/bananmilk.webp',
    sortOrder: 22,
  },
  {
    title: 'Mosquito Net',
    slug: 'mosquito_net',
    tagline: 'Durable mosquito nets were provided to children and families living in vulnerable areas, ensuring protection from insects and a safe, uninterrupted sleep.',
    description: 'Protective mosquito netting preventing dengue and malaria infections for families residing in temporary shelters.',
    categories: ['all', 'child', 'others'],
    unitPrice: 500,
    unitLabel: 'Net',
    image: 'https://media.thaagam.org/media/deps/causes/card/maskitonet.webp',
    sortOrder: 23,
  },
  {
    title: 'Cow Feeding',
    slug: 'cow_feeding',
    tagline: 'Nutritious cow feed and clean water were offered to ensure the cows’ health and wellbeing, spreading kindness through every meal served with care and devotion.',
    description: 'Nutritious cow feed, fresh green grass, and clean water offered to rescue gaushalas and abandoned cattle.',
    categories: ['all', 'animals', 'food'],
    unitPrice: 101,
    unitLabel: 'Cow',
    image: 'https://media.thaagam.org/media/deps/causes/card/cowfeeding.webp',
    sortOrder: 24,
  },
  {
    title: 'Water Bowl For Birds',
    slug: 'water_bowl',
    tagline: 'Clean water bowls were placed in open areas and trees, providing fresh drinking water for birds and helping them stay cool and nourished throughout the day.',
    description: 'Earthen clay water bowls hung on trees and rooftops helping wild birds survive scorching summer months.',
    categories: ['all', 'animals', 'environment'],
    unitPrice: 250,
    unitLabel: 'Bowl',
    image: 'https://media.thaagam.org/media/deps/causes/card/water_bowl-2.webp',
    sortOrder: 25,
  },
  {
    title: 'Bird House',
    slug: 'bird_house',
    tagline: 'Wooden birdhouses were installed on trees, providing birds a safe nesting space and protection from heat and rain, ensuring they always have a place to call home.',
    description: 'Sturdy wooden bird houses installed across urban gardens to revive local sparrow and songbird habitats.',
    categories: ['all', 'animals', 'environment'],
    unitPrice: 350,
    unitLabel: 'House',
    image: 'https://media.thaagam.org/media/deps/causes/card/birdhouse.webp',
    sortOrder: 26,
  },
  {
    title: 'Transgender Kit',
    slug: 'transgender_kit',
    tagline: 'Each kit included 3 kg rice, 1 kg wheat flour, 1 kg dal, 500 ml cooking oil, 3 spice packets, 1 kg onion, 1 kg tomato, and 5 hygiene products (hair oil, soap, brush, toothpaste, and shampoo).',
    description: 'Monthly ration and personal care kits delivered to marginalized transgender community members in need of dignified support.',
    categories: ['all', 'others', 'special_events'],
    unitPrice: 800,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/transgender.webp',
    sortOrder: 27,
  },
  {
    title: 'Fight Thirst. Share Water',
    slug: 'water_bottle',
    tagline: '10 Bottles. One Act of Kindness. | Water Donation Initiative | Vrishasena Foundation',
    description: 'Chilled mineral water bottles distributed to traffic constables, street sweepers, and delivery executives in heatwaves.',
    categories: ['all', 'food'],
    unitPrice: 10,
    unitLabel: 'Bottle',
    image: 'https://media.thaagam.org/media/deps/causes/card/WATTER_BOTTLE.webp',
    sortOrder: 28,
  },
  {
    title: 'Dog Collar',
    slug: 'dog_collar',
    tagline: 'Reflective dog collars are provided to increase the visibility of stray dogs at night, helping prevent road accidents and protect their lives.',
    description: 'High-visibility reflective collars fitted onto stray dogs along highways and busy arterial roads to prevent nocturnal accidents.',
    categories: ['all', 'animals', 'others'],
    unitPrice: 300,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/dorcollar.webp',
    sortOrder: 29,
  },
  {
    title: 'Bihar Kit',
    slug: 'bihar_kit',
    tagline: 'Provide essential food, hygiene items, clean water, and relief supplies to flood-affected families in Bihar.',
    description: 'Immediate relief ration kits and potable water filters delivered to flood-hit hamlets along the Kosi river belt.',
    categories: ['all', 'others'],
    unitPrice: 500,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/bihar.png',
    sortOrder: 30,
  },
  {
    title: 'Egg & Milk',
    slug: 'egg_milk',
    tagline: 'Give a Meal & Egg | Support Health & Wellness with Vrishasena Foundation',
    description: 'High-protein boiled eggs and calcium-rich milk served to growing children in municipal elementary schools.',
    categories: ['all', 'child', 'food', 'orphanage'],
    unitPrice: 30,
    unitLabel: 'Child',
    image: 'https://media.thaagam.org/media/deps/causes/card/eggandmilk.jpeg',
    sortOrder: 31,
  },
  {
    title: 'Birthday Cake',
    slug: 'birthday_cake',
    tagline: 'Sponsor a Birthday Cake with Vrishasena Foundation - Share Joy with Needy Children',
    description: 'Sponsor a freshly baked 2kg cake for a group of 20 orphanage children celebrating together with birthday caps and treats.',
    categories: ['all', 'birthday', 'special_events'],
    unitPrice: 1600,
    unitLabel: '20 children',
    image: 'https://media.thaagam.org/media/deps/causes/card/cakecuttingcardimg.jpeg',
    sortOrder: 32,
  },
  {
    title: 'Grocery Kit',
    slug: 'grocery_kit',
    tagline: 'Support Families in Need | Donate Grocery Kits with our NGO in chennai',
    description: 'Comprehensive dry ration supplies (rice, atta, pulses, oil, spices) sufficient to feed a destitute family of 4 for two weeks.',
    categories: ['all', 'others'],
    unitPrice: 500,
    unitLabel: 'Kit',
    image: 'https://media.thaagam.org/media/deps/causes/card/grocery.webp',
    sortOrder: 33,
  },
  {
    title: 'Hygiene Kit',
    slug: 'hygiene_kit',
    tagline: 'Providing hygiene kits to underserved communities for health, dignity, and daily cleanliness.',
    description: 'Personal hygiene package containing soaps, medicated shampoo, toothpaste, toothbrushes, antiseptic wash, and face towels.',
    categories: ['all', 'child', 'others', 'healthcare'],
    unitPrice: 200,
    unitLabel: 'Child',
    image: 'https://media.thaagam.org/media/deps/causes/card/hyginekit.webp',
    sortOrder: 34,
  },
];

const packagesData = [
  {
    title: 'Wish Video',
    packageId: 1,
    image: 'https://media.thaagam.org/media/packages/Wish_Video_2.jpg.webp',
    link: '/packages_form?id=1',
    price: 1500,
    sortOrder: 1,
  },
  {
    title: 'Distribution Video',
    packageId: 2,
    image: 'https://media.thaagam.org/media/packages/distribution_video1.jpg.webp',
    link: '/packages_form?id=2',
    price: 2500,
    sortOrder: 2,
  },
  {
    title: 'Banner',
    packageId: 3,
    image: 'https://media.thaagam.org/media/packages/banner1.jpg.webp',
    link: '/packages_form?id=3',
    price: 1000,
    sortOrder: 3,
  },
  {
    title: 'Cake with image',
    packageId: 8,
    image: 'https://media.thaagam.org/media/packages/imageoncake.webp',
    link: '/packages_form?id=8',
    price: 2000,
    sortOrder: 4,
  },
  {
    title: 'Wish Video & Cake',
    packageId: 5,
    image: 'https://media.thaagam.org/media/packages/Wish_Video_with_Cake1.jpg.webp',
    link: '/packages_form?id=5',
    price: 3500,
    sortOrder: 5,
  },
];

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vrishasena_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log(' Connected to MongoDB.');

    // 1. Seed Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'vrishasenafoundation@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminvrishasena123';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: 'Vrishasena Superadmin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      console.log(` Created default admin: ${adminEmail} (password: ${adminPassword})`);
    } else {
      console.log(` Admin account already exists: ${adminEmail}`);
    }

    // 2. Seed Causes
    const causeCount = await Cause.countDocuments();
    if (causeCount === 0) {
      console.log(`Seeding ${causesData.length} causes...`);
      await Cause.insertMany(causesData);
      console.log(` Successfully seeded ${causesData.length} causes!`);
    } else {
      console.log(` Causes collection already has ${causeCount} records. (Skipping overwrite)`);
    }

    // 3. Seed Packages
    const pkgCount = await Package.countDocuments();
    if (pkgCount === 0) {
      console.log(`Seeding ${packagesData.length} packages...`);
      await Package.insertMany(packagesData);
      console.log(` Successfully seeded ${packagesData.length} packages!`);
    } else {
      console.log(` Packages collection already has ${pkgCount} records. (Skipping overwrite)`);
    }

    console.log(' Seeding process finished successfully.');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

// If run directly: node scripts/seedData.js
if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase().then(() => {
    mongoose.connection.close();
    process.exit(0);
  });
}
