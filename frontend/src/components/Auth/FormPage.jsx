import React, { useState, useEffect } from "react";

const image_url_list = [
    "https://sanjeevani-initiate.s3.us-east-1.amazonaws.com/pictures/download+(1).jpg",
    "https://sanjeevani-initiate.s3.us-east-1.amazonaws.com/pictures/download+(2).jpg",
    "https://sanjeevani-initiate.s3.us-east-1.amazonaws.com/pictures/download+(3).jpg",
    "https://sanjeevani-initiate.s3.us-east-1.amazonaws.com/pictures/download.jpg",
    "https://sanjeevani-initiate.s3.us-east-1.amazonaws.com/pictures/Forest.jpg",
    "https://sanjeevani-initiate.s3.us-east-1.amazonaws.com/pictures/green+forest.jpg"
];

const FormPage = ({ children }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const randomImage = image_url_list[Math.floor(Math.random() * image_url_list.length)];
        setImageUrl(randomImage);
    }, []);

    return (
        <section className="py-24 bg-whitegray">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-2xl overflow-hidden items-center justify-center gap-10">
                    <div className="w-full lg:w-1/3 flex flex-col items-center justify-center py-8 bg-no-repeat">
                        <div className="flex justify-center items-center ml-3.5 w-full h-full">
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    className="rounded-lg object-cover w-full h-full aspect-[4/6]"
                                    alt="plant"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 pt-16 pb-8 px-12">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormPage;
