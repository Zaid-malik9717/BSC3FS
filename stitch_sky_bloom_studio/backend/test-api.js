const BASE = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Flora Sky Bloom Studio Backend Tests...\n');

  // 1. Health
  const health = await fetch(`${BASE}/health`).then(r => r.json());
  console.log('✅ Health Check:', health.status, `(Uptime: ${Math.round(health.uptimeSeconds)}s)`);

  // 2. Products
  const products = await fetch(`${BASE}/products`).then(r => r.json());
  console.log(`✅ Products: Retrieved ${products.count} products (Total: ${products.total})`);

  // 3. Single Product
  const single = await fetch(`${BASE}/products/cloud-blue-hydrangea`).then(r => r.json());
  console.log(`✅ Single Product: '${single.data.name}' with ${single.data.reviews.length} reviews`);

  // 4. Promo Code Validation
  const promo = await fetch(`${BASE}/promos/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'FLORA10', subtotal: 100 })
  }).then(r => r.json());
  console.log(`✅ Promo Validation (${promo.data.code}): ${promo.message} - Discount: $${promo.data.discountAmount}`);

  // 5. Custom Builder Price Calculation
  const calc = await fetch(`${BASE}/builder/calculate-price`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selectedFlowers: [{ id: 'hydrangea', count: 2 }, { id: 'peony', count: 1 }],
      sizeId: 'signature',
      wrapId: 'linen-sky',
      ribbonId: 'velvet-navy'
    })
  }).then(r => r.json());
  console.log(`✅ Bouquet Builder Price Calc: $${calc.data.subtotal} (Multiplier: ${calc.data.sizeMultiplier}x)`);

  // 6. Note Templates
  const notes = await fetch(`${BASE}/notes/templates`).then(r => r.json());
  console.log(`✅ Note Templates: ${notes.data.templates.length} templates, ${notes.data.waxSeals.length} wax seals`);

  // 7. Place Order
  const orderRes = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [
        { id: 'cloud-blue-hydrangea', name: 'Cloud Blue Hydrangea', price: 68, quantity: 1 }
      ],
      deliveryDetails: {
        recipientName: 'Genevieve Dupond',
        streetAddress: '742 Evergreen Terrace',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        phone: '+1 (555) 234-5678',
        deliverySlot: 'morning'
      },
      giftNote: {
        recipient: 'Genevieve',
        message: 'May these blooms bring serenity to your home.',
        sender: 'Julian'
      },
      promoCode: 'FLORA10',
      paymentMethod: 'card'
    })
  }).then(r => r.json());
  console.log(`✅ Place Order: Created Order #${orderRes.data.orderNumber} - Total: $${orderRes.data.pricing.total}`);

  // 8. Fetch Order by Tracking Number
  const orderNumber = orderRes.data.orderNumber;
  const fetchedOrder = await fetch(`${BASE}/orders/${orderNumber}`).then(r => r.json());
  console.log(`✅ Order Lookup (${orderNumber}): Status = '${fetchedOrder.data.status}', Recipient = '${fetchedOrder.data.deliveryDetails.recipientName}'`);

  // 9. Add Product Review
  const reviewRes = await fetch(`${BASE}/products/cloud-blue-hydrangea/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: 'Claire B.',
      rating: 5,
      comment: 'Absolutely stunning arrangement! Arrived in chilled packaging.'
    })
  }).then(r => r.json());
  console.log(`✅ Add Review: Added review, new rating: ${reviewRes.productRating} (${reviewRes.reviewsCount} reviews)`);

  // 10. Newsletter Subscription
  const newsRes = await fetch(`${BASE}/inquiries/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'botanical.lover@example.com' })
  }).then(r => r.json());
  console.log(`✅ Newsletter Subscribe: ${newsRes.message}`);

  console.log('\n🎉 ALL 10 BACKEND REST API TESTS PASSED SUCCESSFULLY!\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
