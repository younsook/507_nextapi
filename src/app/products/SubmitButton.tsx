// src/app/product/SubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';
import { memo } from 'react';

interface SubmitButtonProps {
  isEditMode: boolean;
  className?: string;
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      role="img"
      focusable="false"
      style={{ marginRight: 8 }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.8s"
          from="0 12 12"
          to="360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function SubmitButtonInner({ isEditMode, className = '' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const label = isEditMode ? '상품 수정' : '상품 추가';
  const baseClasses =
    'inline-flex items-center px-5 py-2 rounded text-white transition';
  const colorClasses = isEditMode
    ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
    : 'bg-green-600 hover:bg-green-700 disabled:bg-green-400';

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      aria-busy={pending}
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {pending && <Spinner />}
      <span>{pending ? `${label} 중...` : label}</span>
    </button>
  );
}

const SubmitButton = memo(SubmitButtonInner);
SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
