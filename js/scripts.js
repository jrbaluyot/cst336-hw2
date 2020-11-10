$(document).ready(function()
{
    //Global Vars
    var slotSymbols = ["img/blank square.png", "img/cherry.png", "img/lemon.png","img/bar.png", "img/seven.png", "img/jackpot.png"];
    // Each Slot Symbol index also corresponds to how they will be referenced when checking if there are matches
    var credits = 100;
    var bet = 1;
    var jackpot = 5000; //Static integer value, maybe add function to increase with more plays?
    
    //Setting initial values
    $("#credits").html(`Credits left: ${credits}`);
    $("#currentBet").html(`Current Bet: ${bet}`);
    
    //Event Listeners
    $("#playButton").click(playGame);
    
    //playGame
    function playGame()
    {
        $("#errorFeedback").html(""); // resets error feedback
        bet = $("#betSize").val();
        if (credits - bet < 0)
        {
            $("#errorFeedback").html("You don't have enough credits!");
        }
        else
        {
            var slotResults = [];   //Holds int values that correspond to each index of slotSymbols
            var randIndex = -1;     // Default value, not used
            var winnings = bet;     //Set as bet, then multiplied by predetermined slot-result outcomes
            
            for (var i = 1; i <= 3; i++)
            {
                randIndex = Math.floor(Math.random() * 5);
                if (randIndex == 3)                         //
                {                                           //Makes winning single
                    if (Math.floor(Math.random() * 2) != 0) //bars harder ;)
                    randIndex = 0;                          //
                }
                
                $(`#slot${i}pic`).attr("src", slotSymbols[randIndex]);
                slotResults[i - 1] = randIndex;
            }
            
                if (slotResults[0] == 5 && slotResults[1] == 5 && slotResults[2] == 5)      //Winnings for three jackpots
                {
                    winnings = jackpot;
                }
                else if (slotResults[0] == 4 && slotResults[1] == 4 && slotResults[2] == 4) //Winnings for three 7
                {
                    winnings *= 7;
                }
                else if (slotResults[0] == 2 && slotResults[1] == 2 && slotResults[2] == 2) //Winnings for three cherries
                {
                    winnings *= 5;
                }
                else if (slotResults[0] == 1 && slotResults[1] == 1 && slotResults[2] == 1) //Winnings for three lemons
                {
                    winnings *= 4;
                }
                else if (slotResults[0] == 3 && slotResults[1] == 3 && slotResults[2] == 3) //Winnings for three bar
                {
                    winnings *= 3;
                }
                else if ((slotResults[0] == 3 && slotResults[1] == 3)       //Winnings if bar on slot 1/2 OR 2/3
                         || (slotResults[1] == 3 && slotResults[2] == 3))
                {
                    winnings *= 2;
                }
                else if ((slotResults[0] == 3) || (slotResults[1] == 3) || (slotResults[2] == 3)) //Winnings if bar on any one
                {
                    winnings *= 1;
                }
                else
                {
                    winnings *= 0;
                }
            
            credits -= bet;
            credits += winnings;
            $("#credits").html(`Credits left: ${credits}`); //
            $("#currentBet").html(`Current Bet: ${bet}`);   // Setting new values
            $("#winnings").html(`You won: ${winnings}`);    //
        }
        return;
        
    }//end playGame()
    
})//end function()