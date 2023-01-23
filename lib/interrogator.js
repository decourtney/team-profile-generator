const Manager = require('./manager');
const Engineer = require('./engineer');
const Intern = require('./intern');
const inquirer = require('inquirer');
const validator = require('email-validator');

class Interrogator
{
    // employee and menu fields just for questions
    // #employeeQuestions = [
    //     // {
    //     //     type: 'input',
    //     //     name: 'id',
    //     //     message: 'Enter the employee ID#:',
    //     //     validate: this.#validateIsID
    //     // },
    //     {
    //         type: 'input',
    //         name: 'name',
    //         message: `Enter the employee name:`,
    //         validate: this.#validateIsName
    //     },
    //     // {
    //     //     type: 'input',
    //     //     name: 'email',
    //     //     message: 'Enter the employee email:',
    //     //     // validate: this.#validateIsEmail
    //     // },
    // ];
    // #menuQuestions = [
    //     {
    //         type: 'list',
    //         name: 'menuOptions',
    //         message: 'What would you like to do?',
    //         choices: ['Add a team member', 'Exit and build the team']
    //     },
    //     {
    //         type: 'list',
    //         name: 'employeeRole',
    //         message: 'Choose the team members role',
    //         choices: ['Engineer', 'Intern'],
    //     },
    // ];
    #classNamesMap = { Manager, Engineer, Intern }; // Used to map a string to the matching Class

    async loadMenu(title)
    {
        // let usedIDNumbers = [];
        let answers; // answers declared for method access
        let team = []; // team declared for method access
        let ques = [];
        ques = this.#getQuestions('menu'); // reference to questions

        // ques = this.#menuQuestions; // Saved for questions

        // Start with getting Manager info and add to team
        const manager = await this.#getTeamMember('Manager'); // If time permits check for existing manager
        team.push(manager);

        // Clean up terminal and show title
        title('main');
        console.log(`\t\t\tWelcome, ${manager.name.split(' ')[0]}! Lets build your winning team!\n`);

        // Loop until user selects exit
        while (true)
        {
            // Only the first question is needed here
            answers = await this.#beginInterrogation(ques[0]);

            // Check for Exit option
            if (answers.menuOptions.split(' ')[0] === 'Exit')
            {
                // If no additional members added verify choice
                if (team.length <= 1)
                {
                    answers = await this.#beginInterrogation(ques[2]);

                    // Restart loop
                    if (!answers.isExit) { title('main'); continue; }
                }
                break;
            }

            // Now the second question
            answers = await this.#beginInterrogation(ques[1]);

            // Get new team member info and add to team
            answers = await this.#getTeamMember(answers.employeeRole);
            team.push(answers);

            // Clean up screen and show title
            title('main');
            console.log(`\t\t\t${answers.name} has been added to the team.\n`)

            // These two lines for questions
            // console.log(`Dump of local menu : ${ques}`);
            // console.log(`Dump of global menu: ${this.#menuQuestions}`);
        }

        return team;
    }

    async #getTeamMember(role)
    {
        let ques = [];
        ques = this.#getQuestions('employee');

        // These three lines for questions
        // ques = this.#employeeQuestions; // this was not working correctly
        // console.log(`Dump of local employee : ${ques}`);
        // console.log(`Dump of global employee: ${this.#employeeQuestions}`);

        // Determine which additional questions are needed based on role
        switch (role)
        {
            case 'Manager':
                ques.push({ type: 'input', name: 'extraQuestion', message: 'Enter the employee office number:', validate: this.#validateIsPhone });
                break;
            case 'Engineer':
                ques.push({ type: 'input', name: 'extraQuestion', message: 'Enter the employee GitHub username', validate: this.#validateIsGithubName });
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

    #getQuestions(val)
    {
        if (val === 'employee')
        {
            return [
                {
                    type: 'input',
                    name: 'id',
                    message: 'Enter a 3 digit employee ID# (No leading Zeros(0)):',
                    validate: this.#validateIsID
                },
                {
                    type: 'input',
                    name: 'name',
                    message: `Enter the employee name:`,
                    validate: this.#validateIsName
                },
                {
                    type: 'input',
                    name: 'email',
                    message: 'Enter the employee email:',
                    validate: this.#validateIsEmail
                },
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
                {
                    type: 'confirm',
                    name: 'isExit',
                    message: 'You haven\'t added any team members.\n\tAre you sure you want to exit?',
                    default: false
                },
            ];
        }
    }

    #validateIsID(val)
    {
        // Checks for any 3 digit number
        if (!/^([1-9][0-9][0-9])$/.test(val))
        {
            return 'Please enter a 3 digit employee ID# (No leading Zeros(0)'
        }

        return true;
    }

    #validateIsName(val)
    {
        // Checks for just about any variation of an english character name
        if (!/^[a-z ,.'-]+$/i.test(val))
        {
            return 'Please enter a valid name.'
        }

        return true;
    }

    #validateIsEmail(val)
    {
        // Module verifies a valid email address
        if (!validator.validate(val))
        {
            return 'Please enter a valid email.';
        }

        return true;
    }

    #validateIsPhone(val)
    {
        //Checks for any national number
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(val))
        {
            return 'Please enter a valid phone number.';
        }

        return true;
    }

    #validateIsGithubName(val)
    {
        // Verifies the provided name matches the GitHub username syntax
        if (/\B@(?!.*(-){2,}.*)[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\b/ig.test(val))
        {
            return 'Please enter a valid GitHub username.'
        }

        return true;
    }

    #validateIsValue(val)
    {
        // Checks for any provided value
        if (!val)
        {
            return 'Please enter a value';
        }

        return true;
    }
}

module.exports = Interrogator;