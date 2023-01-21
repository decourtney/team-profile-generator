const Engineer = require('../lib/engineer');

describe('Engineer class', () =>
{
    describe('getID method', () =>
    {
        it('returns employee ID', () =>
        {
            const engineer = new Engineer(1, 'Bob', 'bob@gmail.com', 'bobtheblob');
            let id = engineer.getID();
            expect(id).toBe(1);
        });
    });

    describe('getName method', () =>
    {
        it('returns employee name', () =>
        {
            const engineer = new Engineer(1, 'Bob', 'bob@gmail.com', 'bobtheblob');
            let name = engineer.getName();
            expect(name).toBe('Bob');
        });
    });

    describe('getEmail method', () =>
    {
        it('returns employee email', () =>
        {
            const engineer = new Engineer(1, 'Bob', 'bob@gmail.com', 'bobtheblob');
            let email = engineer.getEmail();
            expect(email).toBe('bob@gmail.com');
        });
    });

    describe('getGithub method', () =>
    {
        it('returns employee github username', () =>
        {
            const engineer = new Engineer(1, 'Bob', 'bob@gmail.com', 'bobtheblob');
            let username = engineer.getGithub();
            expect(username).toBe('bobtheblob');
        });
    });

    describe('getRole method', () =>
    {
        it('returns employee role', () =>
        {
            const engineer = new Engineer(1, 'Bob', 'bob@gmail.com', 'bobtheblob');
            let role = engineer.getRole();
            expect(role).toBe('Engineer');
        });
    });
});