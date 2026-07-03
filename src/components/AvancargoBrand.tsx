interface Props {
  textColor?: string
  lineColor?: string
  className?: string
}

export default function AvancargoBrand({
  textColor = '#FFFFFF',
  lineColor = '#FF6C02',
  className = '',
}: Props) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <span
        style={{
          color: textColor,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 700,
          fontSize: '1.6rem',
          letterSpacing: '0.18em',
        }}
      >
        AVANCARGO
      </span>
      {/* Bracket underline */}
      <div style={{ width: '100%', position: 'relative', height: 6, marginTop: 3 }}>
        {/* Left corner */}
        <div style={{
          position: 'absolute', left: 0, bottom: 0,
          width: 8, height: '100%',
          borderLeft: `2.5px solid ${lineColor}`,
          borderBottom: `2.5px solid ${lineColor}`,
        }} />
        {/* Center line */}
        <div style={{
          position: 'absolute', left: 6, right: 6, bottom: 0,
          borderBottom: `2.5px solid ${lineColor}`,
        }} />
        {/* Right corner */}
        <div style={{
          position: 'absolute', right: 0, bottom: 0,
          width: 8, height: '100%',
          borderRight: `2.5px solid ${lineColor}`,
          borderBottom: `2.5px solid ${lineColor}`,
        }} />
      </div>
    </div>
  )
}
