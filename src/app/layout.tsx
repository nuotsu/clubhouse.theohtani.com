import type { Metadata } from 'next'
import { Chakra_Petch, Jost } from 'next/font/google'
import '@/app.css'

const baseFont = Chakra_Petch({
	subsets: ['latin'],
	weight: ['400', '700'],
})

const subFont = Jost({
	subsets: ['latin'],
	weight: ['400', '700'],
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
			<body className={`font-base bg-bg text-fg antialiased`}>{children}</body>
		</html>
	)
}
