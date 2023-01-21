const Manager = require('./manager');
const Engineer = require('./engineer');
const Intern = require('./intern');
const inquirer = require('inquirer');
const validator = require('email-validator');

class Interrogator
{
    #classNamesMap = { Manager, Engineer, Intern }; // Used to map a string to the matching Class

    #beginInterrogation(q)
    {
        return new Promise((resolve, reject) =>
        {
            inquirer.prompt(q)
                .then((answers) =>
                {
                    resolve(answers)
                }).catch((err) =>
                {
                    reject(err);
                })
        })
    }

    async loadMenu()
    {
        let team = []; // team declared for method access
        let ques = []
        ques = this.#getQuestions('menu'); // reference to questions
        let answers; // answers declared for method access

        // Loop until user selects exit
        while (true)
        {
            // Only the first question is needed here
            answers = await this.#beginInterrogation(ques[0]);
            if (answers.menuOptions.split(' ')[0] === 'Exit')
            {
                break;
            }

            // Now the second question
            answers = await this.#beginInterrogation(ques[1]);

            team.push(await this.getTeamMember(answers.employeeRole));
        }

        return team;
    }

    async getTeamMember(role)
    {
        let ques = [];
        ques = this.#getQuestions('employee');

        // Determine which additional questions are needed based on role
        switch (role)
        {
            case 'Manager':
                ques.push({ type: 'input', name: 'extraQuestion', message: 'Enter the employee office number:', validate: this.#validateIsPhone });
                break;
            case 'Engineer':
                ques.push({ type: 'input', name: 'extraQuestion', message: 'Enter the employee GitHub username', validate: this.#validateIsValue });
                break;
            case 'Intern':
                ques.push({ type: 'input', name: 'extraQuestion', message: 'Enter the employee school name', validate: this.#validateIsValue });
                break;
            default:
                break;
        }

        // Start questions
        let answers = await this.#beginInterrogation(ques);

        // Build the employee object and return
        // Using the classNamesMap to match the string value of role to the Class name
        return new this.#classNamesMap[role](answers.id, answers.name.charAt(0).toUpperCase() + answers.name.slice(1).toLowerCase(), answers.email, answers.extraQuestion);
    }

    #getQuestions(val)
    {
        if (val === 'employee')
        {
            return [
                // {
                //     type: 'input',
                //     name: 'id',
                //     message: 'Enter the employee ID#:',
                //     validate: this.#validateIsID
                // },
                {
                    type: 'input',
                    name: 'name',
                    message: `Enter the employee name:`,
                    validate: this.#validateIsValue
                },
                // {
                //     type: 'input',
                //     name: 'email',
                //     message: 'Enter the employee email:',
                //     // validate: this.#validateIsEmail
                // },
            ];
        } else
        {
            return [
                {
                    type: 'list',
                    name: 'menuOptions',
                    message: 'What would you like to do?',
                    choices: ['Add a team member', 'Exit and build the team']
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Choose the team members role',
                    choices: ['Engineer', 'Intern'],
                },
            ];
        }
    }

    #validateIsID(val)
    {
        if (!/^\d+$/.test(val))
        {
            return 'Please enter the employee ID#'
        }
        return true;
    }

    #validateIsValue(val)
    {
        if (!val)
        {
            return 'Please enter a value.'
        }
        return true;
    }

    #validateIsEmail(val)
    {
        if (!validator.validate(val))
        {
            return 'Please enter a valid email.';
        }
        return true;
    }

    #validateIsPhone(val)
    {
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val))
        {
            return 'Please enter a valid phone number.';
        }
        return true;
    }
}

module.exports = Interrogator;