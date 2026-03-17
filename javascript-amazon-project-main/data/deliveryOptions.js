import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId) {
  let matchingDeliveryOption;

  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOptionId === deliveryOption.id) {
      matchingDeliveryOption = deliveryOption;
    }
  });

  return matchingDeliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');

  const day = deliveryDate.day();

  if (day === 5) {        // Friday - skip to Monday (+3)
    deliveryDate = deliveryDate.add(3, 'days');
  } else if (day === 6) { // Saturday - skip to Monday (+2)
    deliveryDate = deliveryDate.add(2, 'days');
  } else if (day === 0) { // Sunday - skip to Monday (+1)
    deliveryDate = deliveryDate.add(1, 'days');
  }

  return deliveryDate.format('dddd, MMMM D');
}