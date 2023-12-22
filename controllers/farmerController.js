const Web3 = require('web3');

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // BSC testnet node URL

const contractAddress = '0xYourContractAddress'; // Replace with your deployed contract address on BSC testnet
const contractABI = [
  // Your contract ABI here
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Register the farmer to the blockchain
const registerFarmer = async (req, res) => {
  const { name, location } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const transaction = await contract.methods.registerFarmer(name, location).send({ from: account });

    res.json({ transactionHash: transaction.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get farmer's information from the blockchain
const getFarmerInfo = async (req, res) => {
  const farmerAddress = req.params.address;

  try {
    const result = await contract.methods.getFarmerInfo(farmerAddress).call();

    res.json({
      name: result[0],
      location: result[1],
      totalCarbonReduction: result[2],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// add sustainable practices to the blockchain
const addSustainablePractice = async (req, res) => {
  const { practiceName, carbonReduction } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const transaction = await contract.methods.addSustainablePractice(practiceName, carbonReduction).send({ from: account });

    res.json({ transactionHash: transaction.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get Sustainable farming practices from the blockchain
const getLatestSustainablePractice = async (req, res) => {
  const farmerAddress = req.params.address;

  try {
    const result = await contract.methods.getLatestSustainablePractice(farmerAddress).call();

    res.json({
      practiceName: result[0],
      carbonReduction: result[1],
      timestamp: result[2],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get the total number of sustainable practices for a farmer
const getTotalSustainablePractices = async (req, res) => {
  const farmerAddress = req.params.address;

  try {
    const result = await contract.methods.getTotalSustainablePractices(farmerAddress).call();

    res.json({ totalSustainablePractices: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all sustainable practices for a farmer
const getAllSustainablePractices = async (req, res) => {
  const farmerAddress = req.params.address;

  try {
    const result = await contract.methods.getAllSustainablePractices(farmerAddress).call();

    res.json({ sustainablePractices: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get the average carbon reduction for a farmer
const getAverageCarbonReduction = async (req, res) => {
  const farmerAddress = req.params.address;

  try {
    const result = await contract.methods.getAverageCarbonReduction(farmerAddress).call();

    res.json({ averageCarbonReduction: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Check if a farmer is registered
const isFarmerRegistered = async (req, res) => {
  const farmerAddress = req.params.address;

  try {
    const result = await contract.methods.isFarmerRegistered(farmerAddress).call();

    res.json({ isRegistered: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Transfer ownership of the contract
const transferOwnership = async (req, res) => {
  const { newOwner } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const transaction = await contract.methods.transferOwnership(newOwner).send({ from: account });

    res.json({ transactionHash: transaction.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Withdraw funds from the smart contract
const withdrawFunds = async (req, res) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const transaction = await contract.methods.withdraw().send({ from: account });

    res.json({ transactionHash: transaction.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerFarmer,
  getFarmerInfo,
  addSustainablePractice,
  getLatestSustainablePractice,
  getTotalSustainablePractices,
  getAllSustainablePractices,
  getAverageCarbonReduction,
  isFarmerRegistered,
  transferOwnership,
  withdrawFunds,
};