"use client";
import { MapPin, CircleCheck, CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactSection() {
  const [state, handleSubmit] = useForm("xpwkwndw");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
    }
  }, [state.succeeded]);

  //   if (state.succeeded) {
  //     return (
  //       <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center text-green-700">
  //         <p className="text-lg font-medium">✅ Thank you for your message!</p>
  //         <p>I’ll get back to you as soon as possible.</p>
  //       </div>
  //     );
  //   }

  //   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     setStatus("sending");
  //     const form = e.currentTarget;
  //     const data = new FormData(form);
  //     try {
  //       const res = await fetch("https://formspree.io/f/xpwkwndw", {
  //         method: "POST",
  //         body: data,
  //         headers: {
  //           Accept: "application/json"
  //         }
  //       });
  //       if (res.ok) {
  //         setStatus("success");
  //         form.reset();
  //       } else {
  //         setStatus("error");
  //       }
  //     } catch {
  //       setStatus("error");
  //     }
  //   }

  return (
    <section
      className="relative z-20 py-10 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between border shadow-lg rounded-2xl max-w-5xl m-auto bg-gray-50 gap-8"
      id="contact"
    >
      {/* Coluna esquerda */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg md:text-2xl font-bold mb-2 text-gray-900">
          Let's discuss your project
        </h2>
        <h4 className="text-gray-500 text-base mb-6">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration.
        </h4>

        <div className="flex flex-col justify-center gap-3">
          {/* Card 1 */}
          <Card className="bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="flex items-center gap-3 px-5 py-4 w-full">
              <span className="flex items-center justify-center w-8 h-8 bg-[#A53DFF] rounded flex-shrink-0">
                <MapPin className="text-white w-4 h-4" />
              </span>
              <div className="flex-grow w-full">
                <p className="text-sm text-gray-500">My Email:</p>
                <p className="text-base font-medium text-gray-900 break-words">
                  jalves.nicacio@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardContent className="flex items-center gap-3 px-5 py-4 w-full">
              <span className="flex items-center justify-center w-8 h-8 bg-[#A53DFF] rounded flex-shrink-0">
                <MapPin className="text-white w-4 h-4" />
              </span>
              <div className="flex-grow w-full">
                <p className="text-sm text-gray-500">Location:</p>
                <p className="text-base font-medium text-gray-900">
                  Maceió, Brazil
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Coluna direita — Formulário */}
      <Card className="w-full md:w-1/2 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Send me a message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="mb-1">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="location" className="mb-1">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="City, Country"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="budget" className="mb-1">
                  Budget
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="e.g. $5000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="mb-1">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <Label htmlFor="message" className="mb-1">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me more about your project..."
              />
            </div>

            <Button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-[#A53DFF] text-white hover:bg-[#8f30e6]"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {state.succeeded && (
            <div className="mt-4 text-green-600 flex items-center gap-2">
              <CircleCheck className="w-5 h-5" />
              <span>Your message has been sent successfully!</span>
            </div>
          )}
          {state.errors && (
            <div className="mt-4 text-red-600 flex items-center gap-2">
              <CircleX className="w-5 h-5" />
              <span>
                There was an error sending your message. Please try again.
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
