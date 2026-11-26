import React, { useState, useEffect } from 'react';
import { brand } from '../data/brand';
import { updateMetaTags } from '../utils/seo';
import Button from '../components/ui/Button';
import { MapPin, Clock, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ onOpenBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Homeowner',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: 'Contact & Studios | ATELIER',
      description: 'Visit ATELIER flagship furniture showrooms in New York, London, and Tokyo. Contact our architectural spatial team for inquiries and trade orders.',
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-32">
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="max-w-2xl">
          <span className="font-caption text-[#72503C] tracking-[0.2em] block mb-3">
            STUDIOS & INQUIRIES
          </span>
          <h1 className="font-display-hero text-[#181818] font-medium leading-[1.0]">
            Connect with<br />
            ATELIER.
          </h1>
          <p className="font-body-lead text-[#76726B] mt-4">
            Whether inquiring about a bespoke residential commission, requesting material samples, or scheduling a private studio walkthrough, our advisory team is at your disposal.
          </p>
        </div>
      </section>

      {/* Flagship Showrooms Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-t border-[#E6E2D8]">
        <h2 className="font-display font-medium text-2xl text-[#181818] mb-8">
          Flagship Showrooms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brand.showrooms.map((showroom) => (
            <div
              key={showroom.city}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6E2D8] shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EDE8E0]">
                <img
                  src={showroom.image}
                  alt={`ATELIER ${showroom.city} Studio`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-[#181818]">
                  {showroom.city}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-[#181818]">
                    <MapPin className="w-4 h-4 text-[#72503C] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{showroom.neighborhood}</p>
                      <p className="text-[#76726B] mt-0.5">{showroom.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-[#76726B]">
                    <Clock className="w-4 h-4 text-[#72503C] shrink-0" />
                    <span>{showroom.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-[#76726B]">
                    <Phone className="w-4 h-4 text-[#72503C] shrink-0" />
                    <span>{showroom.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E2D8]">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={onOpenBooking}
                  >
                    Request Private Viewing
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General & Trade Inquiry Form */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-[#E6E2D8] shadow-sm">
          <div className="text-center mb-8">
            <span className="font-caption text-[#72503C]">Direct Message</span>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#181818] mt-1">
              General & Trade Inquiries
            </h2>
            <p className="text-xs text-[#76726B] mt-2">
              For interior architects, residential clients, and press inquiries.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-display font-medium text-xl text-[#181818]">Message Staged</h3>
              <p className="text-xs text-[#76726B] max-w-sm mx-auto">
                Thank you, {formData.name}. Your inquiry has been staged in local demonstration mode. An ATELIER client director will connect with you via {formData.email}.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Claire DeWitt"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="claire@dewittarchitects.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  I am a...
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                >
                  <option value="Homeowner">Private Residential Client</option>
                  <option value="Interior Designer">Interior Designer / Architect</option>
                  <option value="Trade Partner">Contract / Hospitality Specifier</option>
                  <option value="Press">Press / Media Representative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquiring about trade terms for a residential project in Malibu..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
