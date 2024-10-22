const prompt_template = {
    medical: [
        "give the aurvedic remedies for ",
        ",you should respond as json string format :{remedies:[{name, description, benefits, notes}]} , no extra content",
    ],
    species: [
        "give the aurvedic quality for plant ",
        ",you should respond as json string format : {description:String, properties:String, helful_in:String, benefits:String} , no extra content"
    ]
};

export { prompt_template };


