"use client"

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycby5oRlh9tNH4-3BlpZZ4NjKbrX0uanIqEKbXGlVl7P4DKxLBQEbbGQ5c7GWT9N4DNtHOQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `Email=${encodeURIComponent(email)}`
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message || 'Submission successful.');
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('An error occurred while submitting your email. Please try again later.');
      // Clear the error message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // If you want the success message to also disappear, you can add this effect:
  useEffect(() => {
    if (message && !message.includes('error')) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className='max-h-[100vh]'>
      {/* Navigation */}
      <div className='w-full h-20 justify-center items-center flex flex-row'>
        <nav className='w-[90%] flex flex-row justify-between items-center max-w-6xl mx-auto px-4 sm:px-0'>
          <img src="/plogo.png" alt="logo" className='h-10 sm:h-auto' />
          <Link href="/buyers" className='text underline text-blue-500'>I am a buyer</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex flex-col sm:flex-row justify-start items-center h-[90vh]'>
        {/* Left Content */}
        <div className='w-full sm:w-[50%] h-[70%] sm:h-full justify-center sm:justify-center sm:mx-auto flex flex-col items-center sm:items-center px-4 sm:px-0 gap-8'>
          <div className='justify-start items-center sm:items-start w-full sm:w-[370px] flex flex-col gap-6 text-center sm:-ml-10 sm:text-left'>
            <h1 className='text-2xl sm:text-[40px] font-semibold leading-tight sm:leading-[48px] font-exo'>
              Sell where shoppers  <span className='text-[#FFB16C]'>are</span>
            </h1>
            <p className='text-center sm:text-left'>
              Place your fashion products in front of thousands of shoppers, on Proattire
            </p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-center sm:justify-center items-center w-full max-w-md sm:max-w-none'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
              className='w-full sm:w-[300px] p-4 border-[#E4E6ED] placeholder:text-[#6E6E6E] border bg-[#F8F8F8] rounded-xl sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-md sm:rounded-bl-md mb-4 sm:mb-0'
              disabled={isLoading}
            />
            <button
              type="submit"
              className='w-full sm:w-auto rounded-md sm:rounded-tr-md sm:rounded-tl-none sm:rounded-bl-none sm:rounded-br-md p-4 bg-[#FFB16C] text-[#190C01]'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Join waitlist'}
            </button>
          </form>
          {message &&
            <p className={`text-center ${message.includes('error') ? 'text-red-600' : 'text-green-600'} mt-4`}>
              {message}
            </p>
          }
        </div>

        {/* Right Image */}
        <div
          className='w-full sm:w-[50%] h-[30%] sm:h-full justify-center items-center'
          style={{
            backgroundImage: 'url("/bytersImg.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionY: "-80px",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
};

export default Page;