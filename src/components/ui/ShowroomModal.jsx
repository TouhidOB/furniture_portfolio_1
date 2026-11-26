import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { brand } from '../../data/brand';
import Button from './Button';
import { submitAppointmentToBackend } from '../../utils/api';

export default function ShowroomModal({ isOpen, onClose, preselectedShowroom = 'New York' }) {
  const dialogRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState(preselectedShowroom);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '14:00',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setSubmittedBooking(null);
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    const handleClickOutside = (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        onClose();
      }
    };

    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('click', handleClickOutside);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  const activeShowroom = brand.showrooms.find(s => s.city === selectedCity) || brand.showrooms[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;

    setIsSubmitting(true);
    try {
      const payload = {
        showroomCity: activeShowroom.city,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        date: formData.date,
        time: formData.time,
        notes: formData.notes || '',
      };

      const res = await submitAppointmentToBackend(payload);
      const appt = res.appointment || res;

      setSubmittedBooking({
        ...formData,
        showroom: activeShowroom,
        bookingRef: appt.reference_code || `ATL-${Math.floor(100000 + Math.random() * 900000)}`,
        status: appt.status || 'Confirmed'
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="showroom-modal-title"
      className="w-full max-w-2xl bg-[#F5F2EC] rounded-2xl shadow-2xl p-0 border border-[#E6E2D8] overflow-hidden"
    >
      <div className="p-6 border-b border-[#E6E2D8] flex items-center justify-between">
        <div>
          <span className="font-caption text-[#72503C]">Flagship Studios</span>
          <h2 id="showroom-modal-title" className="font-display font-medium text-2xl text-[#181818]">
            Book a Showroom Visit
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full hover:bg-black/5 text-[#76726B] hover:text-[#181818] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 max-h-[75vh] overflow-y-auto overscroll-contain">
        {submittedBooking ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-medium text-2xl text-[#181818]">
              Appointment Registered with Atelier Backend
            </h3>
            <p className="text-sm text-[#76726B] max-w-md mx-auto">
              Thank you, {submittedBooking.name}. Your private walkthrough request at our {submittedBooking.showroom.city} showroom has been saved in the database for {submittedBooking.date} at {submittedBooking.time}.
            </p>
            <div className="p-4 bg-white rounded-xl border border-[#E6E2D8] max-w-sm mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between text-[#76726B]">
                <span>Reference Code:</span>
                <span className="font-mono font-medium text-[#181818]">{submittedBooking.bookingRef}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Showroom:</span>
                <span className="text-[#181818] font-medium">{submittedBooking.showroom.neighborhood}, {submittedBooking.showroom.city}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Contact Email:</span>
                <span className="text-[#181818] font-medium">{submittedBooking.email}</span>
              </div>
              <div className="flex justify-between text-[#76726B]">
                <span>Status:</span>
                <span className="text-emerald-700 font-medium">{submittedBooking.status}</span>
              </div>
            </div>
            <div className="pt-4">
              <Button variant="primary" onClick={onClose}>
                Return to Showroom
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-2">
                Select Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {brand.showrooms.map((showroom) => (
                  <button
                    key={showroom.city}
                    type="button"
                    onClick={() => setSelectedCity(showroom.city)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedCity === showroom.city
                        ? 'border-[#181818] bg-white shadow-sm'
                        : 'border-[#E6E2D8] bg-white/40 hover:bg-white'
                    }`}
                  >
                    <p className="font-display font-medium text-sm text-[#181818]">{showroom.city}</p>
                    <p className="text-[11px] text-[#76726B]">{showroom.neighborhood}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-[#E6E2D8] text-xs text-[#76726B] flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#72503C] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#181818]">{activeShowroom.address}</p>
                <p className="text-[11px] mt-0.5">{activeShowroom.hours} • Phone: {activeShowroom.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Eleanor Vance"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
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
                  placeholder="eleanor@studio.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Preferred Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                  />
                  <Calendar className="w-4 h-4 text-[#76726B] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                  Preferred Time *
                </label>
                <div className="relative">
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                  >
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                  </select>
                  <Clock className="w-4 h-4 text-[#76726B] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                Specific Pieces or Project Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Interested in viewing the Forma Sofa configurations and leather swatches..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#76726B]">
                Appointments include a dedicated design consultant.
              </span>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting to Backend...' : 'Confirm Request'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
