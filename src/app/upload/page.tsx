'use client'; // Mark this as a Client Component since we handle file uploads and UI state

import { useState } from 'react'; // Import useState hook for managing component state
import { processPdfFile } from './actions'; // Import server action that processes PDF files
import { Card, CardContent } from '@/components/ui/card'; // UI Card components from ShadCN
import { Label } from '@/components/ui/label'; // Label component
import { Input } from '@/components/ui/input'; // Input component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Alert components for showing messages
import { Loader2 } from 'lucide-react'; // Loading spinner icon

export default function PDFUpload() {
  // State to track if a file is being processed
  const [isLoading, setIsLoading] = useState(false);

  // State to show success or error messages to the user
  const [message, setMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  // Function called when the user selects a file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (!file) return; // If no file is selected, exit

    setIsLoading(true); // Show loading spinner
    setMessage(null); // Clear previous messages

    try {
      // Create FormData and append the PDF file
      const formData = new FormData();
      formData.append('pdf', file); // Key must match what the server expects

      // Call the server action to process the PDF
      const result = await processPdfFile(formData);

      if (result.success) {
        // If processing is successful, show a success message
        setMessage({
          type: 'success',
          text: result.message || 'PDF processed successfully',
        });
        e.target.value = ''; // Clear the file input so user can upload another file
      } else {
        // If the server returns an error, show an error message
        setMessage({
          type: 'error',
          text: result.error || 'Failed to process PDF',
        });
      }
    } catch (err) {
      // Catch unexpected errors and show a generic error message
      setMessage({
        type: 'error',
        text: 'An error occurred while processing the PDF',
      });
    } finally {
      setIsLoading(false); // Always hide loading spinner at the end
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Main container with background and padding */}
      <div className="max-w-4xl mx-auto">
        {/* Centered container with max width */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          PDF Upload
        </h1>
        {/* Page title */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Spacing between elements */}
              <div>
                <Label htmlFor="pdf-upload">Upload PDF File</Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf" // Only allow PDF files
                  onChange={handleFileUpload} // Trigger file upload handler
                  disabled={isLoading} // Disable input while loading
                  className="mt-2"
                />
              </div>

              {isLoading && (
                <div className="flex items-center gap-2">
                  {/* Show loader when processing */}
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-muted-foreground">
                    Processing PDF...
                  </span>
                </div>
              )}

              {message && (
                <Alert
                  variant={message.type === 'error' ? 'destructive' : 'default'}
                >
                  {/* Alert variant changes based on message type */}
                  <AlertTitle>
                    {message.type === 'error' ? 'Error!' : 'Success!'}
                  </AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
