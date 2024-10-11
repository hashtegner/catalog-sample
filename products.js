import { faker } from "@faker-js/faker";

function createRandomVariant() {
  return {
    id: faker.string.numeric({ length: 13 }),
    title: faker.commerce.productName(),
    image_link: faker.image.url(),
    price: faker.commerce.price(),

    sku: faker.commerce.isbn(),
    inventory_quantity: faker.number.int({ min: 100, max: 200 }),
  };
}

function createRandomProduct() {
  return {
    id: faker.string.numeric({ length: 13 }),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    link: faker.internet.url(),
    image_link: faker.image.url(),
    status: faker.helpers.arrayElement(["published", "draft"]),

    categories: faker.helpers.multiple(() => faker.commerce.department(), {
      count: faker.helpers.rangeToNumber({ min: 0, max: 10 }),
    }),

    variants: faker.helpers.multiple(createRandomVariant, {
      count: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    }),
  };
}

export function randomProducts(size) {
  return faker.helpers.multiple(createRandomProduct, { count: size });
}
