import { User, UserTable } from "../user";

const usertable = new UserTable();

describe('User Test', () => {

    it('should have an show method', () => {
        expect(usertable.authenticate).toBeDefined();
    });

    it('should have an show method', () => {
        expect(usertable.create).toBeDefined();
    });

    it('should have an index method', () => {
        expect(usertable.index).toBeDefined();
    });

    it('should have an show method', () => {
        expect(usertable.show).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await usertable.create({
            firstname: "first",
            lastname: "tester",
            username: "tester1",
            password: "12345"
        });
        expect(result.firstname).toEqual("first");
        expect(result.lastname).toEqual("tester");
        expect(result.username).toEqual("tester1");
    });

    it('index method should return list of products', async () => {
        const result = await usertable.index();
        expect(result[0].firstname).toEqual("first");
        expect(result[0].lastname).toEqual("tester");
        expect(result[0].username).toEqual("tester1");
    });

    it('show method should return the correct product', async () => {
        const result = await usertable.show(1);
        expect(result.firstname).toEqual("first");
        expect(result.lastname).toEqual("tester");
        expect(result.username).toEqual("tester1");
    });
});
