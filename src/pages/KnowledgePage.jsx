import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const KnowledgePage = () => {
  const faqData = [
    {
      question: "How should I take pills: before or after meals?",
      answer: "It depends on the specific medication. Check the instructions to see whether it should be taken on an empty stomach, with food, or after eating.",
    },
    {
      question: "Can I take pills with tea or juice?",
      answer: "It's recommended to take pills with plain water, as tea, coffee, or juice may reduce the effectiveness of the medication.",
    },
    {
      question: "What should I do if I forget to take a pill on time?",
      answer: "If it's been a short time, take the pill as soon as you remember. If it's close to the next dose, skip the missed dose.",
    },
    {
      question: "Can I chew tablets if I find it difficult to swallow them?",
      answer: "Not all tablets can be chewed. Check the instructions or consult your doctor for advice.",
    },
    {
      question: "How should medications be stored properly?",
      answer: "Store medications in a dry place at room temperature, away from direct sunlight and out of the reach of children.",
    },
    {
      question: "How long can medications be used after opening the package?",
      answer: "Shelf life may vary after opening. Refer to the package or instructions for details.",
    },
    {
      question: "Is it safe to take antibiotics without a prescription?",
      answer: "No, antibiotics should only be prescribed by a doctor. Improper use can be dangerous.",
    },
    {
      question: "Why should I avoid alcohol while taking medications?",
      answer: "Alcohol can reduce the effectiveness of the medication or cause unwanted side effects.",
    },
    {
      question: "What should I do if I have an allergic reaction to a medication?",
      answer: "Stop taking the medication immediately and seek medical advice. A doctor may provide an alternative or prescribe an antihistamine.",
    },
    {
      question: "Can I take multiple medications at the same time?",
      answer: "Only under a doctor's recommendation, as some medications can interact with each other.",
    },
  ];

  return (
      <div>
        <Typography variant="h4" gutterBottom>
          Knowledge Page
        </Typography>
        {faqData.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
        ))}
      </div>
  );
};

export default KnowledgePage;
