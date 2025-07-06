import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { NeonGlow } from "../../assets";

import { PartyPopperIcon } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Section from "../Section";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const questions = [
  {
    id: 1,
    prompt: "Set the number of leaves to zero.",
    codeStart: [
      `# Let's simulate the growth of a plant`,
      `# Set the number of leaves to zero`,
    ],
    codeEnd: `print("Leaves:", leaves)`,
    answers: [
      { id: 1, code: "leaves = 0", correct: true },
      { id: 2, code: "soil = 0", correct: false },
      { id: 3, code: 'leaves = "zero"', correct: false },
    ],
  },
  {
    id: 2,
    prompt: "Assign the value 10 to the variable 'water'.",
    codeStart: [`# Prepare the environment for growth`, `# Assign water value`],
    codeEnd: `print("Water:", water)`,
    answers: [
      { id: 1, code: "water = 10", correct: true },
      { id: 2, code: "water == 10", correct: false },
      { id: 3, code: "10 = water", correct: false },
    ],
  },
  {
    id: 3,
    prompt: "Increase the number of leaves by 1.",
    codeStart: [`leaves = 0`, `# Simulate leaf growth`],
    codeEnd: `print("Leaves:", leaves)`,
    answers: [
      { id: 1, code: "leaves += 1", correct: true },
      { id: 2, code: "leaves =+ 1", correct: false },
      { id: 3, code: "leaves = leaves - 1", correct: false },
    ],
  },
];

export default function CodeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answerLine, setAnswerLine] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { width, height } = useWindowSize();

  const question = questions[currentQuestion];

  const handleSelect = (answer) => {
    setSelected(answer.id);
    setAnswerLine(answer);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setSelected(null);
      setAnswerLine(null);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowDialog(true);
    }
  };

  return (
    <Section>
      <div className="relative min-h-screen px-4 pt-10 pb-20 overflow-hidden ">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
          {showDialog && <Confetti width={width} height={height} />}

          <h2 className="text-xl font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{question.prompt}</p>

          <Card className="p-4 font-mono text-sm text-black bg-black ">
            <pre>
              {question.codeStart.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              {answerLine && (
                <div
                  className={cn(
                    answerLine.correct ? "text-green-400" : "text-red-400"
                  )}
                >
                  {answerLine.code}
                </div>
              )}
              <div>{question.codeEnd}</div>
            </pre>
          </Card>

          <div className="space-y-2">
            {question.answers.map((answer) => (
              <Button
                key={answer.id}
                variant="outline"
                onClick={() => handleSelect(answer)}
                className={cn(
                  "w-full justify-start font-mono",
                  selected === answer.id &&
                    (answer.correct ? "border-green-500" : "border-red-500")
                )}
              >
                {answer.code}
              </Button>
            ))}
          </div>

          {answerLine?.correct && (
            <Button onClick={handleNext} className="mt-4">
              {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
            </Button>
          )}

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="text-center">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center gap-2 text-2xl text-green-600">
                  <PartyPopperIcon className="w-6 h-6 animate-bounce" />
                  Čestitamo!
                </DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-lg">Završio si ovaj kviz! 🎉</p>
              <p className="mt-1 text-muted-foreground">
                Nadamo se da ti je bilo zabavno i poučno!
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Section>
  );
}
