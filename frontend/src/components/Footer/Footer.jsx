import React from "react";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import Components from "../components";

const Footer = () => {
    return (
        <footer>
            <div className="relative mx-24 py-8 my-8 border-t border-b border-gray-500">
                <div className="flex justify-between items-start container mx-auto">
                    <div className="flex flex-col">
                        <FaLeaf className="text-primary-500 text-5xl mb-2 mt-2" />
                        <h1 className="font-medium text-3xl mt-4">
                            SANJEEVANI
                        </h1>
                        <p className="mt-1.5 ml-1 mb-5">Herbal Tech</p>
                        <Components.GreenButton className="relative w-auto px-4 py-2 mt-6 mb-7">
                            <Link
                                to="/"
                                className="flex items-center justify-center"
                            >
                                Download
                            </Link>
                        </Components.GreenButton>
                    </div>
                    <div className="flex space-x-10">
                        <div className="flex flex-right">
                            <ul className="space-y-2 mt-8 mr-5">
                                <li className="font-semibold text-lg">
                                    Company
                                </li>
                                <li>Blog</li>
                                <li>Carrer</li>
                                <li>Pricing</li>
                            </ul>
                        </div>
                        <div className="flex flex-right">
                            <ul className="space-y-2 mt-8">
                                <li className="font-semibold text-lg">
                                    Resources
                                </li>
                                <li>Documentation</li>
                                <li>Papers</li>
                                <li>Press Confrences</li>
                            </ul>
                        </div>
                        <div className="flex flex-right">
                            <ul className="space-y-2 mt-8">
                                <li className="font-semibold text-lg">Legal</li>
                                <li>Terms of Services</li>
                                <li>Privacy Policy</li>
                                <li>Cookies Polices</li>
                                <li>Data Processing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mx-24 py-1 mb-7">
                <div className="flex flex-left justify-start items-center space-x-2 container mx-auto">
                    <p className="text-2xl">&copy;</p>
                    <p>2024 Initiate</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
