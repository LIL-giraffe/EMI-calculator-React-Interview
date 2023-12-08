import React, { useState } from "react";
import "./EMIPage.css";
import { tenuredata } from "./constants";

const EMIPage = () => {
  const [cost, setCost] = useState(0);
  const [intrest, setIntrest] = useState(10);
  const [fee, setFee] = useState();
  const [downPayment, setDownPayment] = useState();
  const [emi, setEmi] = useState();
  const [tenure,setTenure]=useState()
  const calEMI = (downPayment) => {
    // EMI amount= [p*r*(1+r)^n/[(1+r)^n-1]]
     const loanAmt=cost-downPayment;
     const rateOfInterest=intrest/100;
     const numOfYears=tenure/12;
     const EMI= (loanAmt*rateOfInterest*(1+rateOfInterest)**numOfYears)/((1+rateOfInterest)**(numOfYears-1))
     return Number(EMI/12).toFixed(0)
  };

  const updateEmi = (e) => {
    if(!cost) return
    const dp=Number(e.target.value)
    setDownPayment(dp.toFixed(0))
    const emi=calEMI(dp)
    setEmi(emi)

  };
  const updateDownp = (e) => {
    if(!cost) return
    const emi=Number(e.target.value)
    setEmi(emi.toFixed(0))
  };
  
  return (
    <div className="page">
      <span className="heading">EMI Calculator</span>
      <span className="title">Total Cost of Asset</span>
      <input
        type="number"
        value={cost}
        onClick={(e) => setCost(e.target.value)}
        placeholder="Total cost of assets"
      />
      <span>Intrest rate in ( % )</span>
      <input
        type="number"
        value={intrest}
        onClick={(e) => setIntrest(e.target.value)}
        placeholder="Intrest rate in ( % )"
      />
      <span>Processing fee (in %)</span>
      <input
        type="number"
        value={fee}
        onClick={(e) => setFee(e.target.value)}
        placeholder="Processing fee (in %)"
      />
      <span>Down Payment</span>
      <div className="sliders">
        <input
          type="range"
          min={0}
          max={cost}
          value={downPayment}
          onChange={updateEmi}
        />
        <div className="labels"> 
          <label>0%</label>
          <label>{downPayment}</label>
          <label>100%</label>
        </div>
      </div>
      <span>Loan Per Month</span>
      <div>
        <input
          type="range"
          min={calEMI(cost)}
          max={calEMI(0)}
          value={emi}
          onChange={updateDownp}
        />
        <div className="labels">
          <label>{calEMI(cost)}</label >
          <label>{downPayment}</label>
          <label>{calEMI(0)}</label>
        </div>
      </div>
      <span>Tenure</span>
      {tenuredata.map((t)=>{
        return <button onClick={()=>setTenure(t)}>{t}</button>
      })}
    </div>
  );
};

export default EMIPage;
