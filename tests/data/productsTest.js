import { Product, Clothing, Appliance } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: Product class', () => {
    let product;
    
    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: [
              "socks",
              "sports",
              "apparel"
            ]
        });
    });
    it('correct properties', () => {
        expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product.rating).toEqual({stars: 4.5, count: 87});
    });

    it('get stars url', () => {
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    });

    it('get price', () => {
        expect(product.getPrice()).toEqual('$10.90');
    });

    it('extra info HTML is empty', () => {
        expect(product.extraInfoHTML()).toEqual('');
    });
});

describe('test suite: Clothing class', () => {
    let clothing;
    beforeEach(() => {
        clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });

    it('correct properties', () => {
        expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(clothing.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
        expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
        expect(clothing.rating).toEqual({stars: 4.5, count: 56});
    });

    it('get stars url', () => {
        expect(clothing.getStarsUrl()).toEqual(`images/ratings/rating-${clothing.rating.stars * 10}.png`);
    });

    it('get price', () => {
        expect(clothing.getPrice()).toEqual('$7.99');
    });

    it('extra info HTML displays size chart link', () => {
        expect(clothing.extraInfoHTML()).toContain('Size chart');
    });
});

describe('test suite: Appliance class', () => {
    let appliance;

    beforeEach(() => {
        appliance = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
            stars: 5,
            count: 2197
            },
            priceCents: 1899,
            keywords: [
            "toaster",
            "kitchen",
            "appliances"
            ],
            type: 'appliance',
            instructionsLink: 'images/appliance-instructions.png',
            warrantyLink: 'images/appliance-warranty.png'
        });
    });

    it('correct properties', () => {
        expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(appliance.image).toEqual('images/products/black-2-slot-toaster.jpg');
        expect(appliance.name).toEqual('2 Slot Toaster - Black');
        expect(appliance.rating).toEqual({stars: 5, count: 2197});
    });

    it('get stars url', () => {
        expect(appliance.getStarsUrl()).toEqual(`images/ratings/rating-${appliance.rating.stars * 10}.png`);
    });

    it('get price', () => {
        expect(appliance.getPrice()).toEqual('$18.99');
    });

    it('extra info HTML displays instructions and warranty links', () => {
        expect(appliance.extraInfoHTML()).toContain('Instructions');
        expect(appliance.extraInfoHTML()).toContain('Warranty');
    });
});