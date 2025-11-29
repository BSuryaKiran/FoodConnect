import React, { useState, useEffect } from 'react';
import './FoodWasteAnalytics.css';

const FoodWasteAnalytics = ({ userType, data }) => {
  const [analytics, setAnalytics] = useState({
    wasteReduction: {
      total: 0,
      percentage: 0,
      trend: 0
    },
    environmentalImpact: {
      co2Saved: 0,
      waterSaved: 0,
      landSaved: 0
    },
    foodSecurity: {
      peopleFed: 0,
      mealsProvided: 0,
      nutritionScore: 0
    },
    efficiency: {
      responseTime: 0,
      distributionRate: 0,
      wastePreventionRate: 0
    }
  });

  const [timeRange, setTimeRange] = useState('month');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    calculateAnalytics();
    generateChartData();
  }, [data, timeRange]);

  const calculateAnalytics = () => {
    // Simulate analytics calculation based on user type and data
    const mockAnalytics = {
      wasteReduction: {
        total: Math.floor(Math.random() * 10000) + 5000, // kg
        percentage: Math.floor(Math.random() * 30) + 70, // 70-100%
        trend: Math.floor(Math.random() * 20) + 5 // 5-25% increase
      },
      environmentalImpact: {
        co2Saved: Math.floor(Math.random() * 5000) + 2000, // kg CO2
        waterSaved: Math.floor(Math.random() * 50000) + 20000, // liters
        landSaved: Math.floor(Math.random() * 100) + 50 // m²
      },
      foodSecurity: {
        peopleFed: Math.floor(Math.random() * 5000) + 1000,
        mealsProvided: Math.floor(Math.random() * 20000) + 5000,
        nutritionScore: Math.floor(Math.random() * 20) + 80 // 80-100
      },
      efficiency: {
        responseTime: Math.floor(Math.random() * 5) + 1, // hours
        distributionRate: Math.floor(Math.random() * 20) + 80, // 80-100%
        wastePreventionRate: Math.floor(Math.random() * 15) + 85 // 85-100%
      }
    };

    setAnalytics(mockAnalytics);
  };

  const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = months.map(month => ({
      month,
      wasteReduced: Math.floor(Math.random() * 1000) + 500,
      co2Saved: Math.floor(Math.random() * 500) + 200,
      peopleFed: Math.floor(Math.random() * 800) + 200
    }));
    setChartData(data);
  };

  const renderImpactCard = (icon, title, value, unit, description, trend) => (
    <div className="impact-card">
      <div className="impact-header">
        <span className="impact-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="impact-value">
        {value.toLocaleString()} <span className="impact-unit">{unit}</span>
      </div>
      <div className="impact-description">{description}</div>
      {trend && (
        <div className="impact-trend">
          📈 +{trend}% this {timeRange}
        </div>
      )}
    </div>
  );

  const renderChart = () => (
    <div className="analytics-chart">
      <h3>Waste Reduction Trends</h3>
      <div className="chart-container">
        <div className="chart-bars">
          {chartData.map((item, index) => (
            <div key={index} className="chart-bar-group">
              <div className="chart-bars-container">
                <div 
                  className="chart-bar waste" 
                  style={{ height: `${(item.wasteReduced / 1500) * 100}%` }}
                  title={`${item.wasteReduced} kg waste reduced`}
                ></div>
                <div 
                  className="chart-bar co2" 
                  style={{ height: `${(item.co2Saved / 700) * 100}%` }}
                  title={`${item.co2Saved} kg CO2 saved`}
                ></div>
              </div>
              <span className="chart-label">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color waste"></span>
            <span>Waste Reduced (kg)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color co2"></span>
            <span>CO₂ Saved (kg)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEfficiencyMetrics = () => (
    <div className="efficiency-metrics">
      <h3>🎯 Efficiency Metrics</h3>
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-label">Response Time</div>
          <div className="metric-value">{analytics.efficiency.responseTime}h</div>
          <div className="metric-bar">
            <div 
              className="metric-progress" 
              style={{ width: `${100 - (analytics.efficiency.responseTime / 24) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Distribution Rate</div>
          <div className="metric-value">{analytics.efficiency.distributionRate}%</div>
          <div className="metric-bar">
            <div 
              className="metric-progress" 
              style={{ width: `${analytics.efficiency.distributionRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="metric-item">
          <div className="metric-label">Waste Prevention</div>
          <div className="metric-value">{analytics.efficiency.wastePreventionRate}%</div>
          <div className="metric-bar">
            <div 
              className="metric-progress" 
              style={{ width: `${analytics.efficiency.wastePreventionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInsights = () => {
    const insights = [
      {
        icon: '💡',
        title: 'Peak Donation Hours',
        description: 'Most donations occur between 2-4 PM on weekdays. Consider adjusting pickup schedules.',
        impact: 'Could improve efficiency by 15%'
      },
      {
        icon: '📊',
        title: 'Seasonal Trends',
        description: 'Produce donations increase by 40% during harvest months (Aug-Oct).',
        impact: 'Plan storage capacity accordingly'
      },
      {
        icon: '🎯',
        title: 'Distribution Optimization',
        description: 'Route optimization could reduce transportation costs by 23%.',
        impact: 'Potential savings: ₹1,60,000/month'
      }
    ];

    return (
      <div className="analytics-insights">
        <h3>🧠 AI-Powered Insights</h3>
        <div className="insights-list">
          {insights.map((insight, index) => (
            <div key={index} className="insight-item">
              <div className="insight-icon">{insight.icon}</div>
              <div className="insight-content">
                <h4>{insight.title}</h4>
                <p>{insight.description}</p>
                <div className="insight-impact">{insight.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="food-waste-analytics">
      <div className="analytics-header">
        <h2>📊 Food Waste Analytics</h2>
        <div className="time-selector">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="impact-grid">
        {renderImpactCard(
          '♻️', 
          'Waste Reduced', 
          analytics.wasteReduction.total, 
          'kg',
          'Food waste prevented through donations',
          analytics.wasteReduction.trend
        )}
        
        {renderImpactCard(
          '🌍', 
          'CO₂ Emissions Saved', 
          analytics.environmentalImpact.co2Saved, 
          'kg',
          'Carbon footprint reduction achieved',
          12
        )}
        
        {renderImpactCard(
          '💧', 
          'Water Saved', 
          analytics.environmentalImpact.waterSaved, 
          'L',
          'Water footprint reduction through waste prevention',
          8
        )}
        
        {renderImpactCard(
          '👥', 
          'People Fed', 
          analytics.foodSecurity.peopleFed, 
          '',
          'Individuals served through food rescue',
          15
        )}
        
        {renderImpactCard(
          '🍽️', 
          'Meals Provided', 
          analytics.foodSecurity.mealsProvided, 
          '',
          'Total meals distributed to communities',
          18
        )}
        
        {renderImpactCard(
          '🏞️', 
          'Land Saved', 
          analytics.environmentalImpact.landSaved, 
          'm²',
          'Agricultural land footprint reduction',
          6
        )}
      </div>

      {/* Chart and Efficiency Metrics */}
      <div className="analytics-content">
        <div className="analytics-left">
          {renderChart()}
        </div>
        <div className="analytics-right">
          {renderEfficiencyMetrics()}
        </div>
      </div>

      {/* AI Insights */}
      {renderInsights()}
    </div>
  );
};

export default FoodWasteAnalytics;