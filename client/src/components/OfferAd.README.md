# OfferAd Component

A reusable React component for displaying promotional offers and discount codes based on your reference design.

## Features

- ✨ Modern, responsive design
- 🎨 Multiple style variations (default, banner, compact)
- 📱 Mobile-friendly with responsive layouts
- 🎯 Customizable content and styling
- 🔗 Click handler support
- 💫 Hover animations and transitions

## Usage

### Basic Import
```jsx
import OfferAd from '../components/OfferAd';
```

### Default Usage
```jsx
<OfferAd />
```

This will display the default ACMYX300 offer with all standard content.

### Custom Content
```jsx
<OfferAd 
  tagIcon="🎉"
  headline="Flash Sale: Limited Time Only!"
  description="Get 40% off on all premium courses. Hurry up, only 24 hours left!"
  couponCode="FLASH40"
  validTill="31/12/24"
  onClick={handleOfferClick}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tagIcon` | string | "🏷️" | Icon/emoji displayed before the headline |
| `headline` | string | "ACMYX Launch: Save ₹300" | Main offer headline |
| `description` | string | "Use code ACMYX300 at checkout..." | Offer description text |
| `couponCode` | string | "ACMYX300" | The discount code to display |
| `validTill` | string | "30/06/25" | Offer expiration date |
| `className` | string | "" | Additional CSS classes |
| `onClick` | function | null | Click handler function |

## Style Variations

### Default Style
```jsx
<OfferAd />
```
Standard card layout, perfect for content sections.

### Banner Style (Full Width)
```jsx
<OfferAd className="banner" />
```
Horizontal layout that spans full width, ideal for hero sections or prominent placements.

### Compact Style
```jsx
<OfferAd className="compact" />
```
Smaller size perfect for sidebars, footers, or smaller sections.

## Implementation Examples

### 1. Homepage Hero Section
```jsx
<section className="offer-section">
  <div className="container">
    <OfferAd className="banner" onClick={handleEnrollClick} />
  </div>
</section>
```

### 2. Sidebar Placement
```jsx
<aside className="sidebar">
  <OfferAd className="compact" />
</aside>
```

### 3. Multiple Offers Grid
```jsx
<div className="offers-grid">
  <OfferAd 
    headline="Weekend Special"
    couponCode="WEEKEND20"
    className="compact"
  />
  <OfferAd 
    headline="Student Discount"
    couponCode="STUDENT15"
    className="compact"
  />
</div>
```

### 4. Custom Seasonal Offer
```jsx
<OfferAd 
  tagIcon="🎄"
  headline="Christmas Special: Save ₹500"
  description="Celebrate the season with our biggest discount ever!"
  couponCode="XMAS500"
  validTill="25/12/24"
  onClick={() => window.location.href = '/programs?discount=XMAS500'}
/>
```

## Current Placements

The OfferAd component is currently placed in:

1. **Home Page**: 
   - After hero carousel (banner style)
   - Before pricing section (default style)

2. **Programs Page**: 
   - After programs grid (default style)

3. **About Page**: 
   - After programs information (default style)

4. **Contact Page**: 
   - After contact form (compact style)

## Styling

The component comes with comprehensive CSS including:
- Responsive design for mobile and desktop
- Hover animations and transitions
- Dashed border coupon code styling
- Professional color scheme
- Font family optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Proper semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- High contrast text and backgrounds

## Best Practices

1. **Placement**: Position offers strategically where users are most likely to convert
2. **Content**: Keep headlines concise and action-oriented
3. **Timing**: Update validity dates regularly
4. **Analytics**: Use onClick handlers to track conversion rates
5. **A/B Testing**: Test different headlines and styles

## Customization

To create custom themes, you can override the CSS classes:

```css
.offer-ad.custom-theme {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.offer-ad.custom-theme .coupon-code {
  border-color: #ffffff;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}
```

## Performance

- Lightweight component (~2KB gzipped)
- No external dependencies
- Optimized CSS with minimal reflows
- Efficient re-rendering with React

---

For questions or feature requests, please contact the development team. 