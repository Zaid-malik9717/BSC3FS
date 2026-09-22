import { db } from '../data/db.js';

export const noteController = {
  // GET /api/notes/templates
  getTemplates(req, res) {
    try {
      const templates = db.getNoteTemplates();
      const seals = db.getWaxSeals();
      res.json({
        success: true,
        data: {
          templates,
          waxSeals: seals
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/notes/preview
  previewNote(req, res) {
    try {
      const { templateId, recipient, message, sender, waxSealId } = req.body;
      const templates = db.getNoteTemplates();
      const seals = db.getWaxSeals();

      const template = templates.find(t => t.id === templateId) || templates[0];
      const seal = seals.find(s => s.id === waxSealId) || seals[0];

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ success: false, error: 'A note message is required.' });
      }

      const notePreview = {
        template,
        recipient: recipient || 'Beloved',
        message: message.trim(),
        sender: sender || 'With love',
        waxSeal: seal,
        characterCount: message.trim().length,
        isValid: true
      };

      res.json({ success: true, data: notePreview });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};
