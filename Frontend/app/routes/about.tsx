import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Truck, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-light-gray min-h-screen">
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:text-primary-red">Home</Link> / <span>About</span>
          </p>
          <h1 className="text-4xl font-bold text-gray-900">About HieuPhones</h1>
        </div>

        {/* Our Story Section */}
        <section className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                HieuPhones was founded with a simple mission: to make the latest mobile technology accessible and affordable for everyone. What started as a small, family-run kiosk has grown into a trusted online retailer known for its curated selection of quality smartphones and accessories.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that buying a phone should be a simple and transparent process. That's why we focus on competitive pricing, honest support, and building lasting relationships with our customers.
              </p>
            </div>
            <div>
              <img 
                src="https://via.placeholder.com/500x350?text=Our+Team" 
                alt="The HieuPhones Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <Award size={48} className="mx-auto text-primary-red mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
                    <p className="text-gray-600">We hand-pick and test every device to ensure it meets our high standards of quality and performance.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <ShieldCheck size={48} className="mx-auto text-primary-red mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Honest Support</h3>
                    <p className="text-gray-600">Our support team is here to provide you with clear, helpful, and honest advice, not just to make a sale.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <Truck size={48} className="mx-auto text-primary-red mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
                    <p className="text-gray-600">With our streamlined logistics, you get your new phone delivered to your door quickly and securely.</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
