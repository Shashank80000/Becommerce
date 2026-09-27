import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Solution from "../models/Solution.js";
import { slugify } from "../utils/slugify.js";

const categoryNames = [
  "Floor Cleaners",
  "Toilet Cleaners",
  "Glass Cleaners",
  "Disinfectants",
  "Degreasers",
  "Surface Cleaners",
  "Laundry Chemicals",
  "Dishwashing Chemicals",
  "Hand Hygiene",
  "Cleaning Tools",
  "Garbage Bags",
  "Industrial Chemicals",
];
const productNames = [
  "Heavy Duty Floor Cleaner",
  "Industrial Floor Cleaner",
  "Multipurpose Surface Cleaner",
  "Glass & Window Cleaner",
  "Toilet Bowl Cleaner",
  "Heavy Duty Degreaser",
  "Industrial Disinfectant",
  "Bathroom Cleaner",
  "Kitchen Cleaner",
  "Liquid Hand Wash",
  "Hand Sanitizer",
  "Laundry Detergent",
  "Dishwashing Liquid",
  "Air Freshener",
  "Garbage Bags",
  "Microfiber Cleaning Cloth",
  "Floor Wiper",
  "Industrial Cleaning Brush",
  "Scrub Pads",
  "Commercial Toilet Cleaner",
];
const categoryFor = [
  "Floor Cleaners",
  "Floor Cleaners",
  "Surface Cleaners",
  "Glass Cleaners",
  "Toilet Cleaners",
  "Degreasers",
  "Disinfectants",
  "Toilet Cleaners",
  "Dishwashing Chemicals",
  "Hand Hygiene",
  "Hand Hygiene",
  "Laundry Chemicals",
  "Dishwashing Chemicals",
  "Surface Cleaners",
  "Garbage Bags",
  "Cleaning Tools",
  "Cleaning Tools",
  "Cleaning Tools",
  "Cleaning Tools",
  "Toilet Cleaners",
];
const image = (name) =>
  `https://placehold.co/700x520/d7e5df/17322c?text=${encodeURIComponent(name)}`;
async function seed() {
  await connectDB();
  const categories = await Category.bulkWrite(
    categoryNames.map((name) => ({
      updateOne: {
        filter: { slug: slugify(name) },
        update: {
          $set: {
            name,
            slug: slugify(name),
            description: `Professional ${name.toLowerCase()} for commercial facilities.`,
            isActive: true,
          },
          $setOnInsert: { image: image(name) },
        },
        upsert: true,
      },
    })),
  );
  const categoryDocs = await Category.find({});
  const categoryMap = Object.fromEntries(
    categoryDocs.map((item) => [item.name, item._id]),
  );
  const productDocs = [];
  for (let index = 0; index < productNames.length; index += 1) {
    const name = productNames[index];
    productDocs.push({
      name,
      slug: slugify(name),
      shortDescription: `Professional ${name.toLowerCase()} for business use.`,
      description: `${name} is a dependable commercial cleaning solution formulated for consistent results across demanding workplaces.`,
      category: categoryMap[categoryFor[index]],
      images: [{ url: image(name) }],
      applications: [
        "Factory",
        "Office",
        "Hotel",
        "Hospital",
        "Restaurant",
        "School",
        "Warehouse",
      ].slice(index % 4, (index % 4) + 3),
      packSizes: index > 14 ? ["Bulk"] : ["1L", "5L", "20L", "50L"],
      features: [
        "Professional concentrate",
        "Consistent batch quality",
        "Bulk reorder support",
      ],
      specifications: {
        form: "Liquid",
        usage: "Dilute according to application",
      },
      usageInstructions:
        "Follow label directions and test on an inconspicuous area before use.",
      safetyInformation: "Wear suitable gloves and avoid contact with eyes.",
      isFeatured: index < 8,
      isActive: true,
    });
  }
  await Product.bulkWrite(
    productDocs.map((product) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: { $set: product },
        upsert: true,
      },
    })),
  );
  const savedProducts = await Product.find({}).limit(20);
  const industries = [
    "Factories",
    "Offices",
    "Hotels",
    "Hospitals",
    "Restaurants",
    "Schools",
    "Warehouses",
    "Commercial Buildings",
    "Facility Management",
  ];
  await Solution.bulkWrite(
    industries.map((name, index) => ({
      updateOne: {
        filter: { slug: slugify(name) },
        update: {
          $set: {
            name: `${name} Cleaning Solutions`,
            slug: slugify(name),
            shortDescription: `Professional cleaning solutions for ${name.toLowerCase()}.`,
            description: `A practical product and supply program for ${name.toLowerCase()} teams.`,
            image: image(name),
            requirements: [
              "Floor cleaning",
              "Machinery cleaning",
              "Washroom cleaning",
              "Surface disinfection",
              "Waste management",
            ],
            recommendedProducts: savedProducts
              .slice(index % 4, (index % 4) + 4)
              .map((item) => item._id),
            cleaningKit: savedProducts
              .slice(index % 3, (index % 3) + 3)
              .map((item) => ({
                product: item._id,
                recommendedQuantity: "20L",
              })),
            benefits: [
              "Bulk supply",
              "Commercial-grade products",
              "Business support",
            ],
            isActive: true,
          },
        },
        upsert: true,
      },
    })),
  );
  console.log(
    `Seeded ${categoryNames.length} categories, ${productNames.length} products, and ${industries.length} solutions`,
  );
  await mongoose.disconnect();
}
seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
