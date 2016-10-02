// INSTRUCTIONS: Build a command-line based zombie fighting game. 
// =========================================================================================================

// In this game, you and a zombie will each be given a certain amount of health. (Perhaps: You 70, Zombie 15).

// For each round, you will be asked to guess a random number between 1 and 5.
// If your guess matches the random number of the Zombie -- you inflict a random amount of damage between 1 and 5. 
// If you guess does not match the random number of the Zombie -- the Zombie inflicts a random amount of damage to you between 1 and 5.
// Each round the zombie is given a new random number and you must guess again. 

// The game ends when you or the zombie gets to 0 health. 

// Note: You should use the inquirer package to take in user commands.
// Major Warning: inquirer's prompt function is "asynchronous", which means that the majority of your game logic will need to be inside the .then() function for your propmt. 

// ===========================================================================================================
var inquirer = require("inquirer");

var playerHealth = 70;
var zombieHealth = 15;

function startGame(){

	fightZombie(playerHealth,zombieHealth);	
}

function fightZombie(playerH, zombieH){

	//Losing condition
	if(playerH <=0){
		console.log("You have died!");
	}
	//Winning condition
	else if(zombieH<=0){
		console.log("You win!");
	}

	//Continue playing
	else{

		//Propt for player guess
		inquirer.prompt([
			{
				type: "list",
				message: "Fight the Zombie, Guess a number between 1 and 5!",
				name: "guess",
				choices: ["1", "2", "3", "4", "5"]
			}
		]).then(function (choice) {

			//Random Number for zombie
			var randomNum = Math.ceil(Math.random()*5);
			console.log("Zombie rolled a "+randomNum);

			//Check your number vs the zombie number
			//Same number causes damage to zombie
			if(parseInt(choice.guess)===randomNum){
				console.log("You hit the Zombie for "+randomNum+" damage!")
				console.log("Player Health: "+playerH+" --- Zombie Health: "+zombieH);
				
				//Recursive function
				fightZombie(playerH, zombieH-randomNum);
			}

			//Different number causes zombie to hit you
			else{
				console.log("The Zombie hit you for "+randomNum+" damage!")
				console.log("Player Health: "+playerH+" --- Zombie Health: "+zombieH);

				//Recursive function
				fightZombie(playerH-randomNum, zombieH);
			}
		});
	}

}

startGame();