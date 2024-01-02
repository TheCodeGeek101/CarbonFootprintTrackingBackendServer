const contractABI = [
  {
    "inputs":[],
    "stateMutability":"nonpayable",
    "type":"constructor"},
    {
      "anonymous":false,
      "inputs":[
        {
          "indexed":true,
        "internalType":"address",
        "name":"farmer",
        "type":"address"
       },
      {
        "indexed":false,
        "internalType":"string",
        "name":"name",
        "type":"string"
      },
      {
        "indexed":false,
        "internalType":"string",
        "name":"location",
        "type":"string"
      }],
      "name":"FarmerUpdated",
      "type":"event"
    },
    {
      "anonymous":false,
      "inputs":[
        {
          "indexed":true,
          "internalType":"address",
          "name":"farmer",
          "type":"address"
        },
        {
          "indexed":false,
          "internalType":"string",
          "name":"practiceName",
          "type":"string"
        },
        {
          "indexed":false,
          "internalType":"uint256",
          "name":"carbonReduction",
          "type":"uint256"
        },
        {
          "indexed":false,
          "internalType":"uint256",
          "name":"timestamp",
          "type":"uint256"}
        ],
          "name":"SustainablePracticeAdded",
          "type":"event"
        },
        {
          "inputs":[
            {
              "internalType":"string",
              "name":"_practiceName",
              "type":"string"
            },
            {
              "internalType":"uint256",
              "name":"_carbonReduction",
              "type":"uint256"
            }
          ],
          "name":"addSustainablePractice",
          "outputs":[],
          "stateMutability":"nonpayable",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"",
              "type":"address"
            }
          ],
          "name":"farmers",
          "outputs":[
            {
              "internalType":"string",
              "name":"name",
              "type":"string"
            },
            {
              "internalType":"string",
              "name":"location",
              "type":"string"
            },
            {
              "internalType":"uint256",
              "name":"totalCarbonReduction",
              "type":"uint256"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_farmer",
              "type":"address"
            }
          ],
          "name":"getAllSustainablePractices",
          "outputs":[
            {
              "components":[
                {
                  "internalType":"string",
                  "name":"practiceName",
                  "type":"string"
                },
                {
                  "internalType":"uint256",
                  "name":"carbonReduction",
                  "type":"uint256"
                },
                {
                  "internalType":"uint256",
                  "name":"timestamp",
                  "type":"uint256"
                }
              ],
              "internalType":"struct CarbonFootprintTracking.SustainablePractice[]",
              "name":"",
              "type":"tuple[]"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_farmer",
              "type":"address"
            }
          ],
          "name":"getAverageCarbonReduction",
          "outputs":[
            {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_farmer","type":"address"
            }
          ],
          "name":"getFarmerInfo",
          "outputs":[
            {
              "internalType":"string",
              "name":"",
              "type":"string"
            },
            {
              "internalType":"string",
              "name":"",
              "type":"string"
            },
            {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_farmer",
              "type":"address"
            }
          ],
          "name":"getLatestSustainablePractice",
          "outputs":[
            {
              "internalType":"string",
              "name":"",
              "type":"string"
            },
            {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
            },
            {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_farmer",
              "type":"address"
            }
          ],
          "name":"getTotalSustainablePractices",
          "outputs":[
            {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_farmer",
              "type":"address"
            }
          ],
          "name":"isFarmerRegistered",
          "outputs":[
            {
              "internalType":"bool",
              "name":"",
              "type":"bool"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[],
          "name":"owner",
          "outputs":[
            {
              "internalType":"address",
              "name":"",
              "type":"address"
            }
          ],
          "stateMutability":"view",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"string",
              "name":"_name",
              "type":"string"
            },
            {
              "internalType":"string",
              "name":"_location",
              "type":"string"
            }
          ],
          "name":"registerFarmer",
          "outputs":[],
          "stateMutability":"nonpayable",
          "type":"function"
        },
        {
          "inputs":[
            {
              "internalType":"address",
              "name":"_newOwner",
              "type":"address"
            }
          ],
          "name":"transferOwnership",
          "outputs":[],
          "stateMutability":"nonpayable",
          "type":"function"
        },
        {
          "inputs":[],
          "name":"withdraw",
          "outputs":[],
          "stateMutability":"nonpayable",
          "type":"function"
        }

];

module.exports = {contractABI};