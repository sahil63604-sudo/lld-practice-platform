import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Practice = () => {
    const { attemptId } = useParams();
    const navigate = useNavigate();

    const [attempt, setAttempt] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAttempt = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/attempts"
                );

                const currentAttempt = response.data.attempts.find(
                    (item) => item._id === attemptId
                );

                if (!currentAttempt) {
                    setError("Attempt not found");
                    return;
                }

                setAttempt(currentAttempt);
            } catch (error) {
                console.error(error);
                setError("Failed to load practice");
            } finally {
                setLoading(false);
            }
        };

        fetchAttempt();
    }, [attemptId]);

    const handleSubmit = async () => {
        if (!content.trim()) {
            setError("Please write your solution before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const submissionResponse = await axios.post(
                `http://localhost:5000/api/submissions/${attemptId}`,
                {
                    content
                }
            );

            const submissionId =
                submissionResponse.data.submission._id;

            const evaluationResponse = await axios.post(
                `http://localhost:5000/api/evaluations/${submissionId}`
            );

            navigate(
                `/feedback/${evaluationResponse.data.evaluation._id}`
            );

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to submit solution."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                Loading practice...
            </div>
        );
    }

    if (error && !attempt) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-5xl">

                <button
                    onClick={() => navigate("/")}
                    className="mb-6 text-sm text-gray-600 hover:text-black"
                >
                    ← Back to Problems
                </button>

                <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {attempt?.problem?.title}
                        </h1>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                            {attempt?.problem?.difficulty}
                        </span>
                    </div>

                    <p className="mb-5 text-gray-600">
                        {attempt?.problem?.description}
                    </p>

                    <h2 className="mb-3 font-semibold">
                        Requirements
                    </h2>

                    <ul className="list-disc space-y-1 pl-5 text-gray-600">
                        {attempt?.problem?.requirements?.map(
                            (requirement) => (
                                <li key={requirement}>
                                    {requirement}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold">
                        Your LLD Solution
                    </h2>

                    <p className="mb-4 text-sm text-gray-500">
                        Explain your classes, responsibilities,
                        relationships, interfaces, patterns, and
                        important design decisions.
                    </p>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Example: I would create a ParkingLot class..."
                        className="min-h-[350px] w-full resize-y rounded-lg border border-gray-300 p-4 outline-none focus:border-black"
                    />

                    {error && (
                        <p className="mt-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="mt-5 rounded-lg bg-black px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting
                            ? "Submitting & Evaluating..."
                            : "Submit Solution"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Practice;