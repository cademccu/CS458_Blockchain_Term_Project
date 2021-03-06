import { ethers } from "ethers";

export const BLOCKCHAIN_INITIALIZED = "BLOCKCHAIN_INITIALIZED";

function blockchainInitialized(data) {
    return {
        type: BLOCKCHAIN_INITIALIZED,
        payload: data
    };
}

const initBlockchain = async () => {

    let provider;
    window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    const signer = await provider.getSigner()
    console.log("signer", signer);
    const userAddress =  await signer.getAddress();
    console.log("user address", userAddress);

    let DMV = null;
    console.log("READ DMV ABI");
    const abi = JSON.parse("	[" + 
    "	    {" + 
    "	      \"inputs\": []," + 
    "	      \"stateMutability\": \"nonpayable\"," + 
    "	      \"type\": \"constructor\"" + 
    "	    }," + 
    "	    {" + 
    "	      \"inputs\": []," + 
    "	      \"name\": \"getUserLicenseAddress\"," + 
    "	      \"outputs\": [" + 
    "	        {" + 
    "	          \"internalType\": \"address\"," + 
    "	          \"name\": \"\"," + 
    "	          \"type\": \"address\"" + 
    "	        }" + 
    "	      ]," + 
    "	      \"stateMutability\": \"view\"," + 
    "	      \"type\": \"function\"" + 
    "	    }" + 
    "	  ]"
    );

    // ****************************************************************************************
    // Change contract address here if you redeploy
    // ****************************************************************************************
    DMV = new ethers.Contract('0x175C9e5f70fCE99D91548FDEEc28a3021F5Bae46', abi, signer);

    let LF = null;
    console.log("READ LicenseFactory ABI");

    const lfAbi = JSON.parse(
        "	[" + 
"	    {" + 
"	      \"inputs\": []," + 
"	      \"stateMutability\": \"nonpayable\"," + 
"	      \"type\": \"constructor\"" + 
"	    }," + 
"	    {" + 
"	      \"anonymous\": false," + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"indexed\": false," + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"name\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"indexed\": false," + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"ID_NUMBER\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"NewLicense\"," + 
"	      \"type\": \"event\"" + 
"	    }," + 
"	    {" + 
"	      \"anonymous\": false," + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"indexed\": false," + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"name\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"indexed\": false," + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"ID_NUMBER\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"UpdatedLicense\"," + 
"	      \"type\": \"event\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"id\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"confirmChange\"," + 
"	      \"outputs\": []," + 
"	      \"stateMutability\": \"nonpayable\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_name\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_dob\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_exp_date\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_address\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_city_state\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_gender\"," + 
"	          \"type\": \"string\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"createLicense\"," + 
"	      \"outputs\": []," + 
"	      \"stateMutability\": \"nonpayable\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"_ID\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"getAddress\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"address\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"address\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"id\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"getBasicInformation\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"id\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"getChange\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"uint256\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"id\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"getFullInformation\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"uint256\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"string\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"address\"," + 
"	          \"name\": \"_owner\"," + 
"	          \"type\": \"address\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"getID\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"licenseToOwner\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"address\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"address\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"address\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"address\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"ownerHasLicense\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"bool\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"bool\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"address\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"address\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"ownerToLicense\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"uint256\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"requestingChange\"," + 
"	      \"outputs\": [" + 
"	        {" + 
"	          \"internalType\": \"bool\"," + 
"	          \"name\": \"\"," + 
"	          \"type\": \"bool\"" + 
"	        }" + 
"	      ]," + 
"	      \"stateMutability\": \"view\"," + 
"	      \"type\": \"function\"" + 
"	    }," + 
"	    {" + 
"	      \"inputs\": [" + 
"	        {" + 
"	          \"internalType\": \"uint256\"," + 
"	          \"name\": \"id\"," + 
"	          \"type\": \"uint256\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_name\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_dob\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_exp_date\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_address\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_city_state\"," + 
"	          \"type\": \"string\"" + 
"	        }," + 
"	        {" + 
"	          \"internalType\": \"string\"," + 
"	          \"name\": \"_gender\"," + 
"	          \"type\": \"string\"" + 
"	        }" + 
"	      ]," + 
"	      \"name\": \"setChange\"," + 
"	      \"outputs\": []," + 
"	      \"stateMutability\": \"nonpayable\"," + 
"	      \"type\": \"function\"" + 
"	    }" + 
"	  ]"
    );
    
    // The DMV deploys the LicenseFactory contract.
    await DMV.deployed();
    let lfAddr = await DMV.getUserLicenseAddress();
    LF = new ethers.Contract(lfAddr, lfAbi, signer);
    await LF.deployed();


    let data = { provider, signer, DMV: DMV, LF: LF, userAddress };
    //store.dispatch(blockchainInitialized(data));
  return data;
}

export default initBlockchain;
