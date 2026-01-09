function Logo({ size = 80 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lilypad leaf */}
      <ellipse cx="50" cy="52" rx="38" ry="32" fill="#4a7c59" opacity="0.9" />
      <ellipse cx="50" cy="52" rx="38" ry="32" fill="url(#leafGradient)" />

      {/* Leaf veins */}
      <path d="M50 28 Q50 52 50 80" stroke="#3d6b4a" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M50 52 Q35 45 18 52" stroke="#3d6b4a" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M50 52 Q65 45 82 52" stroke="#3d6b4a" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M50 52 Q38 60 22 68" stroke="#3d6b4a" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M50 52 Q62 60 78 68" stroke="#3d6b4a" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Notch in lilypad */}
      <path d="M50 20 Q45 35 50 52 Q55 35 50 20" fill="#f8f6f2" />

      {/* Water reflection */}
      <ellipse cx="50" cy="85" rx="30" ry="6" fill="#4a7c59" opacity="0.15" />

      <defs>
        <linearGradient id="leafGradient" x1="20" y1="30" x2="80" y2="75">
          <stop offset="0%" stopColor="#5a8f6a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3d6b4a" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo
