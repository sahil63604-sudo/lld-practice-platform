import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProblemCard from "../components/ProblemCard";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/problems"
                );

                setProblems(response.data.problems);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    const startPractice = async (problemId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/attempts/${problemId}`
            );

            const attemptId = response.data.attempt._id;

            navigate(`/practice/${attemptId}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <p className="p-8">Loading problems...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        LLD Practice
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Choose a problem and practice your low-level design skills.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {problems.map((problem) => (
                        <ProblemCard
                            key={problem._id}
                            problem={problem}
                            onStart={startPractice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Problems;