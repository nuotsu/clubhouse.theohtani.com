import type { Metadata } from 'next'
import { Geist_Mono as Font } from 'next/font/google'
import '@/app.css'

const font = Font({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'The Clubhouse — MLB Scorebug',
	description: 'MLB Scorebug, in the style of The Clubhouse on Netflix.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${font.className} bg-bg text-fg antialiased`}>
				{children}
			</body>
		</html>
	)
}
