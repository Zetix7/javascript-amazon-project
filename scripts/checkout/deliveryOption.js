import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function calculateDeliveryDate(deliveryOption){
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    while(isWeekend(deliveryDate)){
        deliveryDate = deliveryDate.add(1, 'day');
    }

    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}

function isWeekend(deliveryDate){
    const dayOfWeek = deliveryDate.format('dddd');
    return (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday');
}