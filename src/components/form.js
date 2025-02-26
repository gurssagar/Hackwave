"use client";
import React from "react";
import { useState } from "react";
import { Label } from "./label";
import { Textarea } from "./input";
import { cn } from "../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export function SignupFormDemo() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
          const formData = new FormData(e.currentTarget);
          console.log(formData.get('message'));
          const message = formData.get('message');
      
          const response = await fetch('http://localhost:3001/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          });
      
          const data = await response.json();
          
          if (data.success) {
            setSubmissionSuccess(true);
            e.target.reset(); // Clear form
          } else {
            setSubmissionSuccess(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setSubmissionSuccess(false);
        } finally {
          setIsSubmitting(false);
        }
      };
      



  return (
    (<div
      className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      
      <form className="my-8" onSubmit={handleSubmit}>
         <LabelInputContainer className="mb-8">
          <Label htmlFor="message" className="text-left">Message</Label>
          <textarea
            id="message" 
            placeholder="Type your message here..." 
            type="text"
            rows={4}
            cols={30}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit">
          Sent Message &rarr;
          <BottomGradient />
        </button>
        {submissionSuccess === true && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            Message sent successfully!
        </div>
        )}

        {submissionSuccess === false && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                Failed to send message. Please try again.
        </div>
        )}
        <div
          className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      </form>
    </div>)
  );
}

const BottomGradient = () => {
  return (<>
    <span
      className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span
      className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>);
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    (<div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>)
  );
};
