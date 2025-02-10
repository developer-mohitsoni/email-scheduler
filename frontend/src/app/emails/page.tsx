"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Email {
  id: string;
  to: string;
  subject: string;
  createdAt: Date;
}

export default function Emails() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/emails");
        setEmails(res.data as Email[]);
      } catch {
        console.error("Failed to fetch emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Scheduled Emails
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : emails.length === 0 ? (
            <p className="text-center text-gray-500">
              No scheduled emails found.
            </p>
          ) : (
            <ul className="space-y-2">
              {emails.map((email) => (
                <li
                  key={email.id}
                  className="p-3 bg-white rounded-lg shadow-md"
                >
                  <p className="font-medium">To: {email.to}</p>
                  <p className="text-sm text-gray-600">{email.subject}</p>
                  <p className="text-xs text-gray-500">
                    Scheduled on: {new Date(email.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
