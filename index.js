const Interrogator = require('./lib/interrogator');

const interrogator = new Interrogator();
const title = 
` ________  ________   ______   __       __        _______   __    __  ______  __        _______   ________  _______  
|        \\|        \\ /      \\ |  \\     /  \\      |       \\ |  \\  |  \\|      \\|  \\      |       \\ |        \\|       \\ 
 \\$$$$$$$$| $$$$$$$$|  $$$$$$\\| $$\\   /  $$      | $$$$$$$\\| $$  | $$ \\$$$$$$| $$      | $$$$$$$\\| $$$$$$$$| $$$$$$$\\
   | $$   | $$__    | $$__| $$| $$$\\ /  $$$      | $$__/ $$| $$  | $$  | $$  | $$      | $$  | $$| $$__    | $$__| $$
   | $$   | $$  \\   | $$    $$| $$$$\\  $$$$      | $$    $$| $$  | $$  | $$  | $$      | $$  | $$| $$  \\   | $$    $$
   | $$   | $$$$$   | $$$$$$$$| $$\\$$ $$ $$      | $$$$$$$\\| $$  | $$  | $$  | $$      | $$  | $$| $$$$$   | $$$$$$$\\
   | $$   | $$_____ | $$  | $$| $$ \\$$$| $$      | $$__/ $$| $$__/ $$ _| $$_ | $$_____ | $$__/ $$| $$_____ | $$  | $$
   | $$   | $$     \\| $$  | $$| $$  \\$ | $$      | $$    $$ \\$$    $$|   $$ \\| $$     \\| $$    $$| $$     \\| $$  | $$
    \\$$    \\$$$$$$$$ \\$$   \\$$ \\$$      \\$$       \\$$$$$$$   \\$$$$$$  \\$$$$$$ \\$$$$$$$$ \\$$$$$$$  \\$$$$$$$$ \\$$   \\$$`
const pleaseWaitMsg = 
`
`

async function init()
{
    displayTitle();
    console.log('\t\t\t\tWELCOME TO THE TEAM BUILDER!');
    console.log(`\n\t\tThe Team Builder will first ask you a series of questions to 
                gather information about your team. Then it will build and 
                present your team via your browser. Let's get started!`);

    await keyPress()

    // Wait for createTeam return
    const team = await createTeam();

    console.log(team)
}

async function createTeam()
{
    // This function is unecessary. Can get rid of it by moving manager handling over to the interrogator menu
    // Wait for Interrogator to return
    let manager = await interrogator.getTeamMember('Manager');
    // If time permits - check for existing manager and team

    displayTitle(); // push previous questions up to make a cleaner look

    console.log(`\tOk, ${manager.name.split(' ')[0]} lets build your winning team!\n`);

    // Wait for Interrogator to return
    let team = await interrogator.loadMenu();

    // Push manager object to the front of the array
    team.unshift(manager);

    return team;
}

function displayTitle()
{
    console.log('='.repeat(117));
    console.log(title);
    console.log('='.repeat(117));
    console.log('');
}

function displayBuilding()
{
    console.log('='.repeat(117));
    console.log()
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