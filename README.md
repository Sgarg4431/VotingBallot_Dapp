
# Voting Ballot

This is a simple decenterlized application (Dapp) built on Goerli testnet in which a party could register, voter could register, chairperson would allow voter to vote and chairperson could decide winner.


## Features

- ### Register
Party and Voter will be register with help of there respective  register button
- ### Allow Voter
Chairperson of Ballot will allow voters to vote then only voters can vote
- ### Chairperson
The address which has deployed the voting application will be Chairperson and its address could be get by Chairperson button
- ### Winner
only Chairperson will be able to decide Winner
- ### Details
Details of party and voter could be get by Get Voter and Get Party button


## Demo

https://voting-lilac.vercel.app/


## Tech Stack
The frontend is built using React

On the Web3 side, the contract is written in Solidity and compiled deployed,tested using hardhat. 

In this app Simply deployed smart contract using goerli testnet and copied Abi and pasted in App.js

For interaction with frontend ether.js library is used
## Limitations

- The most prominent limitation of this Voting Ballot system is that it's proper functioning is heavily dependent on how it's going to be interacted with. The buttons are not turned off (i.e. made un-clickable) at any moment. So, if a participant decides to just go ahead and randomly start clicking the buttons in between transactions, the application is mostly likely going to report an error or even worse, it may crash. Therefore, patiently wait for the transaction to complete and the updates to appear on screen

- If user tries to access any voter or party which doesnot exists, he will get alert message saying Invalid Index!

- Only the Chairperson would be able to declare winner

- Voter could only vote if they are allowed by Chairperson



 
