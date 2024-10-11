import { faker } from "@faker-js/faker";

function maybe(fn, fillprob) {
  return faker.helpers.maybe(fn, { probability: fillprob });
}

function createRandomVariant(fillprob) {
  return {
    id: maybe(() => faker.string.numeric({ length: 13 }), fillprob),
    title: faker.commerce.productName(),
    image_link: faker.image.url(),
    price: faker.commerce.price(),
    sku: maybe(() => faker.commerce.isbn(), fillprob),
    inventory_quantity: maybe(
      () => faker.number.int({ min: 100, max: 200 }),
      fillprob
    ),
  };
}

function createRandomProduct(fillprob) {
  return {
    id: maybe(() => faker.string.numeric({ length: 13 }), fillprob),
    title: maybe(() => faker.commerce.productName(), fillprob),
    description: faker.commerce.productDescription(),
    link: faker.internet.url(),
    image_link: faker.image.url(),
    status: faker.helpers.arrayElement(["published", "draft"]),

    categories: faker.helpers.multiple(() => faker.commerce.department(), {
      count: faker.helpers.rangeToNumber({ min: 0, max: 10 }),
    }),

    variants: faker.helpers.multiple(() => createRandomVariant(fillprob), {
      count: faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    }),
  };
}

export function randomProducts(size, fillprob) {
  return faker.helpers.multiple(() => createRandomProduct(fillprob), {
    count: size,
  });
}
