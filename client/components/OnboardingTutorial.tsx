import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from "lucide-react";
import { Spotlight } from "./Spotlight";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  action: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to Clarity Engine!",
    description: "Let's get you started with our SEO toolkit. This quick tour will show you the essentials.",
    target: "body",
    action: "Start Tour",
  },
  {
    id: "tools",
    title: "Explore Our Tools",
    description: "Access 17 powerful SEO tools from the Tools page. Each tool helps with different aspects of SEO.",
    target: "[href='/tools']",
    action: "Next",
  },
  {
    id: "resources",
    title: "Learn from Resources",
    description: "Check out our Resources section for in-depth guides and best practices.",
    target: "[href='/resources']",
    action: "Next",
  },
  {
    id: "dashboard",
    title: "Your Dashboard",
    description: "Save your favorite tools and track your progress here.",
    target: "[href='/dashboard']",
    action: "Next",
  },
  {
    id: "certifications",
    title: "Earn Certifications",
    description: "Complete courses and earn badges to showcase your SEO expertise.",
    target: "[href='/certifications']",
    action: "Next",
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "You now know the basics. Start exploring and mastering SEO with Clarity Engine.",
    target: "body",
    action: "Get Started",
  },
];

export function OnboardingTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("clarity-tutorial-seen");
    if (!seen) {
      setIsVisible(true);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("clarity-tutorial-seen", "true");
    setIsVisible(false);
    setHasSeenTutorial(true);
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible || hasSeenTutorial) {
    return null;
  }

  const step = tutorialSteps[currentStep];

  return (
    <>
      <Spotlight
        targetSelector={step.target}
        isActive={isVisible && step.target !== "body"}
        padding={16}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                <button
                  onClick={handleSkip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">{step.description}</p>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    variant="outline"
                  >
                    Back
                  </Button>
                )}
                <Button onClick={handleNext} className="flex-1">
                  {step.action}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentStep ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
