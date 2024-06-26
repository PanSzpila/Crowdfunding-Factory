const Readme = () => (
  <div>
    <h2>Welcome to my project page</h2>
    <p>Thank you for taking time to visit and learn about my capabilities.</p>

    <h2>Disclaimer</h2>
    <p>
      Use this website at your own risk, regardless of your adherence to the
      instructions below. This application may result in irreversible loss of
      your crypto. Use only on the testnet (currently Sepholia), where coins
      have no value. If you are not sure what network your wallet is running on,
      do not use this application. it is possible that I will change from
      Sepholia to another test network in the future, possibly without notice.
    </p>

    <h2>What is Crowdfunding Gecko ?</h2>
    <p>
      Crowdfunding Gecko is a web application that allows you to create, manage,
      and invest in crowdfunding campaigns in a way that prevents fraudsters
      from absconding with your capital. This is done via smart contracts rules
      on the Ethereum network.
    </p>

    <h4>The key improvement over traditional crowdfunding campaigns</h4>
    <p>
      Among the many startups worldwide seeking financing, there are numerous
      scams and pretend ventures that in fact extort donors' capital. Modern
      blockchain technology, among its many advantages, can also prevent this
      practice. Imagine that neither the manager of a crowdfunding campaign nor
      anyone else in the world cannot make any withdrawals from crowdfunding
      without obtaining the donors' prior consent for each expenditure. Once the
      contract is concluded, the rules are permanently recorded in the
      blockchain, so the capital is pro safer than in bank. As safe as the
      entire blockchain. Overall costs compared to a banking system with a human
      element and centralized infrastructure, can also be dramatically lower.
    </p>

    <h2>User manual divided into app screens</h2>

    <p>
      First of all, you need to have a Metamask wallet installed and set up. The
      application will automatically connect to it and perform transactions. You
      will just have to confirm them in your wallet each time. I would like to
      remind you once again to switch your wallet to the test network, as I
      described in the disclaimer.
    </p>

    <h4>Home page</h4>
    <p>
      Below is a list of crowdfundings. These are individual accounts for each
      startup. Of course, they could be connected to external websites along
      with business plans, etc. If you are creating a Startup and want to create
      a new crowdfunding for it, you can do it using the "create crowdfunding"
      button below the list. After entering any crowdfunding, a set of data
      appears on a new screen.
    </p>

    <h4>"Details of the Contract" page</h4>
    <p>
      Here you will find details of the selected crowdfunding. You can also
      donate your funds by entering the amount to be transferred and clicking
      "Contribute!". If you have a Metamask wallet installed in your browser and
      you are logged in to it, the transaction will take place automatically.
      You just need to confirm it in your wallet. Remember to be on the Sepholia
      Testnet and not the mainnet so you don't lose your real Ethereum! You can
      contribute any amount, but if you want to become an Approver, your amount
      must be at least the "Minimum Contribution". An approver is a donor who
      can later consent to expenses requested by the fund manager. At the bottom
      of the "Details of the Contract" page, there is a "Show spend Requests"
      button.
    </p>

    <h4>"Requests" page</h4>
    <p>
      This page lists the expenses requested by the manager. Approvers can click
      "approve" in the table. If a given expense is approved by at least half of
      the approvers, then the manager can click "finalize" which will trigger a
      transfer to the Recipient wallet.
    </p>
  </div>
);

export default Readme;
