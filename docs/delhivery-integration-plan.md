# Delhivery Integration Plan

End-to-end setup for pincode-based shipping validation on Shopify checkout using Delhivery as the carrier service. Complements the pre-checkout pincode gate already built on the storefront.

---

## Why Delhivery

- ✅ Official Shopify app with carrier-calculated shipping support
- ✅ ~24,000+ pincode coverage across India
- ✅ Strong heavy-goods delivery (suitable for AC)
- ✅ Direct courier — no aggregator middle layer
- ✅ Reliable tracking, COD, RTO support

---

## Integration Steps

### Step 1: Create Delhivery Account
1. Sign up at [delhivery.com](https://www.delhivery.com)
2. Complete business KYC (GSTIN, PAN, bank details)
3. Add pickup warehouse address
4. Approval timeline: ~3–5 business days

### Step 2: Get API Credentials
1. Login to Delhivery dashboard → **API Settings**
2. Generate API token
3. Note: Live token comes after approval; staging token available immediately for testing

### Step 3: Install Shopify App
1. Shopify Admin → **Apps** → search **"Delhivery"** → install official app
2. Authorize access to store
3. Enter Delhivery API credentials
4. Sync products and orders

### Step 4: Configure Pincode Serviceability
1. In Delhivery dashboard → **Serviceability**
2. Either use Delhivery's default coverage OR upload custom pincode list (our CSVs)
3. Set delivery TAT per pincode group:
   - Express pincodes (Pikkol) → 24–48 hrs
   - Standard pincodes (Proship) → 3–7 days

### Step 5: Set Up Free Delivery Rate
1. Delhivery dashboard → **Shipping Rates**
2. Create rule:
   - **Name:** Free Delivery
   - **Rate:** ₹0
   - **Applies to:** All serviceable pincodes
3. Save

### Step 6: Disable Shopify Default Shipping Rates
Critical — prevents bypass of pincode validation.
1. Shopify Admin → **Settings → Shipping and delivery**
2. Click **Manage** on General profile
3. Delete all manual zones (or remove rates)
4. Only Delhivery should provide rates

### Step 7: Enable Carrier-Calculated Shipping
Required on Shopify side. Plan compatibility:

| Plan | Carrier-Calculated Shipping |
|---|---|
| Basic | Add-on (~$20/mo annual) |
| Shopify (Standard) | Annual billing only |
| Advanced | Included |
| Shopify Plus | Included |

### Step 8: Test the Flow
| Test Case | Expected Result |
|---|---|
| Serviceable pincode (e.g. 560001) | "Free Delivery — ₹0", proceed |
| Non-serviceable pincode | "No shipping available", blocked |
| Mismatch with our CSV | Sync the lists |

---

## Costing Breakdown

### One-Time Costs

| Item | Cost |
|---|---|
| Delhivery account setup | Free |
| Shopify app install | Free |
| Development/configuration | ~1–2 days work |

### Recurring Costs (Per Shipment)

Delhivery uses **volume-based pricing** based on weight, dimensions, and zone (city, regional, national).

**For an AC (~50–60 kg, large dimensions):**

| Zone | Estimated Cost per Shipment |
|---|---|
| Within city | ₹350–500 |
| Regional (same state / nearby) | ₹600–900 |
| National (cross-zone) | ₹1,200–1,800 |
| Heavy/oversized surcharge | +₹200–400 |

**For lighter products (1–5 kg):**

| Zone | Cost per Shipment |
|---|---|
| Within city | ₹40–60 |
| Regional | ₹60–90 |
| National | ₹90–140 |

> Final rates depend on your monthly volume — Delhivery negotiates lower rates for high-volume sellers (>1000 shipments/month).

### Other Charges
- **COD handling fee:** ~2% of order value (or ₹40, whichever higher)
- **RTO (return to origin):** ~50% of forward shipping rate
- **Additional services:** Insurance, special handling, signature on delivery

### No Monthly Fee
Unlike some aggregators, Delhivery has **no monthly subscription** — you pay only per shipment.

---

## Comparison: Delhivery vs Shiprocket

| | Delhivery (direct) | Shiprocket (aggregator) |
|---|---|---|
| **Setup** | Slightly longer (KYC) | Faster |
| **Pincode coverage** | ~24,000 | ~27,000 |
| **AC/heavy goods** | ✅ Strong | ⚠️ Routes via partners |
| **Per-shipment cost (light)** | ₹40–140 | ₹20–80 |
| **Per-shipment cost (AC)** | ₹350–1,800 | Varies (multiple courier options) |
| **Monthly fee** | None | None (Basic plan) |
| **Multi-courier flexibility** | ❌ Single courier | ✅ 17+ couriers |
| **Best for** | Predictable volume, heavy goods | Flexibility, lighter parcels |

---

## Timeline

| Phase | Duration |
|---|---|
| Delhivery KYC & approval | 3–5 days |
| Shopify integration & config | 1–2 days |
| Pincode upload & rate setup | 1 day |
| Testing & QA | 1–2 days |
| **Total** | **6–10 days** |

---

## Recommendation

**Use Delhivery if:**
- You want predictable, single-courier reliability
- Volume is steady and primarily AC/heavy goods
- You prefer direct courier relationship over aggregator

**Use Shiprocket if:**
- You want flexibility to use multiple couriers
- Volume is mixed (light + heavy products)
- Faster setup is a priority

For an **AC business with limited initial pincodes**, Delhivery is a solid choice — they handle heavy goods well and pricing is transparent at scale.

---

## Final Architecture

```
Storefront (Layer 1 — UX gate, already built)
    ↓
Pincode modal validates against our CSV lists
    ↓
User redirects to Shopify hosted checkout
    ↓
Shopify Checkout (Layer 2 — enforcement via Delhivery)
    ↓
Delhivery returns ₹0 rate for serviceable pincodes
    ↓
"No shipping available" for non-serviceable pincodes
```

Two-layer protection: instant UX feedback before checkout + bypass-proof enforcement at checkout.
