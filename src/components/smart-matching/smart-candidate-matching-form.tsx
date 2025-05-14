// src/components/smart-matching/smart-candidate-matching-form.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { smartCandidateMatching, type SmartCandidateMatchingOutput } from "@/ai/flows/smart-candidate-matching";
import { generateJobDescription } from "@/ai/flows/generate-job-description-flow";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, HelpCircle, UploadCloud, FileText, Briefcase } from "lucide-react";

const jobRoles = [
  "Software Engineer",
  "Product Manager",
  "UX Designer",
  "Data Analyst",
  "Marketing Specialist",
  "HR Manager",
  "DevOps Engineer",
  "Sales Representative",
];

export function SmartCandidateMatchingForm() {
  const [resumeDataUri, setResumeDataUri] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedJobRole, setSelectedJobRole] = useState<string | undefined>(undefined);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<SmartCandidateMatchingOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isGeneratingJD, setIsGeneratingJD] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedExtensions = ['.txt', '.md', '.pdf', '.doc', '.docx'];
      const fileExtension = ('.' + file.name.split('.').pop()?.toLowerCase()) || "";

      if (allowedExtensions.includes(fileExtension)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUri = e.target?.result as string;
          setResumeDataUri(dataUri);
          setSelectedFileName(file.name);
          toast({
            title: "Resume Uploaded",
            description: `${file.name} loaded successfully.`,
          });
        };
        reader.onerror = () => {
          toast({
            title: "File Read Error",
            description: "Could not read the resume file.",
            variant: "destructive",
          });
          setResumeDataUri("");
          setSelectedFileName("");
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: `Please upload a ${allowedExtensions.join(', ')} file.`,
          variant: "destructive",
        });
        setResumeDataUri("");
        setSelectedFileName("");
        if (event.target) event.target.value = ""; // Clear the file input
      }
    }
  };

  const handleJobRoleChange = async (role: string) => {
    setSelectedJobRole(role);
    setJobDescription("");
    setIsGeneratingJD(true);
    setResult(null); 

    try {
      const output = await generateJobDescription({ jobTitle: role });
      setJobDescription(output.jobDescription);
      toast({
        title: "Job Description Generated",
        description: `JD for ${role} created successfully.`,
      });
    } catch (error) {
      console.error("Job Description Generation Error:", error);
      toast({
        title: "JD Generation Failed",
        description: "Could not generate job description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingJD(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!resumeDataUri) {
      toast({
        title: "Resume Missing",
        description: "Please upload a candidate resume.",
        variant: "destructive",
      });
      return;
    }
    if (!jobDescription.trim()) {
        toast({
          title: "Job Description Missing",
          description: "Please select a job role to generate a job description.",
          variant: "destructive",
        });
        return;
      }

    setIsLoadingAnalysis(true);
    setResult(null);

    try {
      const output = await smartCandidateMatching({
        resumeDataUri: resumeDataUri,
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
      setIsLoadingAnalysis(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-7 w-7 text-primary" />
              Smart Candidate Matching
            </CardTitle>
            <CardDescription>
              Upload a resume (txt, md, pdf, doc, docx) and select a job role to assess candidate fit and generate interview questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="candidate-resume-upload" className="text-lg font-medium flex items-center gap-2">
                    <UploadCloud className="h-5 w-5" /> Candidate Resume
                  </Label>
                  <Input
                    id="candidate-resume-upload"
                    type="file"
                    accept=".txt,.md,.pdf,.doc,.docx,text/plain,text/markdown,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isLoadingAnalysis || isGeneratingJD}
                  />
                  {selectedFileName && (
                    <div className="mt-2 p-3 bg-muted/50 rounded-md border text-sm">
                      <p className="font-semibold">Selected file: {selectedFileName}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-role-select" className="text-lg font-medium flex items-center gap-2">
                    <Briefcase className="h-5 w-5" /> Select Job Role
                  </Label>
                  <Select
                    value={selectedJobRole}
                    onValueChange={handleJobRoleChange}
                    disabled={isLoadingAnalysis || isGeneratingJD}
                  >
                    <SelectTrigger id="job-role-select">
                      <SelectValue placeholder="Choose a job role..." />
                    </SelectTrigger>
                    <SelectContent>
                      {jobRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {isGeneratingJD && (
                <div className="space-y-2 mt-4 p-4 border rounded-md bg-muted/30">
                  <div className="flex items-center justify-center text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Generating Job Description for {selectedJobRole}...</span>
                  </div>
                </div>
              )}

              {jobDescription && !isGeneratingJD && (
                <Card className="mt-4 bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary"/> Generated Job Description
                    </CardTitle>
                    <CardDescription>For role: {selectedJobRole}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-background rounded-md border max-h-60 overflow-y-auto text-sm">
                      <pre className="whitespace-pre-wrap break-all">{jobDescription}</pre>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Button 
                type="submit" 
                className="w-full md:w-auto" 
                disabled={isLoadingAnalysis || isGeneratingJD || !resumeDataUri || !jobDescription}
              >
                {isLoadingAnalysis ? (
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
          <Card className="shadow-xl mt-6">
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
                      <p key={index} className={`text-sm ${line.trim().startsWith('-') || /^\d+\./.test(line.trim()) ? 'ml-4' : ''}`}>{line || <br/>}</p>
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
    </>
  );
}
