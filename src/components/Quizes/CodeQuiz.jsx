import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { NeonGlow } from "../../assets";

import { PartyPopperIcon } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Section from "../Section";
import { useDispatch, useSelector } from "react-redux";
import { getCourseTestsC } from "@/api/services/testChildService";
import { useParams, useNavigate } from "react-router-dom";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CodeQuiz() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tests } = useSelector((state) => state.testChild);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answerLine, setAnswerLine] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    dispatch(getCourseTestsC(id));
  }, [dispatch, id]);

  const question = tests?.questions?.[currentQuestion];

  if (!tests || !tests.questions || tests.questions.length === 0) {
    return (
      <Section>
        <div className="mt-10 text-xl text-center">Nema dostupnih pitanja.</div>
      </Section>
    );
  }

  const handleSelect = (answer) => {
    setSelected(answer.id);
    setAnswerLine(answer);
  };

  const handleNext = () => {
    if (currentQuestion < tests.questions.length - 1) {
      setSelected(null);
      setAnswerLine(null);
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowDialog(true);
    }
  };

  const handleDialogClose = (open) => {
    setShowDialog(open);
    if (!open) {
      setCurrentQuestion(0);
      setSelected(null);
    }
  };

  return (
    <Section>
      <div className="relative min-h-screen px-4 pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={NeonGlow}
            className="object-cover w-full h-full"
            alt="hero"
          />
        </div>

        <div className="max-w-2xl mx-auto mt-10 space-y-6">
          {showDialog && <Confetti width={width} height={height} />}

          <h1 className="text-2xl font-bold text-center">{tests.title}</h1>
          <h2 className="text-xl font-semibold">
            Pitanje {currentQuestion + 1} od {tests.questions.length}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {question.question}
          </p>

          <Card className="p-4 font-mono text-sm text-white whitespace-pre-wrap bg-black">
            <pre>
              {question.codeStart?.split("`, `").map((line, idx) => (
                <div key={`start-${idx}`}>{line}</div>
              ))}
              {answerLine && (
                <div
                  className={cn(
                    answerLine.correct ? "text-green-400" : "text-red-400"
                  )}
                >
                  {answerLine.answer}
                </div>
              )}
              <div>{question.codeEnd}</div>
            </pre>
          </Card>

          <div className="space-y-2">
            {question.answers.map((answer) => {
              const isSelected = selected === answer.id;
              const isCorrect = answer.correct;

              return (
                <Button
                  key={answer.id}
                  variant="outline"
                  onClick={() => handleSelect(answer)}
                  className={cn(
                    "w-full justify-start font-mono",
                    isSelected &&
                      isCorrect &&
                      "border-green-500 ring-2 ring-green-400",
                    isSelected &&
                      !isCorrect &&
                      "border-red-500 ring-2 ring-red-400"
                  )}
                >
                  {answer.answer}
                </Button>
              );
            })}
          </div>

          {answerLine && (
            <Button onClick={handleNext} className="mt-4">
              {currentQuestion < tests.questions.length - 1
                ? "Dalje"
                : "Završi test"}
            </Button>
          )}

          <Dialog open={showDialog} onOpenChange={handleDialogClose}>
            <DialogContent className="text-center">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center gap-2 text-2xl text-green-600">
                  <PartyPopperIcon className="w-6 h-6 animate-bounce" />
                  Čestitamo!
                </DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-lg">Kviz je završen! 🎉</p>
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
