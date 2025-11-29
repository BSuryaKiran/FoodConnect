// Enhanced default data structures for all user types

// Admin dashboard default data
export const getDefaultAdminData = () => ({
  platformStats: {
    totalUsers: 1247,
    activeDonors: 342,
    recipientOrgs: 156,
    dataAnalysts: 12,
    totalDonations: 5432,
    totalWeight: 12580,
    wasteReduced: 89.5,
    foodSecurity: 78.3,
    monthlyGrowth: {
      users: 15.2,
      donations: 23.1,
      weight: 18.7
    }
  },
  
  pendingApprovals: [
    {
      id: 1,
      name: 'Green Valley Restaurant',
      type: 'donor',
      email: 'contact@greenvalley.com',
      requestDate: '2024-11-25',
      organization: 'Green Valley Family Restaurant',
      verificationStatus: 'pending'
    },
    {
      id: 2,
      name: 'City Food Bank',
      type: 'recipient',
      email: 'admin@cityfoodbank.org',
      requestDate: '2024-11-24',
      organization: 'Metropolitan Food Bank Network',
      verificationStatus: 'documents_reviewed'
    },
    {
      id: 3,
      name: 'Dr. Sarah Chen',
      type: 'analyst',
      email: 's.chen@university.edu',
      requestDate: '2024-11-23',
      organization: 'State University Research Institute',
      verificationStatus: 'pending'
    }
  ],

  systemMetrics: {
    serverLoad: 67,
    responseTime: 245,
    uptime: 99.8,
    dailyActiveUsers: 892,
    dataProcessingLoad: 78
  }
});

// Data analyst dashboard default data
export const getDefaultAnalystData = () => ({
  wasteMetrics: {
    totalWastePrevented: 45680,
    wasteReductionRate: 23.5,
    averageWastePerDonation: 8.7,
    environmentalImpact: 152.3,
    trends: {
      daily: [12.3, 14.1, 11.8, 15.2, 13.9, 16.4, 14.7],
      weekly: [89.2, 92.1, 87.5, 94.3, 91.8],
      monthly: [1240, 1380, 1520, 1680, 1840]
    }
  },

  foodSecurityMetrics: {
    peopleFed: 12450,
    mealsProvided: 48920,
    nutritionScore: 87.5,
    distributionEfficiency: 94.2,
    communityReach: 78.3
  },

  predictiveAnalytics: {
    forecastAccuracy: 89.2,
    nextMonthPrediction: {
      expectedDonations: 1950,
      wasteReduction: 25.8,
      peopleFed: 13200
    },
    seasonalTrends: [
      { season: 'Winter', wasteIncrease: 15.2 },
      { season: 'Spring', wasteDecrease: 8.7 },
      { season: 'Summer', wasteIncrease: 22.1 },
      { season: 'Fall', wasteDecrease: 12.3 }
    ]
  },

  reportTemplates: [
    {
      id: 'weekly_summary',
      name: 'Weekly Impact Summary',
      description: 'Comprehensive weekly overview of platform impact',
      frequency: 'weekly'
    },
    {
      id: 'monthly_trends',
      name: 'Monthly Trend Analysis',
      description: 'Deep dive into monthly waste reduction trends',
      frequency: 'monthly'
    },
    {
      id: 'efficiency_report',
      name: 'Efficiency Optimization Report',
      description: 'Analysis of distribution and pickup efficiency',
      frequency: 'bi-weekly'
    }
  ]
});

// Recipient organization default data
export const getDefaultRecipientData = () => ({
  organizationProfile: {
    type: 'food_bank',
    capacity: 2500, // kg per month
    activeLocations: 12,
    volunteers: 45,
    serviceArea: 'Metropolitan Area',
    specializations: ['Fresh Produce', 'Prepared Meals', 'Dry Goods']
  },

  distributionMetrics: {
    monthlyDistribution: 1847,
    peopleServed: 3240,
    averageResponseTime: 2.3, // hours
    distributionEfficiency: 89.4,
    volunteerHours: 1250
  },

  logisticsData: {
    pendingPickups: [
      {
        id: 1,
        donor: 'Metro Supermarket',
        items: 'Fresh Vegetables',
        quantity: '25 kg',
        scheduledTime: '14:00',
        location: 'Downtown Branch',
        priority: 'high'
      },
      {
        id: 2,
        donor: 'City Bakery',
        items: 'Bread & Pastries',
        quantity: '15 kg',
        scheduledTime: '16:30',
        location: 'Main Store',
        priority: 'medium'
      }
    ],
    
    activeRoutes: [
      {
        id: 'route_001',
        name: 'Downtown Circuit',
        stops: 5,
        estimatedTime: '3.5 hours',
        volunteer: 'Maria Rodriguez',
        status: 'active'
      },
      {
        id: 'route_002',
        name: 'Suburban Delivery',
        stops: 8,
        estimatedTime: '4.2 hours',
        volunteer: 'James Wilson',
        status: 'scheduled'
      }
    ],

    inventoryLevel: {
      current: 1925, // kg
      capacity: 2500, // kg
      utilizationRate: 77,
      categories: {
        fresh: 650,
        canned: 890,
        dried: 385
      }
    }
  }
});

// Enhanced food waste analytics data
export const getFoodWasteAnalyticsData = (userType) => {
  const baseData = {
    wasteReduction: {
      total: Math.floor(Math.random() * 10000) + 5000,
      percentage: Math.floor(Math.random() * 30) + 70,
      trend: Math.floor(Math.random() * 20) + 5
    },
    
    environmentalImpact: {
      co2Saved: Math.floor(Math.random() * 5000) + 2000,
      waterSaved: Math.floor(Math.random() * 50000) + 20000,
      landSaved: Math.floor(Math.random() * 100) + 50
    },
    
    foodSecurity: {
      peopleFed: Math.floor(Math.random() * 5000) + 1000,
      mealsProvided: Math.floor(Math.random() * 20000) + 5000,
      nutritionScore: Math.floor(Math.random() * 20) + 80
    },
    
    efficiency: {
      responseTime: Math.floor(Math.random() * 5) + 1,
      distributionRate: Math.floor(Math.random() * 20) + 80,
      wastePreventionRate: Math.floor(Math.random() * 15) + 85
    }
  };

  // Customize data based on user type
  if (userType === 'donor') {
    baseData.donorSpecific = {
      donationFrequency: Math.floor(Math.random() * 10) + 5,
      averageDonationSize: Math.floor(Math.random() * 50) + 25,
      impactScore: Math.floor(Math.random() * 30) + 70
    };
  } else if (userType === 'recipient') {
    baseData.recipientSpecific = {
      distributionCapacity: Math.floor(Math.random() * 1000) + 500,
      volunteerHours: Math.floor(Math.random() * 500) + 200,
      communityReach: Math.floor(Math.random() * 20) + 80
    };
  } else if (userType === 'analyst') {
    baseData.analystSpecific = {
      dataAccuracy: Math.floor(Math.random() * 10) + 90,
      predictionConfidence: Math.floor(Math.random() * 15) + 85,
      reportGeneration: Math.floor(Math.random() * 50) + 25
    };
  }

  return baseData;
};

// Global platform insights
export const getPlatformInsights = () => [
  {
    id: 'peak_hours',
    type: 'efficiency',
    title: 'Peak Donation Hours Identified',
    description: 'Analysis shows 78% of successful donations occur between 2-4 PM on weekdays.',
    impact: 'Optimize pickup scheduling for 25% efficiency gain',
    confidence: 94,
    actionable: true
  },
  {
    id: 'seasonal_trends',
    type: 'prediction',
    title: 'Seasonal Waste Patterns',
    description: 'Food waste increases by 35% during holiday seasons (Nov-Jan).',
    impact: 'Prepare additional storage capacity and volunteer schedules',
    confidence: 87,
    actionable: true
  },
  {
    id: 'geographic_optimization',
    type: 'optimization',
    title: 'Geographic Distribution Gap',
    description: 'Suburban areas show 40% higher response times than urban centers.',
    impact: 'Strategic volunteer placement could reduce response times by 60%',
    confidence: 91,
    actionable: true
  },
  {
    id: 'donor_retention',
    type: 'behavioral',
    title: 'Donor Engagement Patterns',
    description: 'Donors receiving impact feedback donate 2.3x more frequently.',
    impact: 'Implement automated impact reporting for all donors',
    confidence: 89,
    actionable: true
  }
];

// Success stories and case studies
export const getSuccessStories = () => [
  {
    id: 'metro_restaurant_group',
    title: 'Metro Restaurant Group Partnership',
    description: 'Reduced food waste by 85% across 15 locations, feeding 1,200+ people weekly.',
    metrics: {
      wasteReduced: '12,500 kg/month',
      peopleFed: '4,800/month',
      co2Saved: '31,250 kg/month'
    },
    duration: '18 months',
    category: 'large_donor'
  },
  {
    id: 'community_food_network',
    title: 'Community Food Network Expansion',
    description: 'Scaled distribution network from 3 to 25 locations, serving entire metropolitan area.',
    metrics: {
      locationsAdded: 22,
      capacityIncrease: '400%',
      responseImprovement: '65%'
    },
    duration: '24 months',
    category: 'recipient_growth'
  },
  {
    id: 'university_analytics_project',
    title: 'University Analytics Collaboration',
    description: 'AI-powered optimization increased platform efficiency by 45%.',
    metrics: {
      efficiencyGain: '45%',
      costReduction: '32%',
      accuracyImprovement: '28%'
    },
    duration: '12 months',
    category: 'analytics_impact'
  }
];

// Export all existing functions from original file
export * from './defaultData.js';