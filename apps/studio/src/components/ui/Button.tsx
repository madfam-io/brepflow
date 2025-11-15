import React from 'react';
import { Icon, type IconName } from '../icons/IconSystem';
import './Button.css';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
  // Accessibility: Add aria-label for icon-only buttons
  'aria-label'?: string;
  // Accessibility: Add aria-describedby for additional context
  'aria-describedby'?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      disabled = false,
      fullWidth = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      fullWidth && 'btn-full-width',
      loading && 'btn-loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showIcon = icon && !loading;
    const hasChildren = React.Children.count(children) > 0;

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="btn-loading-spinner" role="status" aria-label="Loading">
            <Icon name="loader" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
          </span>
        )}

        {showIcon && iconPosition === 'left' && hasChildren && (
          <Icon
            name={icon}
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            className="btn-icon-left"
          />
        )}

        {children && <span className="btn-content">{children}</span>}

        {showIcon && iconPosition === 'right' && hasChildren && (
          <Icon
            name={icon}
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            className="btn-icon-right"
          />
        )}

        {showIcon && !hasChildren && (
          <Icon
            name={icon}
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            className="btn-icon-only"
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button Component
export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'iconPosition' | 'children'> {
  icon: IconName;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, variant = 'ghost', size = 'md', className = '', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        icon={icon}
        className={`btn-icon ${className}`}
        {...props}
      />
    );
  }
);

IconButton.displayName = 'IconButton';
