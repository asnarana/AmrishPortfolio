import { useState } from "react";
// UI components from your design system
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// Custom toast hook for notifications
import { useToast } from "@/hooks/use-toast";
// React Query mutation for async form submission
import { useMutation } from "@tanstack/react-query";
// Helper for making API requests
import { apiRequest } from "@/lib/queryClient";
// Icon imports for visual enhancement
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send, Loader2 } from "lucide-react";

// TypeScript interface for form data shape
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  // State to hold form input values
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Toast notification hook
  const { toast } = useToast();

  // React Query mutation for submitting the contact form
  const contactMutation = useMutation({
    // Function to call when mutating (submitting the form)
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    // On success, show a toast and reset the form
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    // On error, show an error toast
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    contactMutation.mutate(formData); // Trigger mutation
  };

  // Handle input changes for all fields
  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Get In <span className="text-emerald-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just connecting. 
            Let's build something amazing together!
          </p>
        </div>
        
        {/* Main grid: form on left, info on right */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form Card */}
          <Card className="bg-gray-50 dark:bg-gray-800 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email fields side by side on md+ screens */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Subject field */}
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="w-full"
                  />
                </div>
                
                {/* Message textarea */}
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full resize-none"
                  />
                </div>
                
                {/* Submit button with loading state */}
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information and Socials */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                    <Mail className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <a 
                      href="mailto:amrish.naranappa@gmail.com" 
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      amrish.naranappa@gmail.com
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                    <Phone className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                    <a 
                      href="tel:714-389-4886" 
                      className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                    >
                      (714) 389-4886
                    </a>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                    <MapPin className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Raleigh, North Carolina</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Connect With Me
              </h3>
              <div className="flex space-x-4">
                {/* GitHub */}
                <a 
                  href="https://github.com/asnarana" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-900 dark:bg-gray-700 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <Github size={24} />
                </a>
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/in/amrishn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            
            {/* Decorative/branding image */}
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Modern tech startup office environment" 
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}