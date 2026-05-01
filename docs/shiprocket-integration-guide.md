# Shiprocket Integration Guide

End-to-end setup for pincode-based shipping validation on Shopify checkout using Shiprocket as the carrier service. This complements the pre-checkout pincode gate already built on the storefront.

---

## Step 1: Create a Shiprocket Account

1. Sign up at [shiprocket.in](https://www.shiprocket.in)
2. Complete business verification (GSTIN, KYC)
3. Add a pickup address (warehouse location)
4. Wait for account approval (~24 hrs)

---

## Step 2: Connect Shopify to Shiprocket

**In Shopify Admin:**
1. Go to **Apps** → search **"Shiprocket"** → install the official app
2. Authorize Shiprocket to access your store
3. Link your Shiprocket account credentials

**In Shiprocket Dashboard:**
1. Go to **Settings → Channels → Shopify**
2. Confirm the store is linked
3. Sync products and orders

---

## Step 3: Configure Pincode Serviceability

1. In Shiprocket → **Settings → Serviceability**
2. Choose one:
   - Use Shiprocket's default ~27,000 pincode coverage, OR
   - Upload our custom CSVs (Pikkol + Proship)
3. Set delivery TAT per pincode group:
   - Express pincodes (Pikkol) → 24–48 hrs
   - Standard pincodes (Proship) → 3–7 days

---

## Step 4: Set Up Free Delivery Rate

1. In Shiprocket → **Settings → Shipping Rates**
2. Create a new rule:
   - **Name:** Free Delivery
   - **Rate:** ₹0
   - **Applies to:** All serviceable pincodes
   - **Conditions:** None
3. Save

Shiprocket will now return a ₹0 free shipping option for every serviceable pincode.

---

## Step 5: Disable Shopify's Default Shipping Rates

Critical — prevents customers from bypassing pincode validation via Shopify's own rates.

1. Shopify Admin → **Settings → Shipping and delivery**
2. Click **Manage** next to the General shipping profile
3. Delete all manual shipping zones (or remove their rates)
4. Ensure only Shiprocket is providing rates at checkout

---

## Step 6: Enable Carrier-Calculated Shipping

Required for Shiprocket to return rates dynamically at checkout.

| Shopify Plan | Carrier-Calculated Shipping |
|---|---|
| Basic | Add-on (~$20/month annually) |
| Shopify (Standard) | Annual billing only |
| Advanced | Included |
| Shopify Plus | Included |

> Check current plan: Shopify Admin → **Settings → Plan**

---

## Step 7: Test the Flow

| Test Case | Expected Result |
|---|---|
| Checkout with serviceable pincode (e.g. 560001) | "Free Delivery — ₹0" shown, can proceed |
| Checkout with non-serviceable pincode (e.g. 999999) | "No shipping available", cannot proceed |
| Pincode allowed in our modal but missing in Shiprocket | Mismatch — sync the lists |
| Edge cases: leading zeros, invalid format | Handled by Shiprocket validation |

---

## Step 8: Sync Pincode Lists

Keep the pincode list in Shiprocket **identical** to the CSV files used in our pre-checkout modal:
- `Pincode Servicable List - Optimist - Pikkol Serviceable Pincode.csv`
- `Pincode Servicable List - Optimist - Proship Serviceable Pincode.csv`

Otherwise users will see inconsistent behavior between the storefront modal and the checkout page.

---

## Optional Code-Side Tweaks

These are not required for Shiprocket to work but can improve UX:

1. **Remove localStorage persistence** of last-checked pincode — forces re-check each session
2. **Add a note in the pincode modal:** *"Final delivery confirmation will happen at checkout"* — sets expectations correctly

---

## Final Architecture

```
Storefront (Layer 1 — UX gate, already built)
    ↓
Pincode modal validates against our CSV lists
    ↓
User redirects to Shopify hosted checkout
    ↓
Shopify Checkout (Layer 2 — enforcement via Shiprocket)
    ↓
Shiprocket returns ₹0 rate for serviceable pincodes
    ↓
"No shipping available" for non-serviceable pincodes
```

This two-layer approach gives both **good UX** (instant feedback before checkout) and **bypass-proof enforcement** at checkout.
