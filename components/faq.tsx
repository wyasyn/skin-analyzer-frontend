import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { aiSkinAnalyzerFAQ } from "@/data/faq";

export default function Faq() {
  return (
    <div className=" pb-20 md:pb-40 wrapper">
      <div className="flex flex-col gap-4 text-center justify-center pt-12 lg:pt-24  ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="max-w-[55ch] mx-auto text-muted-foreground">
          Here are some common questions and answers about our skin analyzer.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl mt-8 md:mt-14 mx-auto"
        defaultValue="0"
      >
        {aiSkinAnalyzerFAQ.map((item, index) => (
          <AccordionItem value={String(index)} key={index} className="py-2">
            <AccordionTrigger className="p-3 rounded-lg text-lg duration-300 hover:bg-secondary leading-6 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground py-2 px-3">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
