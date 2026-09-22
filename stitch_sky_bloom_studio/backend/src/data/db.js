import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  INITIAL_PRODUCTS,
  INITIAL_BUILDER_OPTIONS,
  INITIAL_NOTE_TEMPLATES,
  INITIAL_WAX_SEALS,
  INITIAL_PROMOS,
  INITIAL_REVIEWS
} from './initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getFilePath(filename) {
  return path.join(DATA_DIR, filename);
}

function readJsonFile(filename, fallbackData) {
  const filePath = getFilePath(filename);
  try {
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filename, fallbackData);
      return fallbackData;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallbackData;
  }
}

function writeJsonFile(filename, data) {
  const filePath = getFilePath(filename);
  const tempPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// Database Store Wrapper
export const db = {
  // Products
  getProducts() {
    return readJsonFile('products.json', INITIAL_PRODUCTS);
  },
  saveProducts(products) {
    writeJsonFile('products.json', products);
  },

  // Builder Options
  getBuilderOptions() {
    return readJsonFile('builder_options.json', INITIAL_BUILDER_OPTIONS);
  },
  saveBuilderOptions(options) {
    writeJsonFile('builder_options.json', options);
  },

  // Note Templates & Seals
  getNoteTemplates() {
    return readJsonFile('note_templates.json', INITIAL_NOTE_TEMPLATES);
  },
  getWaxSeals() {
    return readJsonFile('wax_seals.json', INITIAL_WAX_SEALS);
  },

  // Promos
  getPromos() {
    return readJsonFile('promos.json', INITIAL_PROMOS);
  },
  savePromos(promos) {
    writeJsonFile('promos.json', promos);
  },

  // Orders
  getOrders() {
    return readJsonFile('orders.json', []);
  },
  saveOrders(orders) {
    writeJsonFile('orders.json', orders);
  },

  // Reviews
  getReviews() {
    return readJsonFile('reviews.json', INITIAL_REVIEWS);
  },
  saveReviews(reviews) {
    writeJsonFile('reviews.json', reviews);
  },

  // Inquiries & Custom Orders
  getInquiries() {
    return readJsonFile('inquiries.json', []);
  },
  saveInquiries(inquiries) {
    writeJsonFile('inquiries.json', inquiries);
  },

  // Newsletter Subscribers
  getSubscribers() {
    return readJsonFile('subscribers.json', []);
  },
  saveSubscribers(subscribers) {
    writeJsonFile('subscribers.json', subscribers);
  },

  // Custom Saved Bouquets
  getSavedBouquets() {
    return readJsonFile('saved_bouquets.json', []);
  },
  saveSavedBouquets(bouquets) {
    writeJsonFile('saved_bouquets.json', bouquets);
  }
};
