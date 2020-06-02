/* eslint-disable import/prefer-default-export */
export const items = {
  '5ed111295a728d32a9ca49b7': {
    id: '5ed111295a728d32a9ca49b7',
    basePrice: 100,
    category: 2,
    deleted: false,
    description: 'Velit cillum veniam proident in deserunt voluptate cillum. Exercitation velit cillum id commodo aliquip dolor reprehenderit dolore consectetur. Non dolor do cillum nisi. Exercitation sint consectetur irure culpa laboris Lorem reprehenderit sit occaecat occaecat do aute esse. Irure minim nostrud sint adipisicing ipsum eu aliquip.\r\n',
    name: 'dolor',
    visible: true,
    variants: [
      {
        title: 'variant title 1',
        attributes: [
          {
            attribute: 'variant attribute 11',
          },
          {
            attribute: 'variant attribute 12',
          },
        ],
      },
      {
        title: 'variant title 2',
        attributes: [
          {
            attribute: 'variant attribute 21',
          },
          {
            attribute: 'variant attribute 22',
          },
        ],
      },
    ],
    subItems: [
      {
        price: 100,
        stock: 10,
        variants: [
          'variant attribute 11',
          'variant attribute 21',
        ],
      },
      {
        price: 100,
        stock: 10,
        variants: [
          'variant attribute 12',
          'variant attribute 21',
        ],
      },
      {
        price: 100,
        stock: 10,
        variants: [
          'variant attribute 11',
          'variant attribute 22',
        ],
      },
      {
        price: 100,
        stock: 10,
        variants: [
          'variant attribute 12',
          'variant attribute 22',
        ],
      },
    ],
  },
  '5ed111296d4090b28f206d38': {
    id: '5ed111296d4090b28f206d38',
    basePrice: 3172.05,
    category: 2,
    deleted: false,
    description: 'Id fugiat consectetur proident nisi sunt quis sint duis minim adipisicing duis. Do enim amet do sit adipisicing elit qui consectetur. Elit laborum ullamco amet eu magna pariatur labore ad ea adipisicing ullamco. Cillum non aliqua aliqua ullamco voluptate voluptate ipsum nulla officia sunt. Excepteur velit aliquip ipsum pariatur laborum qui aliqua sunt. Ullamco pariatur consectetur amet dolor sit.\r\n',
    name: 'ipsum',
    visible: true,
  },
  '5ed111295cc737557bf875ce': {
    id: '5ed111295cc737557bf875ce',
    basePrice: 2468.8,
    category: 3,
    deleted: false,
    description: 'Irure eiusmod officia cupidatat veniam. Exercitation anim laborum cupidatat tempor irure do. Ut ad sunt id nostrud eiusmod mollit mollit. Officia sint eu id exercitation nisi consequat id dolore.\r\n',
    name: 'excepteur',
    visible: true,
  },
};

export const sellerStore = {
  categories: [
    {
      name: 'category 0',
    },
    {
      name: 'category 1',
    },
    {
      name: 'category 2',
    },
    {
      name: 'category 3',
    },
    {
      name: 'category 4',
    },
  ],
  currency: 'USD',
  email: 'hendersonreed@orbiflex.com',
  enableChatbot: true,
  enableInventoryManagement: true,
  enableRating: true,
  verified: true,
  storeName: 'ut qui',
  storeCustomization: {},
  merchantId: '123456',
};

export const orders = [
  {
    id: 'order123',
    orderStates: [
      {
        date: {
          seconds: 1590234479,
          nanoseconds: 947000000,
        },
        stateId: 0,
      },
    ],
    buyer: 'buyer123',
    paymentMethod: 'paypal',
    totalPrice: 3200,
    shippingAddress: {},
    orderItems: [

      {
        item: '5ed111295a728d32a9ca49b7',
        noOfItems: 1,
        subItem: 0,
        unitPrice: 100,
      },

    ],
    date: {
      seconds: 1590234479,
      nanoseconds: 947000000,
    },
  },
];
