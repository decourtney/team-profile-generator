const Employee = require('./employee');

class Engineer extends Employee
{
    constructor(name, empID, email, githubUsername)
    {
        super(name, empID, email)
        this.githubUsername = githubUsername;
    }

    getGitHub() { return this.githubUsername; }

    getRole() { return 'Engineer' }
}