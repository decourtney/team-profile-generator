class Employee
{
    constructor(name, empID, email)
    {
        this.name = name;
        this.empID = empID;
        this.email = email;
    }

    getName() { return this.name; }

    getId() { return this.empID; }

    getEmail() { return this.email; }

    getRole() { return 'Employee'; }
}