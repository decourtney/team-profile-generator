const Employee = require('./employee');

class Intern extends Employee
{
    constructor(name, empID, email, schoolName)
    {
        super(name, empID, email)
        this.schoolName = schoolName;
    }

    getSchool() { return this.schoolName; }

    getRole() { return 'Intern'; }
}