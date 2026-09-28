import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Real-time or submit-time validation rules
  const validateForm = () => {
    let newErrors = {};

    // Name validation: Must not be empty and should not look like numbers or numbers-only
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (/^\d+$/.test(formData.name.trim())) {
      newErrors.name = 'Name cannot be purely numeric numbers.';
    }

    // Email validation: Standard email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message body cannot be empty.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Print all validated details to the console as requested
      console.log('--- Contact Form Submission Data ---');
      console.log('Sender Name:', formData.name);
      console.log('Sender Email:', formData.email);
      console.log('Subject Line:', formData.subject || 'General Inquiry');
      console.log('Message Content:', formData.message);
      console.log('Timestamp:', new Date().toISOString());
      console.log('------------------------------------');

      setSubmitted(true);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error on field as user starts correcting it
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden text-center sm:text-left">
          <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>We're Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
            Get in Touch With Us
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-xl leading-relaxed">
            Have questions about your order, shipping, or products? Reach out to our support team and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Call Support</h3>
                <p className="text-xs text-gray-500 mb-2">Mon-Fri from 9am to 6pm EST</p>
                <a href="tel:+18005550199" className="text-sm font-bold text-indigo-600 hover:underline">
                  +1 (800) 555-0199
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-violet-50 text-violet-600 p-3.5 rounded-2xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Email Us</h3>
                <p className="text-xs text-gray-500 mb-2">We'll reply within 24 hours</p>
                <a href="mailto:support@novastore.com" className="text-sm font-bold text-indigo-600 hover:underline">
                  support@novastore.com
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-amber-50 text-amber-600 p-3.5 rounded-2xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Office Headquarters</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  100 Innovation Avenue, Suite 400<br />
                  San Francisco, CA 94107, USA
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">Business Hours</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Monday - Friday: 9:00 AM - 8:00 PM<br />
                  Saturday - Sunday: 10:00 AM - 5:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-16">
                <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                  Thank you for reaching out, <strong className="text-gray-800">{formData.name}</strong>. Our customer care specialist will get back to you shortly. (Details logged to console).
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">Send Us a Message</h3>
                  <p className="text-xs text-gray-500">Fill out the controlled form below. Validation checks apply.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Aniket Verma"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20' 
                          : 'border-gray-200 focus:ring-indigo-500'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Email Address *</label>
                    <input
                      type="text"
                      placeholder="aniket@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full bg-gray-50 border rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20' 
                          : 'border-gray-200 focus:ring-indigo-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Order Inquiry / Product Support"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you today? (Minimum 10 characters)"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`w-full bg-gray-50 border rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-2 resize-none transition-all ${
                      errors.message 
                        ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20' 
                        : 'border-gray-200 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}