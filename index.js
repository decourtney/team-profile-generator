const Interrogator = require('./lib/interrogator');
const GenerateHTML = require('./lib/generatehtml');
const fs = require('fs/promises');
const chalk = require('chalk');

const Manager = require('./lib/manager'); // This is just for building and testing purpose. Remove for final

const interrogator = new Interrogator();
const freq = 200;
let delay = 3000;
let counter = 0;

async function init()
{
    const generatehtml = new GenerateHTML();
    // displayTitle('main');
    // console.log('\t\t\t\tWELCOME TO THE TEAM BUILDER!');
    // console.log(`\n\t\tThe Team Builder will first ask you a series of questions to 
    //             gather information about your team. Then it will build and 
    //             present your team via your browser. Let's get started!`);

    // await keyPress()

    // // Load interrogator menu and wait for its return
    // const team = await interrogator.loadMenu(displayTitle);
    // // console.log(team);

    // Display Please Wait while building html file
    // waitInterval = setInterval(waitTime, freq);
    // setTimeout(() => clearInterval(waitInterval), delay);

    let htmlData = generatehtml.buildHTML((new Manager(12, 'Donovan Courtney', 'donovan.courtney@gmail.com', '555-555-5555')));

    writeToFile('./index.html', htmlData);
}

function writeToFile(fileName, data)
{
    return new Promise((resolve, reject) =>
    {
        fs.writeFile(fileName, data, function(err) {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

function displayTitle(val)
{
    const mainTitle =
        ` ________  ________   ______   __       __        _______   __    __  ______  __        _______   ________  _______  
|        \\|        \\ /      \\ |  \\     /  \\      |       \\ |  \\  |  \\|      \\|  \\      |       \\ |        \\|       \\ 
 \\$$$$$$$$| $$$$$$$$|  $$$$$$\\| $$\\   /  $$      | $$$$$$$\\| $$  | $$ \\$$$$$$| $$      | $$$$$$$\\| $$$$$$$$| $$$$$$$\\
   | $$   | $$__    | $$__| $$| $$$\\ /  $$$      | $$__/ $$| $$  | $$  | $$  | $$      | $$  | $$| $$__    | $$__| $$
   | $$   | $$  \\   | $$    $$| $$$$\\  $$$$      | $$    $$| $$  | $$  | $$  | $$      | $$  | $$| $$  \\   | $$    $$
   | $$   | $$$$$   | $$$$$$$$| $$\\$$ $$ $$      | $$$$$$$\\| $$  | $$  | $$  | $$      | $$  | $$| $$$$$   | $$$$$$$\\
   | $$   | $$_____ | $$  | $$| $$ \\$$$| $$      | $$__/ $$| $$__/ $$ _| $$_ | $$_____ | $$__/ $$| $$_____ | $$  | $$
   | $$   | $$     \\| $$  | $$| $$  \\$ | $$      | $$    $$ \\$$    $$|   $$ \\| $$     \\| $$    $$| $$     \\| $$  | $$
    \\$$    \\$$$$$$$$ \\$$   \\$$ \\$$      \\$$       \\$$$$$$$   \\$$$$$$  \\$$$$$$ \\$$$$$$$$ \\$$$$$$$  \\$$$$$$$$ \\$$   \\$$`;
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
            console.log('\n\n\n' + '='.repeat(117) + '\n' + mainTitle + '\n' + '='.repeat(117) + '\n');
            break;
        case 'wait':
            console.log('\n\n\n' + '='.repeat(107) + '\n' + pleaseWaitTitle + '\n' + '='.repeat(107) + '\n');
            break;
        default:
            console.log('\n\n\n' + '='.repeat(123) + '\n' + missingTitle + '\n' + '='.repeat(123) + '\n')
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