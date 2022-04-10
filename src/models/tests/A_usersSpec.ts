import { User } from '../user'
import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);


describe('Users route test', () => {

    it('get the authenticate and create endpoints users', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //User creation testing
        const testuser: User = {
            firstname: "first",
            lastname: "tester",
            username: "tester1",
            password: "123",
        }
        const res = await request
            .post('/users/add')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(testuser);
        expect(res.body.firstname).toEqual("first");
        expect(res.body.lastname).toEqual("tester");
        expect(res.body.username).toEqual("tester1");
    });

    it('get the authenticate and index endpoints of users', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //Users indexing part
        const res = await request
            .get('/users')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.body[0].firstname).toEqual("first");
        expect(res.body[0].lastname).toEqual("tester");
        expect(res.body[0].username).toEqual("tester1");
    });

    it('get the authenticate and show endpoints of users to show first user', async () => {
        //Authentication part
        const authenticatonResponse = await request
            .post('/users/verify')
            .set('Content-type', 'application/json')
            .send({ username: "tester1", password: "12345" });
        const token = authenticatonResponse.body;
        //Users indexing part
        const res = await request
            .get('/users/1')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.body.firstname).toEqual("first");
        expect(res.body.lastname).toEqual("tester");
        expect(res.body.username).toEqual("tester1");
    });
});
