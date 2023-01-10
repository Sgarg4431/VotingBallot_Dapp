import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
const contractAddress = "0x873C3b0a84e57d70a50581DE9FEB6FEC6CE09659";
const contractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "allow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "registerParty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "registerVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "chairperson",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decideWinner",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "parties",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "noOfVotes",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "partyRegistered",
        type: "bool",
      },
      {
        internalType: "address",
        name: "partyAdd",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "voterAdd",
        type: "address",
      },
      {
        internalType: "bool",
        name: "voterRegistered",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
function App() {
  const [voterName, setVoterName] = useState();
  const [partyName, setPartyName] = useState();
  const [voterIndex, setVoterIndex] = useState();
  const [contract, setContract] = useState();
  const [partyIndex, setPartyIndex] = useState();
  const [allowVoter, setAllowVoter] = useState();
  const [voteParty, setVoteParty] = useState();
  const [account, setAccount] = useState();
  useEffect(() => {
    addWalletListener();
  }, []);
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setAccount("");
      console.log("Please install MetaMask");
    }
  };
  async function connectWallet() {
    //connect to the metamask wallet of a user
    //request account info and promp connection of a metamask account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    setContract(new ethers.Contract(contractAddress, contractAbi, signer));

    // window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    // })
  }
  async function chairperson() {
    if (contract) {
      alert(await contract.chairperson());
    } else {
      alert("connect to wallet first!");
    }
  }
  async function getVoter() {
    try {
      if (contract) {
        const voter = await contract.voters(voterIndex);
        console.log(voter);
      } else {
        alert("connect to wallet first!");
      }
    } catch (e) {
      alert("Invalid index");
    }
  }
  async function getParty() {
    try {
      if (contract) {
        const party = await contract.parties(partyIndex);
        alert(party);
      } else {
        alert("connect to wallet first!");
      }
    } catch (e) {
      alert("Invalid index");
    }
  }
  async function registerVoter() {
    if (contract) {
      try {
        const tx = await contract.registerVoter(voterName);
        await tx.wait();
        alert("Successfully registered");
      } catch (e) {
        if (e.message.search("Chairperson cannot vote") != -1) {
          alert("Chairperson cannot Vote");
        } else if (e.message.search("Voter already registered") != -1) {
          alert("Voter already registered");
        }
      }
    } else {
      alert("connect to wallet first!");
    }
  }
  async function registerParty() {
    if (contract) {
      try {
        console.log(partyName);
        const tx = await contract.registerParty(partyName);
        await tx.wait();
        alert("succesfully done");
      } catch (e) {
        if (e.message.search("Chairperson cannot form party") != -1) {
          alert("Chairperson cannot form party");
        } else if (e.message.search("Party already registered") != -1) {
          alert("Party already registered");
        }
      }
    } else {
      alert("connect to wallet first!");
    }
  }
  async function allow() {
    try {
      if (contract) {
        await contract.allow(allowVoter);
      } else {
        alert("connect to wallet first!");
      }
    } catch (e) {
      if (e.message.search("Only chairperson can allow") != -1)
        alert("Only chairperson can allow");
      else if (e.message.search("Voter not registered") != -1)
        alert("Voter not registered");
    }
  }
  async function vote() {
    try {
      if (contract) {
        await contract.vote(voteParty);
      } else {
        alert("connect to wallet first!");
      }
    } catch (e) {
      if (e.message.search("Chairperson cannot vote") != -1) {
        alert("Chairperson cannot vote");
      } else if (e.message.search("Party not registered") != -1) {
        alert("Party not registered");
      } else if (e.message.search("Voter not registered") != -1) {
        alert("Voter not registered");
      } else if (e.message.search("Voter not allowed") != -1) {
        alert("Voter not allowed");
      } else if (e.message.search("Voter voted already") != -1) {
        alert("Voter voted already");
      }
    }
  }
  async function decideWinner() {
    if (contract) {
      try {
        alert(await contract.decideWinner());
      } catch (e) {
        if (e.message.search("Only chairperson can decide") != -1)
          alert("Only chairperson can decide");
      }
    } else {
      alert("connect to wallet first!");
    }
  }
  const style1 = {
    paddingLeft: "800px",
    display: "inline-block",
  };
  const style2 = {
    paddingLeft: "5px",
    display: "inline-block",
  };
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="/logo192.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{" "}
            <h1 style={style2}>VOTING BALLOT</h1>
            <h3 style={style1}>
              {account ? (
                <button>
                  {account.slice(0, 5) + "....." + account.slice(38, 42)}
                </button>
              ) : (
                <button onClick={connectWallet}>Connect wallet</button>
              )}
            </h3>
            <br></br>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div class="bg-img">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ButtonGroup>
          <Button onClick={registerVoter} style={{ marginLeft: "10px" }}>
            Register voter
          </Button>
          <input
            onChange={(e) => setVoterName(e.target.value)}
            placeholder="Voter name"
            style={{ marginLeft: "10px" }}
          />
          <Button onClick={registerParty} style={{ marginLeft: "10px" }}>
            Register Party{" "}
          </Button>
          <input
            onChange={(e) => setPartyName(e.target.value)}
            placeholder="Party name"
            style={{ marginLeft: "10px" }}
          />
          <br></br>
          <br></br>
          <Button onClick={getVoter} style={{ marginLeft: "10px" }}>
            Get Voter
          </Button>
          <input
            onChange={(e) => setVoterIndex(e.target.value)}
            placeholder="Voter index"
            style={{ marginLeft: "10px" }}
          />
          <br></br>
          <br></br>
          <Button onClick={getParty} style={{ marginLeft: "10px" }}>
            Get Party
          </Button>
          <input
            onChange={(e) => setPartyIndex(e.target.value)}
            placeholder="Party index"
            style={{ marginLeft: "10px" }}
          />
        </ButtonGroup>
        <br></br>
        <br></br>

        <ButtonGroup>
          <Button onClick={allow}>Allow Voter</Button>
          <input
            onChange={(e) => setAllowVoter(e.target.value)}
            placeholder="Voter address"
            style={{ marginLeft: "10px" }}
          />
          <br></br>
          <br></br>
          <Button onClick={vote} style={{ marginLeft: "10px" }}>
            Vote
          </Button>
          <input
            onChange={(e) => setVoteParty(e.target.value)}
            placeholder="Voter address"
            style={{ marginLeft: "10px" }}
          />
        </ButtonGroup>
        <br></br>
        <br></br>
        <Button onClick={decideWinner} style={{ marginLeft: "10px" }}>
          Winner
        </Button>
        <Button onClick={chairperson} style={{ marginLeft: "10px" }}>
          chairperson
        </Button>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default App;
