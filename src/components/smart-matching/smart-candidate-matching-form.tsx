 "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { smartCandidateMatching, type SmartCandidateMatchingOutput } from "@/ai/flows/smart-candidate-matching";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, HelpCircle } from "lucide-react";

export function SmartCandidateMatchingForm() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<SmartCandidateMatchingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || !jobDescription.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide both candidate resume and job description.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const output = await smartCandidateMatching({
        candidateResume: resume,
        jobDescription: jobDescription,
      });
      setResult(output);
      toast({
        title: "Analysis Complete",
        description: "Candidate match score and suggested questions generated.",
      });
    } catch (error) {
      console.error("Smart Candidate Matching Error:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-7 w-7 text-primary" />
            Smart Candidate Matching
          </CardTitle>
          <CardDescription>
            AI-powered tool to assess candidate fit and generate interview questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="candidate-resume" className="text-lg font-medium">Candidate Resume</Label>
                <Textarea
                  id="candidate-resume"
                  placeholder="Paste candidate's resume here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  rows={12}
                  className="resize-none"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-description" className="text-lg font-medium">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={12}
                  className="resize-none"
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Candidate
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Job Match Score</Label>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={result.jobMatchScore} className="h-4 flex-1" />
                <span className="font-semibold text-lg text-primary">{result.jobMatchScore}%</span>
              </div>
            </div>
            <div>
              <Label htmlFor="suggested-questions" className="text-base font-medium flex items-center gap-1">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                Suggested Interview Questions
              </Label>
              <div
                id="suggested-questions"
                className="mt-2 p-4 bg-muted/50 rounded-md border"
              >
                {result.suggestedQuestions.split('\n').map((line, index) => (
                    // Assuming questions might be numbered or bulleted
                    <p key={index} className={`text-sm ${line.trim().startsWith('-') || /^\d+\./.test(line.trim()) ? 'ml-4' : ''}`}>{line || <br/></p>
                ))}
              </div>
            </div>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground">
              Note: AI-generated scores and questions are for guidance only. Always use human judgment in hiring decisions.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
