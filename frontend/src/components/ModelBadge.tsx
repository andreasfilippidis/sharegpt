import React from 'react';
import './ModelBadge.css';

interface ModelBadgeProps {
  model: string;
  size?: 'sm' | 'md' | 'lg';
}

const ModelBadge: React.FC<ModelBadgeProps> = ({ model = 'unknown', size = 'md' }) => {
  const getModelClass = () => {
    switch (model) {
      case 'chatgpt': return 'model-badge-chatgpt';
      case 'claude': return 'model-badge-claude';
      case 'deepseek': return 'model-badge-deepseek';
      default: return 'model-badge-unknown';
    }
  };

  const sizeClass = `model-badge-${size}`;

  return (
      <span className={`model-badge ${getModelClass()} ${sizeClass}`}>
      <span className="model-badge-indicator"></span>
        {model ? model.charAt(0).toUpperCase() + model.slice(1) : 'Unknown'}
    </span>
  );
};

export default ModelBadge;