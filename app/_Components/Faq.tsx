
"use client"
import React, { useState } from 'react';
import CupScene from './CupScene';
import { Canvas } from '@react-three/fiber'

const Faq = () => {
    // State to track which accordion items are open
    const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

    // Toggle function for accordion items
    const toggleItem = (index:number) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // FAQ data array for easier management
    const faqItems = [
        {
            question: "How can I reset my password?",
            answer: "To reset your password, go to the login page, click 'Forgot Password', enter your email, and follow the instructions sent to your email."
        },
        {
            question: "How do I update my billing information?",
            answer: "To update your billing information, go to your account settings, select 'Billing', and enter your new payment details."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can contact customer support by clicking the 'Support' link in the menu and filling out the contact form."
        },
        {
            question: "How do I delete my account?",
            answer: "To delete your account, go to account settings, select 'Delete Account', and confirm your action."
        }
    ];

    return (
        <div className=''>
            <section className="py-24 bg-transparent text-white flex gap-4">
                <div className="flex mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="accordion-group md:max-w-[80vw] max-w-[60vw]" data-accordion="default-accordion">
                        {faqItems.map((item, index) => (
                            <div 
                                key={index}
                                className="accordion bg-transparent border border-[#1b3a5b] p-4 rounded-xl transition duration-500 hover:border-[#73e4f3] hover:shadow-lg hover:shadow-cyan-600/30 mb-8 lg:p-4"
                            >
                                <button 
                                    className="accordion-toggle group flex items-center justify-between gap-6 text-left text-lg font-normal leading-8 text-white w-full transition duration-500 hover:text-[#59cded]"
                                    onClick={() => toggleItem(index)}
                                >
                                    <h5>{item.question}</h5>
                                    <svg 
                                        className={`w-6 h-6 text-white transition duration-500 group-hover:text-[#59cded] transform ${openItems[index] ? 'rotate-45' : ''}`} 
                                        viewBox="0 0 24 24" 
                                        fill="none"
                                    >
                                        <path 
                                            d="M6 12H18M12 18V6" 
                                            stroke="currentColor" 
                                            strokeWidth="1.6" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <div 
                                    className={`accordion-content w-full overflow-hidden transition-all duration-300 ${
                                        openItems[index] ? 'max-h-40 mt-4' : 'max-h-0 mt-0'
                                    }`}
                                >
                                    <p className="text-base text-gray-300 leading-6">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default Faq;