export const metadata = {
  title: "New Social — Waitlist",
  description: "Conversation-first app starter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', background: '#0b0b0b', color: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}