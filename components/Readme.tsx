const Readme = () => (
  <div>
    <h2>Welcome to my project page</h2>
    <p>Thank you for taking time to visit and learn about my capabilities.</p>

    <h2>Disclaimer</h2>
    <p>
      Your use of this website is at your own risk, regardless of your adherence
      to the instructions below. Using this application may result in
      irreversible loss of your crypto, for which I take no responsibility! Use
      this application only on the testnet (currently Sepholia), where the coins
      have no value, not on real crypto mainnets. If you are not familiar with
      switching the nets, not sure what network your wallet is running on, do
      not use this application. Test networks are being opened and closed, so it
      is possible that I will change to another network in the future, possibly
      without notice.
    </p>

    <p>
      Testnets work identically to the mainnet, but are only used for
      development and demonstration purposes, like this application. Before
      clicking anything in this application, make sure you have switched your
      wallet to Sepholia testnet and if it is on another network, switch to
      Sepholia immediately. Then, just to be sure, check it every time before
      confirming any transaction made using this application.
    </p>

    <h2>What is Crowdfunding Gecko ?</h2>
    <p>
      Crowdfunding Gecko is a web application that allows you to create, manage,
      and invest in crowdfunding campaigns in a way that prevents fraudsters
      from absconding with your capital. This is done via smart contracts rules
      on the Ethereum network.
    </p>

    <h2>The key improvement over traditional crowdfunding campaigns</h2>
    <p>
      Among the many startups worldwide seeking financing, there are numerous
      scams and pretend ventures that in fact extort donors’ capital. Modern
      blockchain technology, among its many advantages, can also prevent this
      practice. Imagine that neither the manager of a crowdfunding campaign nor
      anyone else in the world cannot make any withdrawals from crowdfunding
      without obtaining the donors' prior consent for each expenditure. Once the
      contract is concluded, the rules are permanently recorded in the
      blockchain, so the capital is safer than in any bank. As safe as the
      entire blockchain. Overall costs compared to a banking system with a human
      element and centralized infrastructure, can also be dramatically lower.
    </p>

    <h2>User manual divided into app screens</h2>

    <h3>Home page</h3>
    <p>
      Below is a list of crowdfundings. These are individual accounts for each
      startup. Of course, they could be connected to external websites along
      with business plans, etc. If you are creating a Startup and want to create
      a new crowdfunding for it, you can do it using the "create crowdfunding"
      button below the list. After entering any crowdfunding, a set of data
      appears on a new screen.
    </p>

    <h3>"Details of the Contract" page</h3>
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

    <h3>"Requests" page</h3>
    <p>
      This page lists the expenses requested by the manager. Approvers can click
      "approve" in the table. If a given expense is approved by at least half of
      the approvers, then the manager can click "finalize" which will trigger a
      transfer to the Recipient wallet.
    </p>

    <h2>Technical information</h2>

    <h3>Blockchain</h3>
    <p>
      A smart contract named “CrowdfundingFactory” has been written in Solidity.
      This contract creates child contracts named “Crowdfunding”, each
      responsible for individual collections. The application is connected to
      the ethereum network using Web3.js and the Metamask wallet using Truffle.
      Tests performed in Ganache.
    </p>

    <h3>FrontEnd</h3>
    <p>Application made in Next.js with TypeScript, MaterialUi.</p>

    <h3>Inspiration</h3>
    <p>
      The inspiration for the project was the Udemy course "Ethereum and
      Solidity: The Complete Developer's Guide" by Stephen Grider, BUT! the
      course is quite outdated, a lot has changed in the code over the last two
      years and I used the latest stable versions of all tools, directly.
      Solidity now has a different syntax in many places, libraries have
      different methods, Next.js has a different architecture, I also added
      Typescript, used Material UI instead of Semantic UI, named variables
      differently and slightly changed the project architecture in some places.
      Plus, the app pages have my add-ons. All this to force me to thoroughly
      understand the code at every stage of the project.
    </p>

    <p>Piotr Podgórski, 2024</p>
  </div>
);

export default Readme;
