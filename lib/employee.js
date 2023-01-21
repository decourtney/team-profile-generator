class Employee
{
    constructor(empID, name, email)
    {
        this.empID = empID;
        this.name = name;
        this.email = email;
    }

    getID() { return this.empID; }

    getName() { return this.name; }

    getEmail() { return this.email; }

    getRole() { return 'Employee'; }
}

module.exports = Employee;