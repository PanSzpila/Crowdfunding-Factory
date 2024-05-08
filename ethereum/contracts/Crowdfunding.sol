// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CrowdfundingFactory{
    address[] public deployedCrowdfundings;

    function createCrowdfunding(uint minimumContribution) public {
        address newCrowdfunding = address(new Crowdfunding(minimumContribution, msg.sender));
        deployedCrowdfundings.push(newCrowdfunding);
    }
    function getDeployedCrowdfundings() public view returns (address[] memory){
        return deployedCrowdfundings;
    }
}

contract Crowdfunding {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping (address => bool) public approvers;
    uint public approversCount;

    modifier onlyToManager() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public onlyToManager {
        // Request memory NewRequest = Request ({ //Request - tworzymy obiekt (struct) o typie danych zdefiniowanych na początku kontraktu jako Request. Ta zmienna będzie się nazywać NewRequest i będzie się równać
        //     description: description,
        //     value: value,
        //     recipient: recipient,
        //     complete: false,
        //     approvalCount: 0
        // });
        uint256 _index = requests.length;
        Request[] storage r = requests;
        r.push();

        r[_index].description = description;
        r[_index].value = value;
        r[_index].recipient = recipient;
        r[_index].complete = false;
        r[_index].approvalCount = 0;

        // requests.push(NewRequest);
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 i) public onlyToManager {
        Request storage request = requests[i]; //const request = requests[i], typ Request (wcześniej zdefiniowany),  miejsce przechowywania: storage

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
    uint, uint, uint, uint, address
) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount () public view returns (uint) {
        return requests.length;
    }
}
