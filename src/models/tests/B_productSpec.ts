import { Product, ProdcutTable } from "../product";

const prodcuttable = new ProdcutTable();

describe('Product Test', () => {
    it('should have an index method', () => {
        expect(prodcuttable.index).toBeDefined();
    });

    it('should have an show method', () => {
        expect(prodcuttable.show).toBeDefined();
    });

    it('should have an show method', () => {
        expect(prodcuttable.create).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await prodcuttable.create({
            id: 1,
            name: "lemon",
            price: 5.7
        });
        expect(result.name).toEqual("lemon");
        expect(Number(result.price)).toEqual(5.7);
    });

    it('index method should return list of products', async () => {
        const result = await prodcuttable.index();
        expect(result[0].id).toEqual(1);
        expect(result[0].name).toEqual("lemon");
        expect(Number(result[0].price)).toEqual(5.7);

    });

    it('show method should return the correct product', async () => {
        const result = await prodcuttable.show(1);
        expect(result.id).toEqual(1);
        expect(result.name).toEqual("lemon");
        expect(Number(result.price)).toEqual(5.7);
    });

});
