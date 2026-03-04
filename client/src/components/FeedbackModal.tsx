import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquarePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyvmfRZgU8fcd7OeOVCaneLCS2kTgWK2DrQBb4pl0_T7Z7D-diqXfNVb5ljXH7BO3-U/exec";

export function FeedbackModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState("");
  const [useCase, setUseCase] = useState("");
  const [uiFeedback, setUiFeedback] = useState("");
  const [contentFeedback, setContentFeedback] = useState("");
  const [easeOfUse, setEaseOfUse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status || !useCase) {
      toast({
        title: "Missing fields",
        description: "Please select your status and use case before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      secret: "CHANGE_ME_TO_A_LONG_RANDOM_STRING",
      status,
      use_case: useCase,
      ui_feedback: uiFeedback,
      content_feedback: contentFeedback,
      ease_of_use: easeOfUse,
      page: window.location.href,
      user_agent: navigator.userAgent,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      toast({
        title: "Success",
        description: "Thank you for your feedback! It has been recorded.",
      });
      setOpen(false);

      // Reset form
      setStatus("");
      setUseCase("");
      setUiFeedback("");
      setContentFeedback("");
      setEaseOfUse("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong submitting your feedback.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!open && (
          <Button
            className="!fixed bottom-6 right-6 h-14 pr-6 pl-5 rounded-full shadow-2xl hover:shadow-xl transition-all !z-[9999] flex items-center gap-2 text-base font-semibold hover:scale-105 hover:-translate-y-1"
            size="lg"
          >
            <MessageSquarePlus className="w-5 h-5" />
            Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[90vh] sm:h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Beta Feedback</DialogTitle>
          <DialogDescription>
            Help us improve The Statlas! Your feedback goes directly to our team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label>What is your status? *</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger>
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="educator">Educator</SelectItem>
                <SelectItem value="researcher">Researcher</SelectItem>
                <SelectItem value="industry">Industry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>What is your primary use case? *</Label>
            <Select value={useCase} onValueChange={setUseCase} required>
              <SelectTrigger>
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="teaching">Teaching</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="quick reference">Quick Reference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label>UI Feedback</Label>
              <Textarea
                placeholder="What parts of the interface were intuitive or confusing?"
                value={uiFeedback}
                onChange={(e) => setUiFeedback(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Content Feedback</Label>
              <Textarea
                placeholder="Did test logic/glossary definitions make sense? Are we missing critical tests?"
                value={contentFeedback}
                onChange={(e) => setContentFeedback(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Ease of Use</Label>
              <Textarea
                placeholder="How easy was it to get to your final test choice?"
                value={easeOfUse}
                onChange={(e) => setEaseOfUse(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

  return typeof document !== "undefined" && document.body
    ? createPortal(content, document.body)
    : content;
}
