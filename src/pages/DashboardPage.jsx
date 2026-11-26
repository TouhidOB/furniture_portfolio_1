import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Palette, Package, Inbox,
  CalendarCheck, CheckCircle2, Save, ArrowLeft, RefreshCw,
  ExternalLink, Sparkles, Trash2, Plus, Edit3, Eye,
  UploadCloud, Lock, Unlock, Image as ImageIcon, Loader2, FileUp
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/product';

export default function DashboardPage() {
  const { sections, theme, updateSection, updateTheme, stats, refreshStats } = useCMS();
  const [activeTab, setActiveTab] = useState('sections'); // 'overview', 'sections', 'theme', 'products', 'inquiries', 'appointments'
  const [selectedSectionKey, setSelectedSectionKey] = useState('hero');
  const [saveToast, setSaveToast] = useState('');

  // Authentication barrier state (Studio key: atelier2026)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('atelier_cms_auth') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Local form states
  const [sectionForm, setSectionForm] = useState(sections[selectedSectionKey] || {});
  const [themeForm, setThemeForm] = useState(theme);

  // File upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  // Products and Leads state
  const [productsList, setProductsList] = useState([]);
  const [inquiriesList, setInquiriesList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const handleUnlockStudio = (e) => {
    e.preventDefault();
    if (passcodeInput.trim() === 'atelier2026') {
      sessionStorage.setItem('atelier_cms_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect studio access key. Please try again (default: atelier2026).');
    }
  };

  const handleLockStudio = () => {
    sessionStorage.removeItem('atelier_cms_auth');
    setIsAuthenticated(false);
    setPasscodeInput('');
  };

  const handleFileUpload = async (file, targetField = 'heroImage') => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name}...`);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'File upload failed');
      }

      const data = await res.json();
      if (targetField === 'heroImage' && editingProduct) {
        setEditingProduct((prev) => ({
          ...prev,
          images: { ...(prev?.images || {}), hero: data.url }
        }));
      } else if (targetField === 'glbModel' && editingProduct) {
        setEditingProduct((prev) => ({
          ...prev,
          model3d: { ...(prev?.model3d || {}), glbUrl: data.url }
        }));
      } else if (targetField === 'sectionImage') {
        setSectionForm((prev) => ({
          ...prev,
          image_url: data.url
        }));
      }
      showSuccess(`Uploaded ${file.name} successfully!`);
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  // Sync section form when selected section changes or sections load
  useEffect(() => {
    if (sections[selectedSectionKey]) {
      setSectionForm(sections[selectedSectionKey]);
    }
  }, [selectedSectionKey, sections]);

  useEffect(() => {
    setThemeForm(theme);
  }, [theme]);

  // Load products, inquiries, and appointments from backend
  const loadData = async () => {
    try {
      const prodRes = await fetch('/api/products/');
      if (prodRes.ok) setProductsList(await prodRes.json());

      const inqRes = await fetch('/api/inquiries/');
      if (inqRes.ok) setInquiriesList(await inqRes.json());

      const apptRes = await fetch('/api/appointments/');
      if (apptRes.ok) setAppointmentsList(await apptRes.json());

      refreshStats();
    } catch (err) {
      console.warn('Backend load err:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const showSuccess = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    await updateSection(selectedSectionKey, sectionForm);
    showSuccess(`Updated ${sectionForm.name || selectedSectionKey} successfully!`);
  };

  const handleSaveTheme = async (e) => {
    e.preventDefault();
    await updateTheme(themeForm);
    showSuccess('Theme colors and body styles updated live!');
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.slug) return;

    try {
      const isNew = !editingProduct.id;
      const url = isNew ? '/api/products/' : `/api/products/${editingProduct.slug}/`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      if (res.ok) {
        showSuccess(isNew ? 'New furniture piece created!' : 'Product updated!');
        setShowProductModal(false);
        setEditingProduct(null);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (slug) => {
    if (!window.confirm(`Delete piece "${slug}"?`)) return;
    try {
      const res = await fetch(`/api/products/${slug}/`, { method: 'DELETE' });
      if (res.ok) {
        showSuccess('Product removed from catalog.');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showSuccess(`Inquiry #${id} marked as ${status}`);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/appointments/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showSuccess(`Appointment marked as ${status}`);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#181818] text-[#F5F2EC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#202020] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#D7C5AF]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="font-caption text-[#D7C5AF] tracking-[0.2em] block uppercase text-xs">
              ATELIER STUDIO SECURITY
            </span>
            <h2 className="font-display font-medium text-2xl text-white mt-2">
              CMS Studio Access
            </h2>
            <p className="text-xs text-[#A7A39C] mt-2 leading-relaxed">
              Administrative credentials required to manage showroom catalog, pricing, and 3D architectural content.
            </p>
          </div>

          <form onSubmit={handleUnlockStudio} className="space-y-4">
            <input
              type="password"
              placeholder="Enter studio key (default: atelier2026)"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-center text-sm focus:outline-none focus:border-white transition-colors"
              autoFocus
            />
            {authError && (
              <p className="text-xs text-rose-400">{authError}</p>
            )}
            <Button type="submit" variant="ivory" size="md" className="w-full">
              Unlock Studio →
            </Button>
          </form>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A7A39C]">
            <Link to="/" className="hover:text-white transition-colors">
              ← Return to Showroom
            </Link>
            <span>Passcode: <code className="text-[#D7C5AF]">atelier2026</code></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-[#181818] flex flex-col pt-16">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-[#E6E2D8] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#76726B] hover:text-[#181818] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Showroom</span>
          </Link>
          <span className="text-[#D7C5AF]">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-display font-medium text-lg text-[#181818] tracking-tight">
              ATELIER CMS Studio
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-[#181818]/5 text-[10px] font-mono uppercase text-[#72503C]">
              Enterprise v1.1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveToast && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {saveToast}
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D7C5AF] hover:border-[#181818] text-xs font-medium text-[#181818] bg-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Site</span>
            <ExternalLink className="w-3 h-3 text-[#A7A39C]" />
          </a>
          <button
            type="button"
            onClick={handleLockStudio}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D7C5AF] hover:border-[#181818] text-xs font-medium text-[#76726B] hover:text-[#181818] bg-white transition-colors"
            title="Lock CMS Studio"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Main Studio Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <nav className="bg-white rounded-2xl p-3 border border-[#E6E2D8] shadow-sm space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#181818] text-white shadow-sm'
                  : 'text-[#76726B] hover:text-[#181818] hover:bg-black/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Metrics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('sections')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'sections'
                  ? 'bg-[#181818] text-white shadow-sm'
                  : 'text-[#76726B] hover:text-[#181818] hover:bg-black/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Section Content (12)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'theme'
                  ? 'bg-[#181818] text-white shadow-sm'
                  : 'text-[#76726B] hover:text-[#181818] hover:bg-black/5'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Theme & Body Colors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'products'
                  ? 'bg-[#181818] text-white shadow-sm'
                  : 'text-[#76726B] hover:text-[#181818] hover:bg-black/5'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Product Catalog ({productsList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-[#181818] text-white shadow-sm'
                  : 'text-[#76726B] hover:text-[#181818] hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Inquiries & Orders</span>
              </div>
              {inquiriesList.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#72503C] text-white">
                  {inquiriesList.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'appointments'
                  ? 'bg-[#181818] text-white shadow-sm'
                  : 'text-[#76726B] hover:text-[#181818] hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Showroom Bookings</span>
              </div>
              {appointmentsList.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#72503C] text-white">
                  {appointmentsList.length}
                </span>
              )}
            </button>
          </nav>

          {/* Connected Backend Indicator */}
          <div className="p-4 bg-white rounded-2xl border border-[#E6E2D8] text-xs text-[#76726B] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase tracking-wider text-[10px] text-[#181818]">
                Django REST API
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                Connected
              </span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Serving real-time database updates at <code className="text-[#72503C]">/api/</code>
            </p>
          </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D8] shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-[#76726B]">Total Pieces</p>
                  <p className="font-display font-medium text-3xl text-[#181818] mt-1">
                    {stats?.total_products || productsList.length}
                  </p>
                  <span className="text-[11px] text-emerald-600 block mt-1">● Active in Showroom</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D8] shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-[#76726B]">Collections</p>
                  <p className="font-display font-medium text-3xl text-[#181818] mt-1">
                    {stats?.total_collections || 4}
                  </p>
                  <span className="text-[11px] text-[#76726B] block mt-1">Living, Dining, Bed, Work</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D8] shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-[#76726B]">Client Inquiries</p>
                  <p className="font-display font-medium text-3xl text-[#181818] mt-1">
                    {stats?.total_inquiries || inquiriesList.length}
                  </p>
                  <span className="text-[11px] text-[#72503C] block mt-1">Custom orders & swatches</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E6E2D8] shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-[#76726B]">Showroom Visits</p>
                  <p className="font-display font-medium text-3xl text-[#181818] mt-1">
                    {stats?.total_appointments || appointmentsList.length}
                  </p>
                  <span className="text-[11px] text-[#72503C] block mt-1">NYC • London • Tokyo</span>
                </div>
              </div>

              {/* Quick Jump Banner */}
              <div className="bg-gradient-to-r from-[#181818] to-[#2E2825] text-white p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="font-caption text-[#D7C5AF]">ATELIER Content Management</span>
                  <h2 className="font-display font-medium text-2xl mt-1">
                    Complete Editorial & Visual Control
                  </h2>
                  <p className="text-sm text-[#A7A39C] max-w-lg mt-2 leading-relaxed">
                    Instantly update headlines, brand manifesto copy, photography URLs, body background colors, and 3D product presets across the entire digital showroom.
                  </p>
                </div>
                <Button variant="ivory" size="md" onClick={() => setActiveTab('sections')}>
                  Edit Section Content
                </Button>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="bg-white rounded-2xl p-6 border border-[#E6E2D8] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-medium text-base text-[#181818]">
                    Recent Client Inquiries
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-[#72503C] hover:underline"
                  >
                    View All ({inquiriesList.length}) →
                  </button>
                </div>

                {inquiriesList.length > 0 ? (
                  <div className="divide-y divide-[#E6E2D8] text-xs">
                    {inquiriesList.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-[#181818]">{inq.name} ({inq.email})</p>
                          <p className="text-[#76726B]">{inq.product_name} • {inq.variant_name || 'Standard'}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#EDE8E0] text-[#181818] font-mono">
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#76726B] py-4">No client inquiries received yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SECTION CONTENT CMS */}
          {activeTab === 'sections' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-8">
              <div>
                <span className="font-caption text-[#72503C]">Live Content Editor</span>
                <h2 className="font-display font-medium text-2xl text-[#181818] mt-1">
                  Manage Homepage Sections
                </h2>
                <p className="text-xs text-[#76726B] mt-1">
                  Select a section to customize its title, text, CTAs, colors, or images.
                </p>
              </div>

              {/* Section Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 border-b border-[#E6E2D8] pb-6">
                {Object.keys(sections).map((key) => {
                  const sec = sections[key];
                  const isSelected = selectedSectionKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSectionKey(key)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                        isSelected
                          ? 'border-[#181818] bg-[#F5F2EC] font-semibold text-[#181818] shadow-sm'
                          : 'border-[#E6E2D8] text-[#76726B] hover:text-[#181818] hover:border-[#A7A39C]'
                      }`}
                    >
                      <span className="line-clamp-1">{sec.name || key}</span>
                    </button>
                  );
                })}
              </div>

              {/* Section Edit Form */}
              <form onSubmit={handleSaveSection} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E6E2D8]">
                  <h3 className="font-display font-medium text-lg text-[#181818]">
                    Editing: <span className="text-[#72503C]">{sectionForm.name || selectedSectionKey}</span>
                  </h3>
                  <Button type="submit" variant="primary" size="sm" icon={Save}>
                    Save Changes
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Eyebrow / Small Header
                    </label>
                    <input
                      type="text"
                      value={sectionForm.eyebrow || ''}
                      onChange={(e) => setSectionForm({ ...sectionForm, eyebrow: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Section Title / Headline
                    </label>
                    <input
                      type="text"
                      value={sectionForm.title || ''}
                      onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Subtitle / Editorial Quote
                    </label>
                    <input
                      type="text"
                      value={sectionForm.subtitle || ''}
                      onChange={(e) => setSectionForm({ ...sectionForm, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Body Description Text
                    </label>
                    <textarea
                      rows={4}
                      value={sectionForm.description || ''}
                      onChange={(e) => setSectionForm({ ...sectionForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Primary CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={sectionForm.cta_primary_label || ''}
                      onChange={(e) => setSectionForm({ ...sectionForm, cta_primary_label: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Primary CTA Target Link
                    </label>
                    <input
                      type="text"
                      value={sectionForm.cta_primary_link || ''}
                      onChange={(e) => setSectionForm({ ...sectionForm, cta_primary_link: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm text-[#181818] focus:border-[#181818] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Section Background Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={sectionForm.background_color || '#F5F2EC'}
                        onChange={(e) => setSectionForm({ ...sectionForm, background_color: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8] p-0.5"
                      />
                      <input
                        type="text"
                        value={sectionForm.background_color || '#F5F2EC'}
                        onChange={(e) => setSectionForm({ ...sectionForm, background_color: e.target.value })}
                        className="flex-1 px-4 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Section Text Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={sectionForm.text_color || '#181818'}
                        onChange={(e) => setSectionForm({ ...sectionForm, text_color: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8] p-0.5"
                      />
                      <input
                        type="text"
                        value={sectionForm.text_color || '#181818'}
                        onChange={(e) => setSectionForm({ ...sectionForm, text_color: e.target.value })}
                        className="flex-1 px-4 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#76726B] mb-1.5">
                      Featured Background Image / Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#F5F2EC] border border-dashed border-[#D7C5AF]">
                      {sectionForm.image_url ? (
                        <img
                          src={sectionForm.image_url}
                          alt="Section preview"
                          className="w-20 h-20 object-cover rounded-xl bg-white border border-[#E6E2D8] shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-[#E6E2D8]/50 flex items-center justify-center text-[#76726B] shrink-0">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}

                      <div className="flex-1 w-full space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181818] hover:bg-[#2C2A29] text-white font-medium transition-colors">
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Upload Image from Computer</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(e.target.files[0], 'sectionImage');
                                }
                              }}
                            />
                          </label>
                          {isUploading && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-[#72503C] animate-pulse">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              {uploadProgress}
                            </span>
                          )}
                        </div>
                        <input
                          type="url"
                          value={sectionForm.image_url || ''}
                          onChange={(e) => setSectionForm({ ...sectionForm, image_url: e.target.value })}
                          placeholder="Or paste image URL (https://...)"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6E2D8] text-xs text-[#181818] focus:border-[#181818] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E2D8] flex justify-end">
                  <Button type="submit" variant="primary" size="md" icon={Save}>
                    Save Section Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: THEME & BODY COLORS */}
          {activeTab === 'theme' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-8">
              <div>
                <span className="font-caption text-[#72503C]">Brand Visual System</span>
                <h2 className="font-display font-medium text-2xl text-[#181818] mt-1">
                  Global Theme & Body Colors
                </h2>
                <p className="text-xs text-[#76726B] mt-1">
                  Customize the overall body background color, text colors, and brand palette accents in real time.
                </p>
              </div>

              <form onSubmit={handleSaveTheme} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {/* Body Background Color */}
                  <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8] space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Body Background Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeForm.body_bg_color || '#F5F2EC'}
                        onChange={(e) => setThemeForm({ ...themeForm, body_bg_color: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8]"
                      />
                      <input
                        type="text"
                        value={themeForm.body_bg_color || '#F5F2EC'}
                        onChange={(e) => setThemeForm({ ...themeForm, body_bg_color: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Body Text Color */}
                  <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8] space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Body Text Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeForm.body_text_color || '#181818'}
                        onChange={(e) => setThemeForm({ ...themeForm, body_text_color: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8]"
                      />
                      <input
                        type="text"
                        value={themeForm.body_text_color || '#181818'}
                        onChange={(e) => setThemeForm({ ...themeForm, body_text_color: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Primary Ivory */}
                  <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8] space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Primary Ivory
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeForm.primary_ivory || '#F5F2EC'}
                        onChange={(e) => setThemeForm({ ...themeForm, primary_ivory: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8]"
                      />
                      <input
                        type="text"
                        value={themeForm.primary_ivory || '#F5F2EC'}
                        onChange={(e) => setThemeForm({ ...themeForm, primary_ivory: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Deep Charcoal */}
                  <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8] space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Deep Charcoal
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeForm.deep_charcoal || '#181818'}
                        onChange={(e) => setThemeForm({ ...themeForm, deep_charcoal: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8]"
                      />
                      <input
                        type="text"
                        value={themeForm.deep_charcoal || '#181818'}
                        onChange={(e) => setThemeForm({ ...themeForm, deep_charcoal: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Walnut Brown */}
                  <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8] space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Walnut Brown (Accent)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeForm.walnut_brown || '#72503C'}
                        onChange={(e) => setThemeForm({ ...themeForm, walnut_brown: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8]"
                      />
                      <input
                        type="text"
                        value={themeForm.walnut_brown || '#72503C'}
                        onChange={(e) => setThemeForm({ ...themeForm, walnut_brown: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  {/* Warm Sand */}
                  <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8] space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#181818]">
                      Warm Sand
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={themeForm.warm_sand || '#D7C5AF'}
                        onChange={(e) => setThemeForm({ ...themeForm, warm_sand: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-[#E6E2D8]"
                      />
                      <input
                        type="text"
                        value={themeForm.warm_sand || '#D7C5AF'}
                        onChange={(e) => setThemeForm({ ...themeForm, warm_sand: e.target.value })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Swatch Preview */}
                <div className="p-6 rounded-2xl bg-[#EDE8E0] border border-[#E6E2D8] space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#181818] block">
                    Palette Swatch Bar
                  </span>
                  <div className="flex h-12 rounded-xl overflow-hidden shadow-inner border border-black/10">
                    <div className="flex-1" style={{ backgroundColor: themeForm.primary_ivory }} title="Primary Ivory" />
                    <div className="flex-1" style={{ backgroundColor: themeForm.warm_sand }} title="Warm Sand" />
                    <div className="flex-1" style={{ backgroundColor: themeForm.walnut_brown }} title="Walnut Brown" />
                    <div className="flex-1" style={{ backgroundColor: themeForm.stone_gray }} title="Stone Gray" />
                    <div className="flex-1" style={{ backgroundColor: themeForm.muted_bronze }} title="Muted Bronze" />
                    <div className="flex-1" style={{ backgroundColor: themeForm.deep_charcoal }} title="Deep Charcoal" />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E6E2D8] flex justify-end">
                  <Button type="submit" variant="primary" size="lg" icon={Save}>
                    Apply Theme & Colors Live
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: PRODUCT CATALOG CMS */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E6E2D8]">
                <div>
                  <span className="font-caption text-[#72503C]">Catalog Manager</span>
                  <h2 className="font-display font-medium text-2xl text-[#181818] mt-1">
                    Showroom Furniture ({productsList.length})
                  </h2>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      slug: '',
                      category: 'living',
                      collection: 'Signature Series',
                      tagline: '',
                      shortDescription: '',
                      longDescription: '',
                      price: 2500,
                      currency: 'USD',
                      availability: 'Made to order — 4-6 weeks',
                      images: { hero: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
                      model3d: { type: 'sofa', defaultColor: '#F5F2EC', defaultFinish: 'boucle' }
                    });
                    setShowProductModal(true);
                  }}
                >
                  Add New Furniture Piece
                </Button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#181818]">
                  <thead className="bg-[#F5F2EC] text-[#76726B] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Piece</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">3D Model</th>
                      <th className="p-3.5">Availability</th>
                      <th className="p-3.5 rounded-r-xl text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E2D8]">
                    {productsList.map((product) => (
                      <tr key={product.id || product.slug} className="hover:bg-black/5 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={product.images?.hero}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg bg-[#EAE4D9]"
                          />
                          <div>
                            <p className="font-medium text-sm text-[#181818]">{product.name}</p>
                            <p className="text-[11px] text-[#76726B] font-mono">/{product.slug}</p>
                          </div>
                        </td>
                        <td className="p-3.5 uppercase font-medium text-[11px]">{product.category}</td>
                        <td className="p-3.5 font-semibold text-sm">{formatPrice(product.price)}</td>
                        <td className="p-3.5 capitalize">{product.model3d?.type || 'sofa'}</td>
                        <td className="p-3.5 text-[#76726B] text-[11px]">{product.availability}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(product);
                              setShowProductModal(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-black/10 text-[#76726B] hover:text-[#181818]"
                            title="Edit Piece"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.slug)}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600"
                            title="Delete Piece"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: INQUIRIES & ORDERS */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-6">
              <div>
                <span className="font-caption text-[#72503C]">Bespoke Leads</span>
                <h2 className="font-display font-medium text-2xl text-[#181818] mt-1">
                  Product Inquiries ({inquiriesList.length})
                </h2>
                <p className="text-xs text-[#76726B] mt-1">
                  Customer inquiries containing custom dimensions, fabric swatches, and estimated order values.
                </p>
              </div>

              {inquiriesList.length > 0 ? (
                <div className="divide-y divide-[#E6E2D8] text-xs">
                  {inquiriesList.map((inq) => (
                    <div key={inq.id} className="py-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-[#72503C] uppercase tracking-wider block">
                            #{inq.inquiry_id} • {new Date(inq.created_at).toLocaleDateString()}
                          </span>
                          <h4 className="font-display font-medium text-base text-[#181818]">
                            {inq.name} ({inq.email}) {inq.phone && `• ${inq.phone}`}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#76726B]">Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="px-3 py-1.5 rounded-full border border-[#E6E2D8] bg-[#F5F2EC] text-xs font-medium cursor-pointer"
                          >
                            <option value="Received">Received</option>
                            <option value="In Review">In Review</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-3 bg-[#F5F2EC] rounded-xl text-xs space-y-1">
                        <p><strong>Piece:</strong> {inq.product_name} ({inq.variant_name || 'Standard'})</p>
                        <p><strong>Finish:</strong> {inq.material_name || 'Standard'} • <strong>Est. Value:</strong> {inq.estimated_price}</p>
                        {inq.message && <p className="text-[#76726B] italic mt-1">&ldquo;{inq.message}&rdquo;</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#76726B] text-xs">
                  No inquiries recorded yet.
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SHOWROOM APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D8] shadow-sm space-y-6">
              <div>
                <span className="font-caption text-[#72503C]">Studio Schedule</span>
                <h2 className="font-display font-medium text-2xl text-[#181818] mt-1">
                  Private Showroom Visits ({appointmentsList.length})
                </h2>
                <p className="text-xs text-[#76726B] mt-1">
                  Private walkthrough requests for New York, London, and Tokyo flagship ateliers.
                </p>
              </div>

              {appointmentsList.length > 0 ? (
                <div className="divide-y divide-[#E6E2D8] text-xs">
                  {appointmentsList.map((appt) => (
                    <div key={appt.id} className="py-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-[#72503C] uppercase tracking-wider block">
                            Ref: #{appt.reference_code} • {appt.showroom_city} Flagship
                          </span>
                          <h4 className="font-display font-medium text-base text-[#181818]">
                            {appt.name} ({appt.email})
                          </h4>
                          <p className="text-xs text-[#76726B] mt-0.5">
                            Date: <strong>{appt.preferred_date}</strong> at <strong>{appt.preferred_time}</strong>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#76726B]">Status:</span>
                          <select
                            value={appt.status}
                            onChange={(e) => handleUpdateAppointmentStatus(appt.id, e.target.value)}
                            className="px-3 py-1.5 rounded-full border border-[#E6E2D8] bg-[#F5F2EC] text-xs font-medium cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Rescheduled">Rescheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {appt.notes && (
                        <p className="p-3 bg-[#F5F2EC] rounded-xl text-xs text-[#76726B] italic">
                          Notes: &ldquo;{appt.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#76726B] text-xs">
                  No appointments booked yet.
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Edit Product Modal */}
      {showProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#E6E2D8] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E2D8]">
              <h3 className="font-display font-medium text-xl text-[#181818]">
                {editingProduct.id ? `Edit ${editingProduct.name}` : 'Add New Furniture Piece'}
              </h3>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="text-xs text-[#76726B] hover:text-[#181818]"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase text-[#76726B] mb-1">Piece Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#76726B] mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#76726B] mb-1">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm"
                  >
                    <option value="living">Living Room</option>
                    <option value="dining">Dining Room</option>
                    <option value="bedroom">Bedroom</option>
                    <option value="workspace">Workspace</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#76726B] mb-1">Base Price (USD) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#76726B] mb-1">3D Model Type</label>
                  <select
                    value={editingProduct.model3d?.type || 'sofa'}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      model3d: { ...editingProduct.model3d, type: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm"
                  >
                    <option value="sofa">Modular Sofa</option>
                    <option value="chair">Lounge Chair / Armchair</option>
                    <option value="table">Dining Table</option>
                    <option value="bed">Platform Bed</option>
                    <option value="cabinet">Credenza / Cabinet</option>
                    <option value="desk">Executive Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#76726B] mb-1">Default 3D Color (Hex)</label>
                  <input
                    type="text"
                    value={editingProduct.model3d?.defaultColor || '#F5F2EC'}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      model3d: { ...editingProduct.model3d, defaultColor: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#76726B] mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-[#76726B] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDescription || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#F5F2EC] border border-[#E6E2D8] text-sm"
                />
              </div>

              {/* Product Hero Photography Upload + Preview */}
              <div className="space-y-2">
                <label className="block font-semibold uppercase text-[#76726B] mb-1">
                  Product Hero Photography *
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#F5F2EC] border border-dashed border-[#D7C5AF]">
                  {editingProduct.images?.hero ? (
                    <img
                      src={editingProduct.images.hero}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-xl bg-white border border-[#E6E2D8] shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-[#E6E2D8]/50 flex items-center justify-center text-[#76726B] shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 w-full space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181818] hover:bg-[#2C2A29] text-white font-medium transition-colors">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Image from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], 'heroImage');
                            }
                          }}
                        />
                      </label>
                      {isUploading && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#72503C] animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          {uploadProgress}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#76726B] shrink-0">Or Image URL:</span>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={editingProduct.images?.hero || ''}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          images: { ...(editingProduct.images || {}), hero: e.target.value }
                        })}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs text-[#181818]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom 3D CAD/GLB Asset (Optional) */}
              <div className="space-y-2 pt-2 border-t border-[#E6E2D8]">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold uppercase text-[#76726B]">
                    Custom 3D GLB/CAD Model (Optional)
                  </label>
                  <span className="text-[10px] font-mono text-[#72503C]">.glb / .gltf</span>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl bg-[#F5F2EC] border border-[#E6E2D8]">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-black/5 border border-[#D7C5AF] text-[#181818] font-medium transition-colors text-xs shrink-0">
                    <FileUp className="w-3.5 h-3.5" />
                    <span>Upload .GLB from Computer</span>
                    <input
                      type="file"
                      accept=".glb,.gltf"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0], 'glbModel');
                        }
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Procedural 3D model active (or /media/uploads/model.glb)"
                    value={editingProduct.model3d?.glbUrl || ''}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      model3d: { ...(editingProduct.model3d || {}), glbUrl: e.target.value }
                    })}
                    className="flex-1 w-full px-3 py-1.5 rounded-xl bg-white border border-[#E6E2D8] text-xs font-mono text-[#181818]"
                  />
                </div>
                {editingProduct.model3d?.glbUrl && (
                  <p className="text-[11px] text-emerald-700 font-mono">
                    ✓ Custom 3D GLB active: {editingProduct.model3d.glbUrl}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#E6E2D8] flex justify-end gap-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowProductModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={Save}>
                  Save Piece
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
