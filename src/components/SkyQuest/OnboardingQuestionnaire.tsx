import React, { useState } from 'react';
import { OnboardingQuestion, UserArchetype, ARCHETYPES } from '../../types/narrativeAdventure';
import { ONBOARDING_QUESTIONS } from '../../data/narrativeAdventureData';

interface OnboardingQuestionnaireProps {
  onComplete: (archetype: UserArchetype, answers: Record<string, string>) => void;
  onSkip: () => void;
}

const OnboardingQuestionnaire: React.FC<OnboardingQuestionnaireProps> = ({ onComplete, onSkip }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1;
  const progress = ((currentQuestionIndex + 1) / ONBOARDING_QUESTIONS.length) * 100;

  const handleAnswer = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    setIsAnimating(true);
    setTimeout(() => {
      if (isLastQuestion) {
        // Calculate archetype based on answers
        const archetype = calculateArchetype(newAnswers);
        onComplete(archetype, newAnswers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsAnimating(false);
      }
    }, 300);
  };

  const calculateArchetype = (userAnswers: Record<string, string>): UserArchetype => {
    const scores = {
      protector: 0,
      observer: 0,
      storyteller: 0,
      creator: 0
    };

    // Calculate weighted scores based on answers
    ONBOARDING_QUESTIONS.forEach(question => {
      const answerId = userAnswers[question.id];
      if (answerId) {
        const selectedOption = question.options.find(opt => opt.id === answerId);
        if (selectedOption) {
          Object.entries(selectedOption.archetypeWeights).forEach(([archetype, weight]) => {
            scores[archetype as keyof typeof scores] += weight * question.weight;
          });
        }
      }
    });

    // Find the archetype with highest score
    const topArchetypeKey = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0] as keyof typeof scores;

    // Find the archetype object from ARCHETYPES array
    const selectedArchetype = ARCHETYPES.find(archetype => archetype.id === topArchetypeKey);
    return selectedArchetype || ARCHETYPES[0]; // Fallback to first archetype if not found
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Khám phá Hành trình của Bạn
          </h1>
          <p className="text-gray-600">
            Hãy cho chúng tôi biết về bạn để gợi ý hành trình phù hợp nhất
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Câu hỏi {currentQuestionIndex + 1} / {ONBOARDING_QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
          isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 group-hover:text-green-700 transition-colors duration-200">
                      {option.text}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goBack}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              ← Quay lại
            </button>

            <button
              onClick={onSkip}
              className="px-6 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Bỏ qua
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Thông tin của bạn sẽ được sử dụng để cá nhân hóa trải nghiệm Sky Quest
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;