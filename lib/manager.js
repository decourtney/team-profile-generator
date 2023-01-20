const Employee = require('./employee');

class Manager extends Employee
{
    constructor(name, empID, email, officeNumber)
    {
        super(name, empID, email)
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() { return this.officeNumber; }

    getRole() { return 'Manager' };
}