export default function PlaygroundLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <style>{`
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }
        html, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
            {children}
        </>
    )
}
