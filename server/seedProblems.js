const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Problem = require("./models/problemModel");

dotenv.config();

const problems = [
    {
        title: "Parking Lot",
        description:
            "Design a parking lot system that can manage different vehicle types, parking spots, and pricing strategies.",
        difficulty: "Medium",
        requirements: [
            "Support different vehicle types",
            "Assign vehicles to suitable parking spots",
            "Track available and occupied spots",
            "Calculate parking fees",
            "Allow different pricing strategies"
        ],
        expectedConcepts: [
            "Classes",
            "Encapsulation",
            "Interfaces",
            "Strategy Pattern",
            "Composition"
        ]
    },

    {
        title: "Library Management System",
        description:
            "Design a library system where users can search books, borrow and return books, and track book availability.",
        difficulty: "Easy",
        requirements: [
            "Manage books",
            "Search books",
            "Allow users to borrow books",
            "Allow users to return books",
            "Track book availability"
        ],
        expectedConcepts: [
            "Classes",
            "Encapsulation",
            "Relationships",
            "Responsibilities"
        ]
    },

    {
        title: "Tic-Tac-Toe",
        description:
            "Design a Tic-Tac-Toe game that supports two players and manages turns, moves, and winning conditions.",
        difficulty: "Medium",
        requirements: [
            "Support two players",
            "Manage player turns",
            "Validate moves",
            "Detect winning conditions",
            "Detect draw condition"
        ],
        expectedConcepts: [
            "Classes",
            "State Management",
            "Encapsulation",
            "Separation of Responsibilities"
        ]
    },

    {
        title: "Elevator System",
        description:
            "Design an elevator system that manages multiple elevators, floor requests, and elevator movement.",
        difficulty: "Hard",
        requirements: [
            "Support multiple elevators",
            "Accept floor requests",
            "Move elevators between floors",
            "Track elevator states",
            "Assign requests to suitable elevators"
        ],
        expectedConcepts: [
            "Classes",
            "Interfaces",
            "Strategy Pattern",
            "State",
            "Separation of Responsibilities"
        ]
    },

    {
        title: "Movie Ticket Booking",
        description:
            "Design a movie ticket booking system where users can browse movies, select shows, reserve seats, and make bookings.",
        difficulty: "Medium",
        requirements: [
            "Manage movies",
            "Manage theatres and screens",
            "Display available shows",
            "Select available seats",
            "Create bookings"
        ],
        expectedConcepts: [
            "Classes",
            "Composition",
            "Encapsulation",
            "Relationships",
            "Extensibility"
        ]
    }
];

const seedProblems = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Problem.deleteMany({});

        await Problem.insertMany(problems);

        console.log("Problems seeded successfully");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedProblems();