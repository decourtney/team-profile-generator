const Interrogator = require('./lib/interrogator');
const fs = require('fs/promises');
const dedent = require('dedent-js');
const chalk = require('chalk');
const open = require('open');

const interrogator = new Interrogator();
const freq = 200;
let delay = 3000;
let counter = 0;

async function init()
{
    displayTitle('main');
    console.log(chalk.yellow('\t\t\t\tWELCOME TO THE TEAM BUILDER!'));
    console.log(chalk.whiteBright(`\n\t\tI'll first have ask you a few questions about your team.
                Then I'll build and present your team in your browser. 
                So let's get to work!`));

    await keyPress()

    // Load interrogator menu and wait for its return
    const team = await interrogator.loadMenu(displayTitle);

    // Display Please Wait while building html file
    waitInterval = setInterval(waitTime, freq);
    setTimeout(() => clearInterval(waitInterval), delay);

    // Test Data
    // team = [new Manager(12, 'Donovan Courtney', 'donovan.courtney@gmail.com', '555-555-5555'), new Engineer(2, 'Jimbo Bojim', 'jimbojim@gmail.com', 'jimbo')]

    createHTML(team);
}

async function createHTML(team)
{
    let employeeCards = ``;
    team.forEach(element =>
    {
        let id = element.getID();
        let name = element.getName().split(' ')[0];
        let email = element.getEmail();
        let role = element.getRole();
        let extraInfo;
        let iconAlt;

        switch (role)
        {
            case 'Manager':
                extraInfo = `Office Number: ${element.getOfficeNumber()}`;
                iconAlt = `person and a gear.`;
                break;
            case 'Engineer':
                extraInfo = `GitHub: <a class=text-blue-900 href="https://github.com/${element.getGithub()}" target=_blank rel="noreferrer noopener">${element.getGithub()}</a>`;
                iconAlt = `person with hardhat on and surrounded by gears.`
                break;
            case 'Intern':
                extraInfo = `School: ${element.getSchool()}`;
                iconAlt = `graduation cap.`
                break;
            default:
                extraInfo = `Missing extra information!`;
                break;
        }

        employeeCards +=
            `
                        <div class="block rounded-lg shadow-lg bg-gray-100 w-96 h-auto text-left mx-5 my-5">
                            <div class="py-3 px-6 rounded-t-lg border-b border-gray-300 bg-blue-500">
                                <p class=" text-white text-xl font-bold">${name.split(' ')[0]}</p>
                                <p class="text-white text-xl"><img class="inline align-top mr-2" src="../images/${role.toLowerCase()}_white.svg"
                                        alt="Icon of a ${iconAlt}"><span>${role}</span></p>
                            </div>
                            <div class="py-8 px-6">
                                <ul class="bg-white rounded-sm border border-gray-200 text-gray-900 w-full">
                                    <li class="px-3 py-2 border-b border-gray-200 w-full rounded-t-sm">ID: ${id}</li>
                                    <li class="px-3 py-2 border-b border-gray-200 w-full">Email: <a class=text-blue-900 href="mailto:${email}">${email}</a></li>
                                    <li class="px-3 py-2 border-b border-gray-200 w-full">${extraInfo}</li>
                                </ul>
                            </div>
                        </div>
            `;
    });

    const htmlTemplate = dedent(
        `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../css/outstyle.css">
            <title>Team Profile</title>
        </head>

        <body class="font-mono bg-slate-100">
            <header>
                <nav class="fixed w-full flex flex-wrap justify-between py-3 bg-gray-100 text-gray-900 shadow-lg">
                    <div class="w-full flex flex-wrap justify-center px-6">
                        <h1 id="manager-heading" class="text-4xl font-black">${team[0].getName().split(' ')[0]}'s</h1>
                    </div>
                    <div class="w-full flex flex-wrap justify-center px-6">
                        <h1 class="text-2xl font-medium">Team Profile</h1>
                    </div>
                </nav>
            </header>
            
            <main class="min-h-screen">
                <div class="flex flex-wrap justify-center py-32 w-screen">
                    <div id="employee-cards" class="flex flex-wrap justify-center max-w-7xl">

                        <!-- Cards Created in JS -->
                        ${employeeCards}

                    </div>
                </div>
            </main>

            <footer class="bg-gray-200 text-center lg:text-left">
                <div class="text-gray-700 text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
                    Created by:
                    <a class="text-gray-800" href="https://github.com/decourtney">Donovan Courtney</a>
                </div>
            </footer>
        </body>

        </html>
        `);

    writeToFile('./dist/html/index.html', htmlTemplate);
    open("./dist/html/index.html");
}

function writeToFile(fileName, data)
{
    return new Promise((resolve, reject) =>
    {
        fs.writeFile(fileName, data, function (err)
        {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

function displayTitle(val)
{
    const mainTitle =
        chalk.green.bold(` ________  ________   ______   __       __        _______   __    __  ______  __        _______   ________  _______  
|        \\|        \\ /      \\ |  \\     /  \\      |       \\ |  \\  |  \\|      \\|  \\      |       \\ |        \\|       \\ 
 \\$$$$$$$$| $$$$$$$$|  $$$$$$\\| $$\\   /  $$      | $$$$$$$\\| $$  | $$ \\$$$$$$| $$      | $$$$$$$\\| $$$$$$$$| $$$$$$$\\
   | $$   | $$__    | $$__| $$| $$$\\ /  $$$      | $$__/ $$| $$  | $$  | $$  | $$      | $$  | $$| $$__    | $$__| $$
   | $$   | $$  \\   | $$    $$| $$$$\\  $$$$      | $$    $$| $$  | $$  | $$  | $$      | $$  | $$| $$  \\   | $$    $$
   | $$   | $$$$$   | $$$$$$$$| $$\\$$ $$ $$      | $$$$$$$\\| $$  | $$  | $$  | $$      | $$  | $$| $$$$$   | $$$$$$$\\
   | $$   | $$_____ | $$  | $$| $$ \\$$$| $$      | $$__/ $$| $$__/ $$ _| $$_ | $$_____ | $$__/ $$| $$_____ | $$  | $$
   | $$   | $$     \\| $$  | $$| $$  \\$ | $$      | $$    $$ \\$$    $$|   $$ \\| $$     \\| $$    $$| $$     \\| $$  | $$
    \\$$    \\$$$$$$$$ \\$$   \\$$ \\$$      \\$$       \\$$$$$$$   \\$$$$$$  \\$$$$$$ \\$$$$$$$$ \\$$$$$$$  \\$$$$$$$$ \\$$   \\$$`);
    const pleaseWaitTitle =
        ` _______   __        ________   ______    ______   ________        __       __   ______   ______  ________ 
|       \\ |  \\      |        \\ /      \\  /      \\ |        \\      |  \\  _  |  \\ /      \\ |      \\|        \\
| $$$$$$$\\| $$      | $$$$$$$$|  $$$$$$\\|  $$$$$$\\| $$$$$$$$      | $$ / \\ | $$|  $$$$$$\\ \\$$$$$$ \\$$$$$$$$
| $$__/ $$| $$      | $$__    | $$__| $$| $$___\\$$| $$__          | $$/  $\\| $$| $$__| $$  | $$     | $$   
| $$    $$| $$      | $$  \\   | $$    $$ \\$$    \\ | $$  \\         | $$  $$$\\ $$| $$    $$  | $$     | $$   
| $$$$$$$ | $$      | $$$$$   | $$$$$$$$ _\\$$$$$$\\| $$$$$         | $$ $$\\$$\\$$| $$$$$$$$  | $$     | $$   
| $$      | $$_____ | $$_____ | $$  | $$|  \\__| $$| $$_____       | $$$$  \\$$$$| $$  | $$ _| $$_    | $$   
| $$      | $$     \\| $$     \\| $$  | $$ \\$$    $$| $$     \\      | $$$    \\$$$| $$  | $$|   $$ \\   | $$   
 \\$$       \\$$$$$$$$ \\$$$$$$$$ \\$$   \\$$  \\$$$$$$  \\$$$$$$$$       \\$$      \\$$ \\$$   \\$$ \\$$$$$$    \\$$   `;
    const missingTitle =
        ` ________  ______  ________  __        ________        __       __  ______   ______    ______   ______  __    __   ______  
|        \\|      \\|        \\|  \\      |        \\      |  \\     /  \\|      \\ /      \\  /      \\ |      \\|  \\  |  \\ /      \\ 
 \\$$$$$$$$ \\$$$$$$ \\$$$$$$$$| $$      | $$$$$$$$      | $$\\   /  $$ \\$$$$$$|  $$$$$$\\|  $$$$$$\\ \\$$$$$$| $$\\ | $$|  $$$$$$\\
   | $$     | $$     | $$   | $$      | $$__          | $$$\\ /  $$$  | $$  | $$___\\$$| $$___\\$$  | $$  | $$$\\| $$| $$ __\\$$
   | $$     | $$     | $$   | $$      | $$  \\         | $$$$\\  $$$$  | $$   \\$$    \\  \\$$    \\   | $$  | $$$$\\ $$| $$|    \\
   | $$     | $$     | $$   | $$      | $$$$$         | $$\\$$ $$ $$  | $$   _\\$$$$$$\\ _\\$$$$$$\\  | $$  | $$\\$$ $$| $$ \\$$$$
   | $$    _| $$_    | $$   | $$_____ | $$_____       | $$ \\$$$| $$ _| $$_ |  \\__| $$|  \\__| $$ _| $$_ | $$ \\$$$$| $$__| $$
   | $$   |   $$ \\   | $$   | $$     \\| $$     \\      | $$  \\$ | $$|   $$ \\ \\$$    $$ \\$$    $$|   $$ \\| $$  \\$$$ \\$$    $$
    \\$$    \\$$$$$$    \\$$    \\$$$$$$$$ \\$$$$$$$$       \\$$      \\$$ \\$$$$$$  \\$$$$$$   \\$$$$$$  \\$$$$$$ \\$$   \\$$  \\$$$$$$ `

    console.clear();
    switch (val)
    {
        case 'main':
            console.log('\n\n\n' + chalk.whiteBright('=').repeat(117) + '\n' + mainTitle + '\n' + chalk.whiteBright('=').repeat(117) + '\n');
            break;
        case 'wait':
            console.log('\n\n\n' + chalk.whiteBright('=').repeat(107) + '\n' + pleaseWaitTitle + '\n' + chalk.whiteBright('=').repeat(107) + '\n');
            break;
        default:
            console.log('\n\n\n' + chalk.whiteBright('=').repeat(123) + '\n' + missingTitle + '\n' + chalk.whiteBright('=').repeat(123) + '\n')
    }
}

function waitTime()
{
    let elipse = '.'
    console.clear();
    displayTitle('wait');
    console.log('\t\t\tWhile I assemble your team' + elipse.repeat(counter));
    counter++;
    if (counter > 3) counter = 0;
}

// Wait for key press solution courtesy of 'snesin'
// https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs/68093391#68093391
function keyPress(message, keys)
{
    const _message = message || "\nPress any key to continue...\n";
    const _keys = keys || "";
    return new Promise(function (resolve, reject)
    {
        const caseSensitive = _keys.toLowerCase() !== _keys && _keys.toUpperCase() !== _keys;
        process.stdout.write(_message);
        function keyListener(buffer)
        {
            let key = buffer.toString();
            if (key.charCodeAt(0) === 3)
            {
                process.stdin.setRawMode(false);
                process.stdin.off('data', keyListener);
                process.stdin.pause();
                console.log('^C');
                process.exit(0); // Exit process
                reject(key.charCodeAt(0)); // Throw error
            }
            const index = caseSensitive ? _keys.indexOf(key) : _keys.toLowerCase().indexOf(key.toLowerCase());
            if (_keys && index < 0)
            {
                process.stdout.write(key);
                process.stdout.write("\n");
                process.stdout.write(_message);
                return;
            }
            process.stdin.setRawMode(false);
            process.stdin.off('data', keyListener);
            process.stdin.pause();
            if (index >= 0)
            {
                key = _keys.charAt(index);
                process.stdout.write(key);
            }
            process.stdout.write("\n");
            resolve(key);
        }
        process.stdin.resume();
        process.stdin.setRawMode(true);
        process.stdin.on('data', keyListener);
    });
}

init();