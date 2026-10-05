/*
   ▄████  ▄▄▄      ███▄ ▄███▓ ▓█████     ▄▄▄      ██▓███    ██
▒ ██▒ ▀█▒▒████▄   ▓██▒▀█▀ ██▒ ▓█   ▀    ▒████▄   ▓██░  ██ ▒▓██
░▒██░▄▄▄░▒██  ▀█▄ ▓██    ▓██░ ▒███      ▒██  ▀█▄ ▓██░ ██▓▒░▒██
░░▓█  ██▓░██▄▄▄▄██▒██    ▒██  ▒▓█  ▄    ░██▄▄▄▄██▒██▄█▓▒ ▒ ░██
░▒▓███▀▒░▒▓█   ▓██▒██▒   ░██▒▒░▒████     ▓█   ▓██▒██▒ ░  ░ ░██
 ░▒   ▒  ░▒▒   ▓▒█░ ▒░   ░  ░░░░ ▒░      ▒▒   ▓▒█▒▓▒░ ░  ░ ░▓ 
  ░   ░  ░ ░   ▒▒ ░  ░      ░░ ░ ░        ░   ▒▒ ░▒ ░       ▒ 
░ ░   ░ ░  ░   ▒  ░      ░       ░        ░   ▒  ░░         ▒ 
      ░        ░         ░   ░   ░            ░             ░ 

                               Version 1.0.2
                  Discord: https://discord.gg/EdznDm8dDk
*/

var RAW = [
    ["A Bite at Freddy's", "Game", "Fan-made FNAF horror with cameras, lights, and power management.", "https://cool-bonbon-0942cb.netlify.app/A_Bite_at_Freddy_s/1.png", "https://cool-bonbon-0942cb.netlify.app/A_Bite_at_Freddy_s/2.html"],
    ["A Dance of Fire and Ice", "Game", "Guide two orbiting dots through twisting rhythm paths.", "https://cool-bonbon-0942cb.netlify.app/A_Dance_of_Fire_and_Ice/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/A_Dance_of_Fire_and_Ice/2.html"],
    ["A Dark Room", "Game", "A minimalist text adventure that slowly unfolds its mystery.", "https://cool-bonbon-0942cb.netlify.app/A_Dark_Room/1.png", "https://cool-bonbon-0942cb.netlify.app/A_Dark_Room/2.html"],
    ["A Small World Cup", "Game", "Hilarious ragdoll soccer. Slam your player to score outrageous goals.", "https://cool-bonbon-0942cb.netlify.app/A_Small_World_Cup/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/A_Small_World_Cup/2.html"],
    ["Achievement Unlocked", "Game", "Unlock all 99 achievements in one chaotic room.", "https://cool-bonbon-0942cb.netlify.app/Achievement_Unlocked/1.png", "https://cool-bonbon-0942cb.netlify.app/Achievement_Unlocked/2.html"],
    ["Adventure Capitalist", "Game", "Grow a business empire from one lemonade stand to the stars.", "https://cool-bonbon-0942cb.netlify.app/Adventure_Capitalist/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Adventure_Capitalist/2.html"],
    ["Amaze", "Game", "Roll the ball and paint every square to clear each maze puzzle.", "https://cool-bonbon-0942cb.netlify.app/Amaze/1.png", "https://cool-bonbon-0942cb.netlify.app/Amaze/2.html"],
    ["Angry Birds", "Game", "Slingshot birds at greedy pigs and topple their forts.", "https://cool-bonbon-0942cb.netlify.app/Angry_Birds/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Angry_Birds/2.html"],
    ["Arthur's Nightmare", "Game", "Survive creepy nights in this Arthur fan-made horror game.", "https://cool-bonbon-0942cb.netlify.app/Arthurs_Nightmare/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Arthurs_Nightmare/2.html"],
    ["Backrooms", "Game", "Wander endless yellow hallways. Manage stamina and avoid what lurks.", "https://cool-bonbon-0942cb.netlify.app/BackRooms/1.png", "https://cool-bonbon-0942cb.netlify.app/BackRooms/2.html"],
    ["Bad Parenting", "Game", "Psychological horror. Solve disturbing puzzles and unravel the mystery of Mr. Red.", "https://cool-bonbon-0942cb.netlify.app/BadParenting/1.png", "https://cool-bonbon-0942cb.netlify.app/BadParenting/2.html"],
    ["Baldi's Basics", "Game", "Collect all 7 notebooks and escape before Baldi catches you.", "https://cool-bonbon-0942cb.netlify.app/Baldi_s_Basics/1.png", "https://cool-bonbon-0942cb.netlify.app/Baldi_s_Basics/2.html"],
    ["Bank Robbery 2", "Game", "Plan tactical heists, drill into vaults, and escape with maximum loot.", "https://cool-bonbon-0942cb.netlify.app/Bank_Robbery_2/1.png", "https://cool-bonbon-0942cb.netlify.app/Bank_Robbery_2/2.html"],
    ["Basket Random", "Game", "Fast-paced physics basketball with randomized players, courts, and balls.", "https://cool-bonbon-0942cb.netlify.app/BasketRandom/1.png", "https://cool-bonbon-0942cb.netlify.app/BasketRandom/2.html"],
    ["Bendy and the Ink Machine", "Game", "Vintage animation studio turned nightmare puzzle-horror.", "https://cool-bonbon-0942cb.netlify.app/Bendy_and_the_Ink_Machine/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Bendy_and_the_Ink_Machine/2.html"],
    ["Bendy and the Ink Machine: Full Set", "Game", "The complete horror mystery of Joey Drew Studios across all chapters.", "https://cool-bonbon-0942cb.netlify.app/Bendy_and_the_Ink_Machine_full_set/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Bendy_and_the_Ink_Machine_full_set/2.html"],
    ["Big Shot Boxing", "Game", "Dodge, jab, and knockout your way to the championship belt.", "https://cool-bonbon-0942cb.netlify.app/Big_Shot_Boxing/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Big_Shot_Boxing/2.html"],
    ["BitLife", "Game", "Make choices from birth to death in this text life simulator.", "https://cool-bonbon-0942cb.netlify.app/Bitlife/1.png", "https://cool-bonbon-0942cb.netlify.app/Bitlife/2.html"],
    ["Block Blast", "Game", "Place colorful blocks and clear lines in this puzzle classic.", "https://cool-bonbon-0942cb.netlify.app/Block_Blast/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Block_Blast/2.html"],
    ["Blood Tournament", "Game", "Brutal ragdoll fighting with waves of enemies and big weapons.", "https://cool-bonbon-0942cb.netlify.app/Blood_Tournament/1.png", "https://cool-bonbon-0942cb.netlify.app/Blood_Tournament/2.html"],
    ["Bloxorz", "Game", "Classic 3D puzzle game. Roll the block into the square hole.", "https://cool-bonbon-0942cb.netlify.app/BloxorZ/1.png", "https://cool-bonbon-0942cb.netlify.app/BloxorZ/2.html"],
    ["Boba Simulator", "Game", "Mix and serve boba drinks in your own cozy little shop.", "https://cool-bonbon-0942cb.netlify.app/Boba_Simulator/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Boba_Simulator/2.html"],
    ["Bottle Cracks", "Game", "Slice and crack bottles in satisfying puzzle chains.", "https://cool-bonbon-0942cb.netlify.app/Bottle_Cracks/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Bottle_Cracks/2.html"],
    ["Bounce Back", "Game", "Keep the ball bouncing and clear every tricky level.", "https://cool-bonbon-0942cb.netlify.app/Bounce_Back/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Bounce_Back/2.html"],
    ["Boxing Random", "Game", "Goofy physics boxing with random fighters and wild one-punch KOs.", "https://cool-bonbon-0942cb.netlify.app/Boxing_Random/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Boxing_Random/2.html"],
    ["Brotato", "Game", "Survive alien waves as a potato armed with up to six weapons at once.", "https://cool-bonbon-0942cb.netlify.app/Brotato/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Brotato/2.html"],
    ["Burrito Bison: Launcha Libre", "Game", "Launch Burrito Bison through gummy bears with wild power-ups.", "https://cool-bonbon-0942cb.netlify.app/Burrito_Bison__Launcha_Libre/1.png", "https://cool-bonbon-0942cb.netlify.app/Burrito_Bison__Launcha_Libre/2.html"],
    ["Capybara Clicker", "Game", "Click your way to capybara glory with exciting upgrades.", "https://cool-bonbon-0942cb.netlify.app/Capybarra_Clicker/1.webp", "https://cool-bonbon-0942cb.netlify.app/Capybarra_Clicker/2.html"],
    ["ChatGPT", "ai", "Powerful AI assistant for questions, ideas, and code help.", "https://cool-bonbon-0942cb.netlify.app/ChatGPT/1.jpg", "https://cool-bonbon-0942cb.netlify.app/ChatGPT/2.html"],
    ["Chess Classic", "Game", "Play chess against the computer or a friend, with hints and difficulty levels.", "https://cool-bonbon-0942cb.netlify.app/Classic_Chess/1.png", "https://cool-bonbon-0942cb.netlify.app/Classic_Chess/2.html"],
    ["Cluster Truck", "Game", "Leap across a highway of speeding, crashing trucks.", "https://cool-bonbon-0942cb.netlify.app/Cluster_Truck/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Cluster_Truck/2.html"],
    ["Cookie Clicker", "Game", "Bake trillions of cookies and unlock hundreds of upgrades.", "https://cool-bonbon-0942cb.netlify.app/Cookie_Clicker/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Cookie_Clicker/2.html"],
    ["Core Ball", "Game", "Pin all your dots into the spinning core without any collisions.", "https://cool-bonbon-0942cb.netlify.app/CoreBall/1.png", "https://cool-bonbon-0942cb.netlify.app/CoreBall/2.html"],
    ["Crossy Road", "Game", "Dodge traffic, hop across logs, and collect coins in this endless hopper.", "https://cool-bonbon-0942cb.netlify.app/Crossy_Road/1.png", "https://cool-bonbon-0942cb.netlify.app/Crossy_Road/2.html"],
    ["Death Run 3D", "Game", "Sprint through neon 3D tunnels where instant reactions are everything.", "https://cool-bonbon-0942cb.netlify.app/Death_Run_3D/1.png", "https://cool-bonbon-0942cb.netlify.app/Death_Run_3D/2.html"],
    ["Drift Boss", "Game", "One-button drifting. Keep your car on the winding road without falling.", "https://cool-bonbon-0942cb.netlify.app/Drift_Boss/1.png", "https://cool-bonbon-0942cb.netlify.app/Drift_Boss/2.html"],
    ["Elastic Man", "Game", "Stretchy 3D physics sandbox with real-time facial physics.", "https://cool-bonbon-0942cb.netlify.app/Elastic_Man/1.png", "https://cool-bonbon-0942cb.netlify.app/Elastic_Man/2.html"],
    ["Escape Road", "Game", "Speed through traffic, dodge police, and make your great getaway.", "https://cool-bonbon-0942cb.netlify.app/Escape_Road/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Escape_Road/2.html"],
    ["Five Night's at Shrek's Hotel", "Game", "Take a cheap room at Shrek's Hotel and survive five nights of strange tasks.", "https://cool-bonbon-0942cb.netlify.app/Five_Night_s_at_Shrek_s_Hotel/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Night_s_at_Shrek_s_Hotel/2.html"],
    ["Five Nights at Candy's", "Game", "Night watch at Candy's Burgers and Fries. Watch the cameras.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Candys_1/1.webp", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Candys_1/2.html"],
    ["Five Nights at Candy's 2", "Game", "Lure animatronics away and survive five nightmarish shifts.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Candys_2/1.webp", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Candys_2/2.html"],
    ["Five Nights at Freddy's", "Game", "Survive the night shift at Freddy Fazbear's Pizza while avoiding animatronics.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s/2.html"],
    ["Five Nights at Freddy's 2", "Game", "Monitor cameras and survive the new cast of animatronics.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_of_Freddy_s_2/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_of_Freddy_s_2/2.html"],
    ["Five Nights at Freddy's 3", "Game", "Survive five nights monitoring cameras inside Fazbear's Fright.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s_3/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s_3/2.html"],
    ["Five Nights at Freddy's 4", "Game", "Defend your bedroom from the Nightmares using only a flashlight.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s_4/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s_4/2.html"],
    ["Five Nights at Freddy's: Ultimate Custom Night", "Game", "Pick from 50 animatronics and set the difficulty from 0 to 20.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s__Ultimate_Custom_Night/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Freddy_s__Ultimate_Custom_Night/2.html"],
    ["Five Nights at Last Breath", "Game", "An intense FNAF fan project that pushes your reaction speed to the limit.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Last_Breath/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Last_Breath/2.html"],
    ["Five Nights at Winston's", "Game", "Survive night shifts evading Winston and his unsettling animatronics.", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Winston_s/1.png", "https://cool-bonbon-0942cb.netlify.app/Five_Nights_at_Winston_s/2.html"],
    ["Flappy Dunk", "Game", "Tap to guide a winged basketball through series of hoops.", "https://cool-bonbon-0942cb.netlify.app/Flappy_Dunk/1.png", "https://cool-bonbon-0942cb.netlify.app/Flappy_Dunk/2.html"],
    ["FNAF 4", "Game", "Survive the night with a flashlight against the Nightmare animatronics.", "https://cool-bonbon-0942cb.netlify.app/FNAF_4/1.png", "https://cool-bonbon-0942cb.netlify.app/FNAF_4/2.html"],
    ["Five Night's at Epstein's", "Game", "A FNAF fan parody mixing security survival with surreal horror.", "https://cool-bonbon-0942cb.netlify.app/FNAF_Epstein_s/1.png", "https://cool-bonbon-0942cb.netlify.app/FNAF_Epstein_s/2.html"],
    ["Football Legends", "Game", "Pull off special shots in fast 1v1 and 2v2 soccer matches.", "https://cool-bonbon-0942cb.netlify.app/Football_Legends/1.png", "https://cool-bonbon-0942cb.netlify.app/Football_Legends/2.html"],
    ["Friday Night Funkin'", "Game", "Hit notes in time with the music and out-rap every challenger.", "https://cool-bonbon-0942cb.netlify.app/Friday_Night_Funkin/1.webp", "https://cool-bonbon-0942cb.netlify.app/Friday_Night_Funkin/2.html"],
    ["Geometry Dash", "Game", "Jump and fly through rhythm-based obstacle courses set to music.", "https://cool-bonbon-0942cb.netlify.app/Geometry_Dash/1.png", "https://cool-bonbon-0942cb.netlify.app/Geometry_Dash/2.html"],
    ["Geometry Dash Lite (REMAKE)", "Game", "Rhythm-based platforming rebuilt for the web. Jump, fly, and flip through danger.", "https://cool-bonbon-0942cb.netlify.app/Geometry_Dash_Lite_REMAKE/1.png", "https://cool-bonbon-0942cb.netlify.app/Geometry_Dash_Lite_REMAKE/2.html"],
    ["Gobble", "Game", "Play as a hungry monster and swallow everything in sight.", "https://cool-bonbon-0942cb.netlify.app/Gobble/1.png", "https://cool-bonbon-0942cb.netlify.app/Gobble/2.html"],
    ["Granny", "Game", "Escape Granny's house quietly. She hears everything.", "https://cool-bonbon-0942cb.netlify.app/Granny/1.png", "https://cool-bonbon-0942cb.netlify.app/Granny/2.html"],
    ["Granny 2", "Game", "Escape the creepy house of Granny and Grandpa without making a sound.", "https://cool-bonbon-0942cb.netlify.app/Granny_2/1.png", "https://cool-bonbon-0942cb.netlify.app/Granny_2/2.html"],
    ["Gunspin", "Game", "Time your shots and use recoil to send your firearm flying.", "https://cool-bonbon-0942cb.netlify.app/Gun_Spin/1.png", "https://cool-bonbon-0942cb.netlify.app/Gun_Spin/2.html"],
    ["Harvest Moon 64", "Game", "Tend your farm, raise livestock, and build friendships in the classic N64 life sim.", "https://cool-bonbon-0942cb.netlify.app/Harvest_moon_64/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Harvest_moon_64/2.html"],
    ["Haunted School", "Game", "Solve puzzles and banish vengeful spirits before it is too late.", "https://cool-bonbon-0942cb.netlify.app/Haunted_School/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Haunted_School/2.html"],
    ["Ice Fishing", "Game", "Drill through frozen lakes and reel in record catches.", "https://cool-bonbon-0942cb.netlify.app/Ice_Fishing/1.webp", "https://cool-bonbon-0942cb.netlify.app/Ice_Fishing/2.html"],
    ["Idle Dice", "Game", "Roll dice, stack multipliers, and prestige for huge scores.", "https://cool-bonbon-0942cb.netlify.app/Idle_Dice/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Idle_Dice/2.html"],
    ["Indian Truck Simulator", "Game", "Drive heavy cargo trucks across winding mountain passes and busy streets.", "https://cool-bonbon-0942cb.netlify.app/Indian_Truck_Simulator/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Indian_Truck_Simulator/2.html"],
    ["Infinite Craft", "Game", "Combine the four elements to discover thousands of unique items.", "https://cool-bonbon-0942cb.netlify.app/Infinite_Craft/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Infinite_Craft/2.html"],
    ["Minecraft", "Game", "Explore infinite blocky worlds, build structures, and survive monsters.", "https://cool-bonbon-0942cb.netlify.app/Minecraft/1.png", "https://cool-bonbon-0942cb.netlify.app/Minecraft/2.html"],
    ["Minecraft 1.16.5", "Game", "Build, craft, and survive in the classic block sandbox.", "https://cool-bonbon-0942cb.netlify.app/Minecraft_1165/1.png", "https://cool-bonbon-0942cb.netlify.app/Minecraft_1165/2.html"],
    ["Minecraft 26.2", "Game", "Build, craft, and survive in the newest Minecraft version.", "https://cool-bonbon-0942cb.netlify.app/Minecraft_262/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Minecraft_262/2.html"],
    ["Monster Tracks", "Game", "Drive monster trucks over treacherous terrain without flipping.", "https://cool-bonbon-0942cb.netlify.app/Monster_Tracks/1.png", "https://cool-bonbon-0942cb.netlify.app/Monster_Tracks/2.html"],
    ["Noob Miner", "Game", "Mine ores, trade, and upgrade to help Noob escape prison.", "https://cool-bonbon-0942cb.netlify.app/Noob_Miner/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Noob_Miner/2.html"],
    ["Ragdoll Archers", "Game", "Master arrow physics and tear through waves of enemy archers.", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_Archers/1.png", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_Archers/2.html"],
    ["Ragdoll Drop", "Game", "Drop, flop, and tumble through chaotic ragdoll challenges.", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_Drop/1.webp", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_Drop/2.html"],
    ["Ragdoll Hit", "Game", "Chaotic physics combat. Punch, kick, and slam stickman opponents.", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_Hit/1.png", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_Hit/2.html"],
    ["Ragdoll Soccer", "Game", "Hilarious physics soccer with floppy ragdoll players and wild goals.", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_soccer/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Ragdoll_soccer/2.html"],
    ["Recoil", "Game", "Master weapon recoil to launch, bounce, and blast your way through levels.", "https://cool-bonbon-0942cb.netlify.app/Recoil/1.png", "https://cool-bonbon-0942cb.netlify.app/Recoil/2.html"],
    ["RERUN", "Game", "High-speed 3D platformer where momentum is everything.", "https://cool-bonbon-0942cb.netlify.app/RERUN/1.png", "https://cool-bonbon-0942cb.netlify.app/RERUN/2.html"],
    ["Retro Bowl", "Game", "Retro 8-bit football with roster management and gridiron action.", "https://cool-bonbon-0942cb.netlify.app/Retro_Bowl/1.png", "https://cool-bonbon-0942cb.netlify.app/Retro_Bowl/2.html"],
    ["Rocket League", "Game", "High-flying car soccer with boosts, flips, and aerial goals.", "https://cool-bonbon-0942cb.netlify.app/Rocket_league/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Rocket_league/2.html"],
    ["Run 1", "Game", "Sprint, jump, and skate through outer-space platforms without falling.", "https://cool-bonbon-0942cb.netlify.app/Run_1/1.png", "https://cool-bonbon-0942cb.netlify.app/Run_1/2.html"],
    ["SCP: Containment Breach", "Game", "Survive a facility breach and avoid anomalous entities like SCP-173.", "https://cool-bonbon-0942cb.netlify.app/SCP__Containment_Breach/1.png", "https://cool-bonbon-0942cb.netlify.app/SCP__Containment_Breach/2.html"],
    ["Skibidi Toilet.io", "Game", "Chaotic .io battle mayhem inspired by the Skibidi Toilet phenomenon.", "https://cool-bonbon-0942cb.netlify.app/Skibidi_toiletio/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Skibidi_toiletio/2.html"],
    ["Slender: The 8 Pages", "Game", "Collect all eight pages before the Slenderman finds you.", "https://cool-bonbon-0942cb.netlify.app/Slender__The_8_Pages/1.png", "https://cool-bonbon-0942cb.netlify.app/Slender__The_8_Pages/2.html"],
    ["Slime Rancher", "Game", "Run a ranch full of adorable bouncy slimes.", "https://cool-bonbon-0942cb.netlify.app/Slime_Rancher/1.png", "https://cool-bonbon-0942cb.netlify.app/Slime_Rancher/2.html"],
    ["Slope", "Game", "Ride a ball down an endless neon slope as the speed keeps climbing.", "https://cool-bonbon-0942cb.netlify.app/Slope/1.png", "https://cool-bonbon-0942cb.netlify.app/Slope/2.html"],
    ["Slow Roads", "Game", "Cruise endlessly through scenic landscapes with lo-fi music. No timers, no pressure.", "https://cool-bonbon-0942cb.netlify.app/Slowroads/1.png", "https://cool-bonbon-0942cb.netlify.app/Slowroads/2.html"],
    ["Snowball.io", "Game", "Roll giant snowballs and knock rivals off the floating ice arena.", "https://cool-bonbon-0942cb.netlify.app/Snow_Ball/1.png", "https://cool-bonbon-0942cb.netlify.app/Snow_Ball/2.html"],
    ["Snow Rider 3D", "Game", "Sled endless snowy slopes while dodging obstacles and collecting gifts.", "https://cool-bonbon-0942cb.netlify.app/SnowRider3D/1.png", "https://cool-bonbon-0942cb.netlify.app/SnowRider3D/2.html"],
    ["Sonic.EXE", "Game", "The original creepypasta platformer. Survive distorted levels as Tails, Knuckles, and Eggman.", "https://cool-bonbon-0942cb.netlify.app/SonicEXE/1.png", "https://cool-bonbon-0942cb.netlify.app/SonicEXE/2.html"],
    ["Sonic.EXE 2", "Game", "The dark follow-up to the creepypasta platformer. Outrun the demonic hedgehog.", "https://cool-bonbon-0942cb.netlify.app/SonicEXE_2/1.png", "https://cool-bonbon-0942cb.netlify.app/SonicEXE_2/2.html"],
    ["Space Waves", "Game", "Weave a wave through space tunnels without touching the walls.", "https://cool-bonbon-0942cb.netlify.app/Space_Waves/1.png", "https://cool-bonbon-0942cb.netlify.app/Space_Waves/2.html"],
    ["Spacebar Clicker", "Game", "Mash the spacebar and upgrade your way to infinite clicks.", "https://cool-bonbon-0942cb.netlify.app/Spacebar_clicker/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Spacebar_clicker/2.html"],
    ["Sprunki Clicker", "Game", "Click, collect, and unlock Sprunki characters in this fan-made clicker.", "https://cool-bonbon-0942cb.netlify.app/Sprunki_Clicker/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Sprunki_Clicker/2.html"],
    ["Stickman Climb", "Game", "Climb treacherous cliffs with a stickman and physics-based control.", "https://cool-bonbon-0942cb.netlify.app/Stickman_Climb/1.png", "https://cool-bonbon-0942cb.netlify.app/Stickman_Climb/2.html"],
    ["Super Liquid Soccer", "Game", "Fast-paced soccer with floppy ragdoll players and wild shots.", "https://cool-bonbon-0942cb.netlify.app/Super_liquid_soccer/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Super_liquid_soccer/2.html"],
    ["Super Mario Bros", "Game", "Run, jump, and stomp through the Mushroom Kingdom in the classic platformer.", "https://cool-bonbon-0942cb.netlify.app/Super_mario_bros/1.jpeg", "https://cool-bonbon-0942cb.netlify.app/Super_mario_bros/2.html"],
    ["Survival Race", "Game", "Outrun hazards and rival drivers in an explosive racing gauntlet.", "https://cool-bonbon-0942cb.netlify.app/Survival_Race/1.png", "https://cool-bonbon-0942cb.netlify.app/Survival_Race/2.html"],
    ["Temple Run 2", "Game", "Escape with the cursed idol while demon monkeys chase you down.", "https://cool-bonbon-0942cb.netlify.app/Temple_Run_2/1.jpg", "https://cool-bonbon-0942cb.netlify.app/Temple_Run_2/2.html"],
    ["Throw a Potato", "Game", "Fling a potato as far as you possibly can.", "https://cool-bonbon-0942cb.netlify.app/Throw_a_potato/1.png", "https://cool-bonbon-0942cb.netlify.app/Throw_a_potato/2.html"],
    ["Tiny Fishing", "Game", "Cast your line, catch fish, and upgrade your rod to reach the depths.", "https://cool-bonbon-0942cb.netlify.app/Tiny_Fishing/1.png", "https://cool-bonbon-0942cb.netlify.app/Tiny_Fishing/2.html"],
    ["Toss The Turtle", "Game", "Launch a turtle as far as possible with cannons, rockets, and gadgets.", "https://cool-bonbon-0942cb.netlify.app/Toss_The_Turtle/1.png", "https://cool-bonbon-0942cb.netlify.app/Toss_The_Turtle/2.html"]
    ["X", "AI", "I made this.", "https://Xapp6.b-cdn.net/Files/Images/jpbls.png", "https://Xapp6.b-cdn.net/X.html"],
];

var STASH_GAMES = [];
for (var i = 0; i < RAW.length; i++) {
    var e = RAW[i];
    STASH_GAMES.push({ id: i + 1, name: e[0], cat: e[1], desc: e[2], img: e[3], url: e[4] });
}

window.STASH_GAMES = STASH_GAMES;

window.StashAPI = {
    all: function () { return STASH_GAMES.slice(); },
    games: function () { return STASH_GAMES.filter(function (g) { return (g.cat || 'Game') === 'Game'; }); },
    apps: function () { return STASH_GAMES.filter(function (g) { return (g.cat || 'Game') !== 'Game'; }); },
    find: function (q) {
        var n = String(q || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        var r = [];
        for (var k = 0; k < STASH_GAMES.length; k++) {
            var nn = STASH_GAMES[k].name.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (nn === n) return STASH_GAMES[k];
            if (nn.indexOf(n) > -1) r.push(STASH_GAMES[k]);
        }
        return r.length === 1 ? r[0] : r;
    }
};
