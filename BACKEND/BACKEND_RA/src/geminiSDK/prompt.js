const prompt_template = {
    medical: [
        "give the aurvedic remedies for ",
        ",in format {remedies:[{name, description, benefits, notes}]} , no extra content",
    ],
    species: [
        "give the aurvedic quality for plant ",
        ",in format {description, properties, helful_in, benefits} , no extra content"
    ]
};

export { prompt_template };


