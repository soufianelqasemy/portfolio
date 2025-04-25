import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Define ContactMessage type based on schema
type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function Admin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load contact messages. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Contact Messages</h1>
          <div className="flex gap-4">
            <Button 
              onClick={() => fetchMessages()} 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500 rounded-md text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : messages.length === 0 ? (
          <Card className="bg-black/40 border-primary/10">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">No messages found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <Card key={message.id} className="bg-black/40 border-primary/10 shadow-glow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-medium">{message.subject}</CardTitle>
                    <span className="text-sm text-gray-400">{formatDate(message.createdAt)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <p className="text-sm text-gray-400">
                      From: <span className="text-primary">{message.name}</span> (<a href={`mailto:${message.email}`} className="text-blue-400 hover:underline">{message.email}</a>)
                    </p>
                  </div>
                  <Separator className="my-4 bg-primary/20" />
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}