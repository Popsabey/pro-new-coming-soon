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
            const response = await fetch('https://script.google.com/macros/s/AKfycbyBU06ZDl4o3la-xXs_oJju5_HUC2baTPCbhrY7SZ0IpZKvXhZg7R6uDw2cJbqVFUGpCw/exec', {
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

    useEffect(() => {
        if (message && !message.includes('error')) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className='min-h-screen flex flex-col'>
            {/* Navigation */}
            <div className='w-full h-20 justify-center items-center flex flex-row'>
                <nav className='w-[90%] flex flex-row justify-between items-center max-w-6xl mx-auto px-4 sm:px-0'>
                    <img src="/plogo.png" alt="logo" className='h-10 sm:h-auto' />
                    <Link href="/" className='text underline text-blue-500'>Register as a seller</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className='flex-grow flex flex-col'>
                {/* Content Section */}
                <div className='flex-grow flex items-center justify-center px-4 sm:px-0'>
                    <div className='text-center items-center justify-center max-w-lg w-full'>
                        <div className='space-y-6 justify-center items-center flex flex-col'>
                            <h1 className='text-2xl sm:text-[40px]  font-semibold leading-tight sm:leading-[48px] font-exo'>
                                Fashion shopping made
                                easy, secure, and personal
                            </h1>
                            <p className='max-w-sm'>
                                Shop bespoke and ready-to-wear fashion
                                from trusted vendors across Africa.
                            </p>

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
                                    className='w-full sm:w-auto rounded-md sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-md sm:rounded-br-md p-4 bg-[#FFB16C] text-[#190C01]'
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
                    </div>
                </div>

                <div
                    className='w-full h-[30vh] sm:h-[47vh] bg-cover bg-center'
                    style={{
                        backgroundImage: 'url("./Frame 312 (1).png")',
                        backgroundRepeat: 'no-repeat',

                    }}
                />
            </div>
        </div>
    );
};

export default Page;