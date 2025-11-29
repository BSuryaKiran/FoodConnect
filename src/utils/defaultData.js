// Default donations for donor dashboard
export const getDefaultDonations = (userId) => {
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const fiveDaysFromNow = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const tenDaysFromNow = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

  return [
    {
      id: Date.now() - 1000,
      foodType: 'Fresh Vegetables (Carrots, Tomatoes, Lettuce)',
      quantity: '15',
      unit: 'kg',
      expiryDate: threeDaysFromNow.toISOString().split('T')[0],
      location: 'Azadpur Mandi, Delhi',
      description: 'Organic vegetables, slightly imperfect but perfectly edible. Great for community kitchens.',
      status: 'available',
      createdAt: twoDaysAgo.toISOString(),
      donorName: 'Food Donor'
    },
    {
      id: Date.now() - 2000,
      foodType: 'Bread, Roti & Bakery Items',
      quantity: '8',
      unit: 'kg',
      expiryDate: fiveDaysFromNow.toISOString().split('T')[0],
      location: 'Monginis Bakery, Andheri West, Mumbai',
      description: 'Fresh bread, rotis, and buns from today\'s batch. Best consumed within 2-3 days.',
      status: 'available',
      createdAt: twoDaysAgo.toISOString(),
      donorName: 'Food Donor'
    },
    {
      id: Date.now() - 3000,
      foodType: 'Canned Goods & Non-Perishables',
      quantity: '25',
      unit: 'kg',
      expiryDate: tenDaysFromNow.toISOString().split('T')[0],
      location: 'Reliance Warehouse, Gurgaon',
      description: 'Assorted canned vegetables, dals, and packaged foods. Long shelf life.',
      status: 'available',
      createdAt: fiveDaysAgo.toISOString(),
      donorName: 'Food Donor'
    },
    {
      id: Date.now() - 4000,
      foodType: 'Rice, Dal & Grains',
      quantity: '30',
      unit: 'kg',
      expiryDate: sevenDaysFromNow.toISOString().split('T')[0],
      location: 'D-Mart, Bangalore',
      description: 'Bulk rice, dals, and atta. Perfect for large-scale meal preparation.',
      status: 'available',
      createdAt: fiveDaysAgo.toISOString(),
      donorName: 'Food Donor'
    },
    {
      id: Date.now() - 5000,
      foodType: 'Dairy Products (Milk, Paneer, Curd)',
      quantity: '12',
      unit: 'kg',
      expiryDate: threeDaysFromNow.toISOString().split('T')[0],
      location: 'Amul Dairy, Pune',
      description: 'Fresh dairy products. Must be refrigerated immediately.',
      status: 'available',
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      donorName: 'Food Donor'
    }
  ];
};

// Default received food data for seeker dashboard
export const getDefaultReceivedFood = (userId) => {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);

  return [
    {
      id: Date.now() - 1000,
      foodType: 'Fresh Fruits & Vegetables',
      quantity: '20',
      unit: 'kg',
      urgency: 'high',
      location: 'Seva Sadan, Kolkata',
      purpose: 'Distribution to shelter residents. Feeding 50+ people daily.',
      status: 'completed',
      createdAt: sevenDaysAgo.toISOString(),
      seekerName: 'Food Seeker'
    },
    {
      id: Date.now() - 2000,
      foodType: 'Packaged Meals',
      quantity: '15',
      unit: 'kg',
      urgency: 'medium',
      location: 'Annapurna Food Bank, Hyderabad',
      purpose: 'Weekly food distribution program for low-income families.',
      status: 'completed',
      createdAt: fiveDaysAgo.toISOString(),
      seekerName: 'Food Seeker'
    },
    {
      id: Date.now() - 3000,
      foodType: 'Canned Goods',
      quantity: '30',
      unit: 'kg',
      urgency: 'low',
      location: 'Akshaya Patra Kitchen, Chennai',
      purpose: 'Stock for community kitchen serving daily meals to seniors.',
      status: 'completed',
      createdAt: threeDaysAgo.toISOString(),
      seekerName: 'Food Seeker'
    },
    {
      id: Date.now() - 4000,
      foodType: 'Bread & Bakery',
      quantity: '10',
      unit: 'kg',
      urgency: 'high',
      location: 'Bal Vikas Center, Jaipur',
      purpose: 'After-school snack program for underprivileged children.',
      status: 'approved',
      createdAt: oneDayAgo.toISOString(),
      seekerName: 'Food Seeker'
    }
  ];
};

// Default notifications for donor
export const getDefaultDonorNotifications = () => {
  const now = new Date();
  return [
    {
      id: Date.now() - 1000,
      type: 'success',
      title: 'Donation Claimed!',
      message: 'Your Fresh Vegetables donation has been claimed by Goonj Community Center.',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 2000,
      type: 'info',
      title: 'Impact Update',
      message: 'Your donations have helped feed 120 people this month!',
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 3000,
      type: 'message',
      title: 'Thank You Message',
      message: 'Mumbai Food Bank sent you a thank you note for your generous donation.',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: Date.now() - 4000,
      type: 'warning',
      title: 'Expiring Soon',
      message: 'Your Dairy Products donation expires in 2 days. Consider updating the listing.',
      timestamp: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
};

// Default notifications for seeker
export const getDefaultSeekerNotifications = () => {
  const now = new Date();
  return [
    {
      id: Date.now() - 1000,
      type: 'success',
      title: 'Request Approved!',
      message: 'Your request for Bread & Bakery has been approved. Pickup details sent.',
      timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 2000,
      type: 'info',
      title: 'New Donations Available',
      message: '3 new food donations matching your needs are now available.',
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 3000,
      type: 'message',
      title: 'Donor Message',
      message: 'More Supermarket wants to coordinate pickup time with you.',
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    {
      id: Date.now() - 4000,
      type: 'success',
      title: 'Impact Report',
      message: 'You\'ve helped distribute food to 200+ people this month!',
      timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
};

// Default messages for donor
export const getDefaultDonorMessages = () => {
  const now = new Date();
  return [
    {
      id: Date.now() - 1000,
      sender: 'Goonj Community Center',
      subject: 'Thank you for your donation!',
      preview: 'We received your vegetables donation and distributed it to 40 families...',
      body: `Dear Donor,

We wanted to express our heartfelt gratitude for your generous donation of fresh vegetables. Your contribution has made a significant impact on our community.

The 15kg of vegetables you donated were distributed to 40 families in need, providing them with nutritious meals for several days. Many of these families struggle with food insecurity, and your donation has brought them much-needed relief.

We would love to partner with you for future donations. Please let us know if you have any questions or would like to schedule regular pickups.

Thank you again for your kindness and generosity!

Best regards,
Goonj Community Center Team`,
      timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 2000,
      sender: 'Admin',
      subject: 'Your Impact Report - October 2025',
      preview: 'Here\'s a summary of your contributions this month...',
      body: `Hello Food Donor,

Thank you for being an active member of our Food Waste Reduction Platform!

Here's your impact summary for October 2025:
- Total Donations: 5
- Total Weight: 90 kg
- People Helped: 360
- CO₂ Saved: 225 kg

Your contributions are making a real difference in fighting food waste and hunger. Keep up the amazing work!

If you have any questions or suggestions, please don't hesitate to reach out.

Best regards,
Platform Admin Team`,
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 3000,
      sender: 'System',
      subject: 'Donation Pickup Scheduled',
      preview: 'Your bread donation pickup has been scheduled for tomorrow...',
      body: `Hi there,

This is a confirmation that your donation pickup has been scheduled:

Donation: Bread & Roti Items
Quantity: 8 kg
Pickup Time: Tomorrow, 10:00 AM
Pickup Location: Monginis Bakery, Andheri West, Mumbai

The recipient organization will arrive at the scheduled time. Please ensure the items are ready for pickup.

Thank you for your contribution!

Best,
Food Waste Platform`,
      timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
};

// Default messages for seeker
export const getDefaultSeekerMessages = () => {
  const now = new Date();
  return [
    {
      id: Date.now() - 1000,
      sender: 'More Supermarket',
      subject: 'Donation Available - Pickup Coordination',
      preview: 'We have fresh produce available. Can we coordinate pickup time?...',
      body: `Hello,

We have 20kg of fresh vegetables available for donation. The items include:
- Carrots: 8kg
- Tomatoes: 7kg
- Lettuce: 5kg

These are slightly imperfect but perfectly edible and nutritious. They need to be picked up within the next 2 days.

Could you please confirm your availability for pickup? We're open Monday-Saturday, 9 AM - 9 PM.

Looking forward to working with you!

Best regards,
More Supermarket`,
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 2000,
      sender: 'Admin',
      subject: 'Your Request Has Been Approved',
      preview: 'Good news! Your food request for Bread & Bakery has been approved...',
      body: `Dear Food Seeker,

Great news! Your request for Bread & Bakery items has been approved.

Request Details:
- Food Type: Bread & Bakery
- Quantity: 10 kg
- Purpose: After-school snack program

Donor Information:
- Name: Monginis Bakery
- Location: Andheri West, Mumbai
- Contact: Available in your dashboard

Please coordinate with the donor for pickup arrangements. Make sure to bring appropriate containers and transportation.

Thank you for using our platform to help those in need!

Best regards,
Platform Admin`,
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: Date.now() - 3000,
      sender: 'Support',
      subject: 'Tips for Effective Food Distribution',
      preview: 'Here are some best practices for managing food donations...',
      body: `Hello,

We wanted to share some tips to help you maximize the impact of your food distribution efforts:

1. Food Safety First
   - Always check expiry dates
   - Maintain proper storage temperatures
   - Use clean containers for transport

2. Efficient Distribution
   - Plan routes to minimize travel time
   - Coordinate with multiple donors for bulk pickups
   - Keep accurate records of distributions

3. Community Engagement
   - Share impact stories with donors
   - Provide feedback on food quality
   - Build long-term relationships

4. Documentation
   - Take photos of distributions
   - Track number of people served
   - Report any issues promptly

If you need any assistance or have questions, our support team is here to help!

Best regards,
Support Team`,
      timestamp: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ];
};
