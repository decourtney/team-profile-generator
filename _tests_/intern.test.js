const Intern = require('../lib/intern');

describe('Intern class', () =>
{
    describe('getID method', () =>
    {
        it('returns employee ID', () =>
        {
            const intern = new Intern(1, 'bob', 'bob@gmail.com', 'Greendale Community College');
            let id = intern.getID();
            expect(id).toBe(1);
        });
    });

    describe('getName method', () =>
    {
        it('returns employee name', () =>
        {
            const intern = new Intern(1, 'Bob', 'bob@gmail.com', 'Greendale Community College');
            let name = intern.getName();
            expect(name).toBe('Bob');
        });
    });

    describe('getEmail method', () =>
    {
        it('returns employee email', () =>
        {
            const intern = new Intern(1, 'Bob', 'bob@gmail.com', 'Greendale Community College');
            let email = intern.getEmail();
            expect(email).toBe('bob@gmail.com');
        });
    });

    describe('getSchool method', () =>
    {
        it('returns employee school name', () =>
        {
            const intern = new Intern(1, 'Bob', 'bob@gmail.com', 'Greendale Community College');
            let school = intern.getSchool();
            expect(school).toBe('Greendale Community College');
        });
    });

    describe('getRole method', () =>
    {
        it('returns employee role', () =>
        {
            const intern = new Intern(1, 'Bob', 'bob@gmail.com', 'Greendale Community College');
            let role = intern.getRole();
            expect(role).toBe('Intern');
        });
    });
});