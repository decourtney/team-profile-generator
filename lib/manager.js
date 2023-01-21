const Employee = require('./employee');

class Manager extends Employee
{
    constructor(empID, name, email, officeNumber)
    {
        super(empID, name, email)
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() { return this.officeNumber; }

    getRole() { return 'Manager' };
}

module.exports = Manager;