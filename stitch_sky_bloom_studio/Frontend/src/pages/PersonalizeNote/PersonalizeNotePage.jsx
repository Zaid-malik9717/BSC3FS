import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTE_TEMPLATES, WAX_SEALS } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function PersonalizeNotePage() {
  const navigate = useNavigate();
  const { giftNote, setGiftNote, setIsCartOpen } = useCart();

  const [selectedTemplate, setSelectedTemplate] = useState(
    giftNote?.template ? NOTE_TEMPLATES.find(t => t.id === giftNote.template.id) || NOTE_TEMPLATES[0] : NOTE_TEMPLATES[0]
  );
  const [selectedSeal, setSelectedSeal] = useState(
    giftNote?.seal ? WAX_SEALS.find(s => s.id === giftNote.seal.id) || WAX_SEALS[1] : WAX_SEALS[1]
  );
  const [recipient, setRecipient] = useState(giftNote?.recipient || 'Claire');
  const [sender, setSender] = useState(giftNote?.sender || 'Alex');
  const [message, setMessage] = useState(
    giftNote?.message || 'To the most radiant soul—may these blooms bring as much light into your world as you bring into mine. With all my love.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const maxChars = 240;

  const handleSaveNote = () => {
    setGiftNote({
      template: selectedTemplate,
      seal: selectedSeal,
      recipient,
      sender,
      message
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-label-caps text-primary tracking-widest uppercase">
          COMPLIMENTARY STATIONERY
        </span>
        <h1 className="font-headline-md text-3xl md:text-4xl text-on-surface font-bold mt-1 mb-3">
          Add a Personal Touch
        </h1>
        <p className="font-body-md text-sm md:text-base text-on-surface-variant">
          A thoughtful note transforms a beautiful arrangement into a meaningful keepsake. Select a card style and write a message from the heart.
        </p>
      </div>

      {/* Main Designer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        
        {/* Left Column: Interactive Card Preview */}
        <div className="lg:col-span-6 bg-surface-container-low p-6 sm:p-10 rounded-3xl border border-surface-container flex flex-col items-center justify-center min-h-[460px] sticky top-28">
          <div className="w-full max-w-md">
            <span className="block text-center text-xs font-label-caps text-on-surface-variant mb-4">
              LIVE CARD STATIONERY PREVIEW
            </span>

            {/* Note Card Canvas */}
            <div 
              className={`w-full aspect-[1.35/1] rounded-2xl p-8 shadow-xl relative flex flex-col justify-between transition-all duration-300 ${selectedTemplate.styleClass}`}
            >
              {/* Top Card Header */}
              <div className="flex justify-between items-center border-b border-black/10 pb-2">
                <span className="text-[10px] font-label-caps tracking-widest uppercase text-primary">
                  FLORA ATELIER
                </span>
                <span className="text-xs font-medium text-on-surface-variant italic">
                  For {recipient || 'You'}
                </span>
              </div>

              {/* Message Body */}
              <div className="my-auto py-2">
                <p className={`text-sm sm:text-base leading-relaxed ${selectedTemplate.font} ${selectedTemplate.textColor}`}>
                  "{message || 'Your message here...'}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex justify-between items-end border-t border-black/10 pt-3">
                <div className="text-xs text-on-surface-variant">
                  <span className="block text-[9px] font-label-caps uppercase">WITH LOVE,</span>
                  <span className="font-semibold">{sender || 'Anonymous'}</span>
                </div>

                {/* Wax Seal Badge */}
                {selectedSeal.id !== 'none' && (
                  <div className="flex items-center gap-1 bg-white/80 dark:bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/10 shadow-sm">
                    <span className={`material-symbols-outlined text-sm ${selectedSeal.color}`}>
                      {selectedSeal.icon}
                    </span>
                    <span className="text-[9px] font-label-caps text-on-surface">WAX SEALED</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-6 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container space-y-6">
          
          {/* Card Template Selection */}
          <div className="space-y-3">
            <label className="text-xs font-label-caps text-on-surface-variant block">
              1. CHOOSE CARD TEMPLATE
            </label>
            <div className="grid grid-cols-2 gap-3">
              {NOTE_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30'
                        : 'border-outline-variant/40 hover:border-outline-variant bg-surface'
                    }`}
                  >
                    <span className="text-[10px] font-label-caps text-primary block mb-1">{tmpl.badge}</span>
                    <span className="text-xs font-semibold text-on-surface block">{tmpl.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Names Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-label-caps text-on-surface-variant block">
                RECIPIENT NAME
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient's Name"
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-label-caps text-on-surface-variant block">
                SENDER NAME
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Your Name"
                className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-2.5 text-xs text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-label-caps text-on-surface-variant">
                YOUR MESSAGE
              </label>
              <span className={`text-[11px] font-label-caps ${
                message.length > maxChars ? 'text-error' : 'text-on-surface-variant'
              }`}>
                {message.length}/{maxChars}
              </span>
            </div>
            <textarea
              rows={4}
              value={message}
              maxLength={maxChars}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your heartfelt note..."
              className="w-full bg-surface border border-outline-variant/60 rounded-xl p-4 text-xs font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary-container resize-none"
            />
          </div>

          {/* Wax Seal Options */}
          <div className="space-y-3">
            <label className="text-xs font-label-caps text-on-surface-variant block">
              WAX SEAL CREST
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {WAX_SEALS.map((seal) => {
                const isSelected = selectedSeal.id === seal.id;
                return (
                  <button
                    key={seal.id}
                    onClick={() => setSelectedSeal(seal)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-primary bg-primary-container/20 ring-2 ring-primary/30'
                        : 'border-outline-variant/40 hover:border-outline-variant bg-surface'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-xl ${seal.color}`}>
                      {seal.icon}
                    </span>
                    <span className="text-[10px] font-semibold text-on-surface truncate w-full">{seal.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save / Attach Action */}
          <div className="pt-4 border-t border-surface-container space-y-3">
            <button
              onClick={handleSaveNote}
              className="w-full py-4 bg-primary text-white rounded-full font-headline-sm text-sm hover:bg-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">mark_email_read</span>
              <span>Attach Note to My Order (Complimentary)</span>
            </button>

            {savedSuccess && (
              <p className="text-center text-xs text-primary font-label-caps animate-in fade-in">
                ✓ Personalized card attached to your order!
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
