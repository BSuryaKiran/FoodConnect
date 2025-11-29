// Import React library
import React from 'react';

/**
 * StatCard Component
 * Reusable component to display statistics in a card format
 * Used across all dashboards to show key metrics
 * 
 * @param {string} icon - Emoji or icon to display
 * @param {string|number} value - The statistic value to display
 * @param {string} label - Description/label for the statistic
 * @param {string} className - Optional additional CSS classes
 */
const StatCard = ({ icon, value, label, className = '' }) => {
  return (
    // Article element with combined CSS classes for styling
    <article className={`stat-card card ${className}`}>
      {/* Icon section - displays emoji or icon */}
      <div className="stat-icon">{icon}</div>
      {/* Content section - displays the statistic value and label */}
      <div className="stat-content">
        {/* Main statistic value (large, prominent) */}
        <h3 className="stat-value">{value}</h3>
        {/* Label describing what the statistic represents */}
        <p className="stat-label">{label}</p>
      </div>
    </article>
  );
};

// Export component for use in other files
export default StatCard;
