import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Feedback = () => {
    const { evaluationId } = useParams();
    const navigate = useNavigate();

    const [evaluation, setEvaluation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/evaluations/${evaluationId}`
                );

                setEvaluation(response.data.evaluation);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluation();
    }, [evaluationId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                Loading feedback...
            </div>
        );
    }

    if (!evaluation) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <p className="text-red-600">
                    Evaluation not found.
                </p>
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
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Your Feedback
                            </h1>

                            <p className="mt-2 text-gray-600">
                                Review your LLD solution and identify areas
                                for improvement.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl font-bold">
                                {evaluation.totalScore}/10
                            </div>

                            <p className="text-sm text-gray-500">
                                Overall Score
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-3 text-xl font-semibold">
                        Summary
                    </h2>

                    <p className="leading-7 text-gray-700">
                        {evaluation.summary}
                    </p>
                </div>

                <div className="space-y-4">
                    {evaluation.criteria.map((item) => (
                        <div
                            key={item.criterion}
                            className="rounded-xl border bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">
                                    {item.criterion}
                                </h2>

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                                    {item.score}/10
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Evidence
                                    </p>

                                    <p className="mt-1 text-gray-700">
                                        {item.evidence}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Concern
                                    </p>

                                    <p className="mt-1 text-gray-700">
                                        {item.concern}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Suggestion
                                    </p>

                                    <p className="mt-1 text-gray-700">
                                        {item.suggestion}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Confidence
                                    </p>

                                    <p className="mt-1 text-gray-700">
                                        {Math.round(
                                            item.confidence * 100
                                        )}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="rounded-lg bg-black px-5 py-3 font-medium text-white"
                    >
                        Try Another Problem
                    </button>

                    <button
                        onClick={() => navigate("/history")}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium"
                    >
                        View History
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Feedback;