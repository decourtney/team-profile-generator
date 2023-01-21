const Employee = require('./employee');

class Intern extends Employee
{
    constructor(empID, name, email, schoolName)
    {
        super(empID, name, email)
        this.schoolName = schoolName;
    }

    getSchool() { return this.schoolName; }

    getRole() { return 'Intern'; }
}

module.exports = Intern;