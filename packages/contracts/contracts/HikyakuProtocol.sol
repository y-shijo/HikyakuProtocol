// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract HikyakuProtocol {

    // Event Definitions
    event ResolveRequested(address indexed requester, string mailAddress);
    event Registered(address indexed requester, string mailAddress, address indexed resolvedAddress);

    /**
     * Requester Address => Mail Address => Resolved Address
     *   ex) 0x1234 => hello[at]example.com => 0xABCD
     *       0x1234 => bye[at]example.com => 0xABCD
     */
    mapping(address => mapping(string => address)) internal records;
    mapping(address => mapping(address => string[])) internal recordsInverse;

    constructor() {
    }

    /**
     * @dev Return the resolved address for msg.sender
     * @param mailAddress Mail Address to be resolved
     */
    function getResolvedAddress(string memory mailAddress) public view returns (address) {
        // Parameter Checks
        require(bytes(mailAddress).length != 0, "Invalid Mail Address Length");

        // Return the resolved address (might be ZERO Address if no record is found)
        address requester = msg.sender;
        return records[requester][mailAddress];
    }

    /**
     * @dev Request to resolve the mail address to wallet address.
     * @param mailAddress Mail Address to be resolved
     */
    function requestResolve(string memory mailAddress) public {
        // TODO: Need to avoid trivial resolve requests.

        // Parameter Checks
        require(bytes(mailAddress).length != 0, "Invalid Mail Address Length");

        address requester = msg.sender;

        // If the mailAddress is already resolved:
        address resolvedAddress = records[requester][mailAddress];
        if (resolvedAddress != address(0)) {
            revert();
        }

        // If the mailAddress is NOT resolved yet.
        // Emit Event
        emit ResolveRequested(requester, mailAddress);
    }

    /**
     * @dev Register the wallet address
     * @param requester Requester Address
     * @param mailAddress Mail Address to be resolved
     * @param resolvedAddress Resolved Address
     */
    function register(address requester, string memory mailAddress, address resolvedAddress) public {
        // TODO: As of now, everyone can register the records. So we need to implement prevention mechanism to avoid malicious registration.

        // Parameter Checks
        require(requester != address(0), "Invalid Requester Address");
        require(bytes(mailAddress).length != 0, "Incalid Mail Address Length");
        require(resolvedAddress != address(0), "Invalid Resolved Address");

        // Register Records
        records[requester][mailAddress] = resolvedAddress;

        if (recordsInverse[resolvedAddress][requester].length == 0) {
            recordsInverse[resolvedAddress][requester] = new string[](0);
        }

        recordsInverse[resolvedAddress][requester].push(mailAddress);

        // Emit Event
        emit Registered(requester, mailAddress, resolvedAddress);
    }

    /**
     * @dev Register the wallet address
     * @param requester Requester Address
     */

    function deleteWithRequester(address requester) public {
        string[] memory deleteMailAddresses = recordsInverse[msg.sender][requester];
        delete recordsInverse[msg.sender][requester];
        for (uint i = 0; i < deleteMailAddresses.length; i++) {
            delete records[requester][deleteMailAddresses[i]];
        }
    }

    // function deleteAllInfoOfMsgSender() public {
    //     string[] deleteMailAddresses;
    //     st
    //     for (uint i = 0; i < deleteMailAddresses.length; i++) {
    //         recordsInverse[];
    //     }
    //     string[] deleteMailAddresses = recordsInverse[requester][msg.sender];
    //     delete recordsInverse[requester][msg.sender];
    //     for (uint i = 0; i < deleteMailAddresses.length; i++) {
    //         delete records[requester][deleteMailAddresses[i]];
    //     }
    // }



}
