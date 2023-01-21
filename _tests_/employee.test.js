const Employee = require('../lib/employee');

describe('Employee class', () => {
    describe('getID method', () =>{
        it('returns employee ID', () => {
            const employee = new Employee(1, 'Bob', 'bob@gmail.com');
            employee.getID();
            expect(1);
        });
    });

    describe('getName method', () => {
        it('returns employee name', () => {
            const employee = new Employee(1, 'Bob', 'bob@gmail.com');
            employee.getName();
            expect('Bob');
        });
    });

    describe('getEmail method', () =>
    {
        it('returns employee email', () =>
        {
            const employee = new Employee(1, 'Bob', 'bob@gmail.com');
            employee.getEmail();
            expect('bob@gmail.com');
        });
    });

    describe('getRole method', () =>
    {
        it('returns employee email', () =>
        {
            const employee = new Employee(1, 'Bob', 'bob@gmail.com');
            employee.getRole();
            expect('Employee');
        });
    });
});