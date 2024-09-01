// import React, { useState } from "react";
// import "./Funding.css";

// const Funding = () => {
//   const [amountRaised, setAmountRaised] = useState(0);
//   const [donationAmount, setDonationAmount] = useState("");
//   const [goalReached, setGoalReached] = useState(false);

//   const goal = 1000000000; // 1 billion dollars

//   const handleDonate = () => {
//     if (donationAmount <= 0) {
//       alert("Please enter a valid donation amount. ");
//     } else {
//       setAmountRaised(amountRaised + parseInt(donationAmount, 10));
//       setDonationAmount("");
//     }
//   };

//   if (amountRaised >= goal && !goalReached) {
//     setGoalReached(true);
//   }

//   return (
//     <div className="project-container">
//       <h1>Agri-Fund</h1>
//       <p>
//         The goal of this project is to help individuals and communities secure
//         the financial and material support they need to achieve their
//         agricultural goals and drive sustainable development.
//       </p>
//       <p>
//         By providing access to essential resources and funding opportunities, we
//         empower farmers and agricultural initiatives to thrive.
//       </p>
//       <p>
//         Your generous donation can make a significant impact, ensuring that
//         these vital projects receive the support they need to succeed and
//         promote a more sustainable future.
//       </p>

//       <div className="goal-section">
//         <div className="goal-box">
//           <h2>Goal:</h2>
//           <p>R{goal.toLocaleString()}</p>
//         </div>
//         <div className="amount-raised-box">
//           <h2>Amount Raised:</h2>
//           <p>R{amountRaised.toLocaleString()}</p>
//         </div>
//       </div>

//       <div className="form-section">
//         <input
//           type="number"
//           placeholder="Enter Amount here"
//           value={donationAmount}
//           onChange={(e) => setDonationAmount(parseInt(e.target.value, 10))}
//         />
//         <button onClick={handleDonate}>Donate</button>
//         <p>
//           <strong>
//             Support Agri-Fund today and help create a more sustainable future!
//           </strong>
//         </p>
//         {goalReached ? (
//           <div className="goal-reached">
//             <h2>Congratulations! Goal Reached!</h2>
//             <p>Thank You for the Support</p>
//           </div>
//         ) : (
//           <p>Keep donating to reach the goal!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Funding;

import React, { useState, useEffect } from "react";
import "./Funding.css";

const Funding = () => {
  const [amountRaised, setAmountRaised] = useState(0);
  const [donationAmount, setDonationAmount] = useState("");
  const [goalReached, setGoalReached] = useState(false);

  const goal = 1000000000; // 1 billion dollars

  // Load the amount raised from localStorage when the component mounts
  useEffect(() => {
    const savedAmount = localStorage.getItem("amountRaised");
    if (savedAmount) {
      setAmountRaised(parseInt(savedAmount, 10));
    }
  }, []);

  // Update localStorage whenever amountRaised changes
  useEffect(() => {
    localStorage.setItem("amountRaised", amountRaised);
  }, [amountRaised]);

  const handleDonate = () => {
    if (donationAmount <= 0 || isNaN(donationAmount)) {
      alert("Please enter a valid donation amount.");
    } else {
      const newAmount = amountRaised + parseInt(donationAmount, 10);
      setAmountRaised(newAmount);
      setDonationAmount("");
    }
  };

  useEffect(() => {
    if (amountRaised >= goal && !goalReached) {
      setGoalReached(true);
    }
  }, [amountRaised, goalReached]);

  return (
    <div className="project-container">
      <h1>Agri-Fund</h1>
      <p>
        The goal of this project is to help individuals and communities secure
        the financial and material support they need to achieve their
        agricultural goals and drive sustainable development.
      </p>
      <p>
        By providing access to essential resources and funding opportunities, we
        empower farmers and agricultural initiatives to thrive.
      </p>
      <p>
        Your generous donation can make a significant impact, ensuring that
        these vital projects receive the support they need to succeed and
        promote a more sustainable future.
      </p>

      <div className="goal-section">
        <div className="goal-box">
          <h2>Goal:</h2>
          <p>R{goal.toLocaleString()}</p>
        </div>
        <div className="amount-raised-box">
          <h2>Amount Raised:</h2>
          <p>R{amountRaised.toLocaleString()}</p>
        </div>
      </div>

      <div className="form-section">
        <input
          type="number"
          placeholder="Enter Amount here"
          value={donationAmount}
          onChange={(e) => setDonationAmount(parseInt(e.target.value, 10))}
        />
        <button onClick={handleDonate}>Donate</button>
        <p>
          <strong>
            Support Agri-Fund today and help create a more sustainable future!
          </strong>
        </p>
        {goalReached ? (
          <div className="goal-reached">
            <h2>Congratulations! Goal Reached!</h2>
            <p>Thank You for the Support</p>
          </div>
        ) : (
          <p>Keep donating to reach the goal!</p>
        )}
      </div>
    </div>
  );
};

export default Funding;
