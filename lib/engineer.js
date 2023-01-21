const Employee = require('./employee');

class Engineer extends Employee
{
    constructor(empID, name, email, githubUsername)
    {
        super(empID, name, email)
        this.githubUsername = githubUsername;
    }

    getGithub() { return this.githubUsername; }

    getRole() { return 'Engineer' }
}

module.exports = Engineer;