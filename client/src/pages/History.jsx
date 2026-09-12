import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const History = () => {
    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/attempts"
                );

                setAttempts(response.data.attempts);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                Loading history...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Attempt History
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Review your previous LLD practice attempts.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
                    >
                        Practice More
                    </button>
                </div>

                {attempts.length === 0 ? (
                    <div className="rounded-xl border bg-white p-8 text-center">
                        <p className="text-gray-600">
                            You haven't attempted any problems yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {attempts.map((attempt) => (
                            <div
                                key={attempt._id}
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {attempt.problem?.title ||
                                                "Unknown Problem"}
                                        </h2>

                                        <div className="mt-2 flex gap-2">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                                                {attempt.problem?.difficulty}
                                            </span>

                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                                                {attempt.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        {attempt.evaluation ? (
                                            <>
                                                <p className="text-3xl font-bold">
                                                    {attempt.evaluation.totalScore}/10
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Score
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                Not evaluated
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {attempt.evaluation && (
                                    <div className="mt-5 border-t pt-4">
                                        <p className="text-sm leading-6 text-gray-600">
                                            {attempt.evaluation.summary}
                                        </p>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/feedback/${attempt.evaluation._id}`
                                                )
                                            }
                                            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                        >
                                            Review Feedback
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default History;