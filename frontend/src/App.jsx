
import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');

  const claimCoupon = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/claim');
      setCoupon(response.data.coupon);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
      setCoupon('');
    }
  };

  return (
   <div className='flex items-center justify-center'>
     <div className="flex flex-col items-center rounded-2xl mt-20 font-sans shadow-xl shadow-black w-[500px] h-[400px]">
      <h1 className="text-3xl font-bold mt-20 mb-6"> Coupon Distribution System</h1>
      {coupon && <div className="bg-green-100 text-green-800 p-3 rounded-md w-64 text-center">Your Coupon: {coupon}</div>}
      {error && <div className="bg-red-100 text-red-800 p-3 rounded-md w-64 text-center">{error}</div>}
      <button
        onClick={claimCoupon}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md mt-4 shadow-md"
      >
        Claim Coupon
      </button>
    </div>
   </div>
  );
}

export default App;
