const Manager = require('../lib/manager');

describe('Manager class', () =>
{
    describe('getID method', () =>
    {
        it('returns employee ID', () =>
        {
            const manager = new Manager(1, 'Bob', 'bob@gmail.com', '555-555-5555');
            let id = manager.getID();
            expect(id).toBe(1);
        });
    });

    describe('getName method', () =>
    {
        it('returns employee name', () =>
        {
            const manager = new Manager(1, 'Bob', 'bob@gmail.com', '555-555-5555');
            let name = manager.getName();
            expect(name).toBe('Bob');
        });
    });

    describe('getEmail method', () =>
    {
        it('returns employee email', () =>
        {
            const manager = new Manager(1, 'Bob', 'bob@gmail.com', '555-555-5555');
            let email = manager.getEmail();
            expect(email).toBe('bob@gmail.com');
        });
    });

    describe('getOfficeNumber method', () =>
    {
        it('returns employee office number', () =>
        {
            const manager = new Manager(1, 'Bob', 'bob@gmail.com', '555-555-5555');
            let number = manager.getOfficeNumber();
            expect(number).toBe('555-555-5555');
        });
    });

    describe('getRole method', () =>
    {
        it('returns employee role', () =>
        {
            const manager = new Manager(1, 'Bob', 'bob@gmail.com', '555-555-5555');
            let role = manager.getRole();
            expect(role).toBe('Manager');
        });
    });
});